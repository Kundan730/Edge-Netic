import mammoth from 'mammoth';

// Lazy load PDF.js only on client-side
// Removed old PDF.js loading block

export interface DocumentChunk {
    id: string;
    text: string;
    source: string;
    index: number;
}

export interface UploadedDocument {
    id: string;
    name: string;
    size: number;
    type: string;
    uploadedAt: number;
    chunks: DocumentChunk[];
}

export const processDocument = async (file: File): Promise<UploadedDocument> => {
    let text = '';

    if (file.type === 'text/plain' || file.name.endsWith('.md') || file.name.endsWith('.txt')) {
        text = await file.text();
    } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        try {
            text = await extractPDFText(file);
        } catch (error) {
            console.error('PDF extraction failed:', error);
            throw new Error('Failed to process PDF. Please try a different file format.');
        }
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.name.endsWith('.docx')) {
        try {
            const result = await mammoth.extractRawText({
                arrayBuffer: await file.arrayBuffer()
            });
            text = result.value;
        } catch (error) {
            console.error('DOCX extraction failed:', error);
            throw new Error('Failed to process DOCX. Please try a different file format.');
        }
    } else {
        throw new Error(`Unsupported file type: ${file.type || file.name}. Please upload PDF, DOCX, TXT, or MD files.`);
    }

    if (!text || text.trim().length === 0) {
        throw new Error('No text content found in the document.');
    }

    const chunks = chunkText(text, file.name);

    return {
        id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: Date.now(),
        chunks
    };
};

const extractPDFText = async (file: File): Promise<string> => {
    try {
        // Load PDF.js from CDN if not already loaded
        if (typeof window !== 'undefined' && !(window as any).pdfjsLib) {
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }

        const pdfjsLib = (window as any).pdfjsLib;
        if (!pdfjsLib) {
            throw new Error('PDF.js failed to load');
        }

        // Set worker path
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item: any) => item.str).join(' ');
            fullText += pageText + '\n\n';
        }

        if (!fullText.trim()) {
            throw new Error('No text content found in PDF. The PDF might be image-based or empty.');
        }

        return fullText;
    } catch (error) {
        console.error('PDF extraction error:', error);
        throw new Error(`PDF processing failed: ${error instanceof Error ? error.message : 'Unknown error'}. Try converting to TXT format.`);
    }
};

const chunkText = (text: string, source: string): DocumentChunk[] => {
    const paragraphs = text.split(/\n\n+/);
    const chunks: DocumentChunk[] = [];
    let currentChunk = '';
    let chunkIndex = 0;
    const maxChunkSize = 500;

    for (const para of paragraphs) {
        if ((currentChunk + para).length > maxChunkSize && currentChunk) {
            chunks.push({
                id: `${source}-chunk-${chunkIndex}`,
                text: currentChunk.trim(),
                source,
                index: chunkIndex
            });
            currentChunk = para;
            chunkIndex++;
        } else {
            currentChunk += (currentChunk ? '\n\n' : '') + para;
        }
    }

    if (currentChunk) {
        chunks.push({
            id: `${source}-chunk-${chunkIndex}`,
            text: currentChunk.trim(),
            source,
            index: chunkIndex
        });
    }

    return chunks;
};

export const findRelevantChunks = (
    query: string,
    documents: UploadedDocument[],
    topK = 3
): DocumentChunk[] => {
    const allChunks = documents.flatMap(doc => doc.chunks);
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter(w => w.length > 3);

    const scored = allChunks.map(chunk => {
        const chunkLower = chunk.text.toLowerCase();
        let score = 0;

        // Exact phrase match
        if (chunkLower.includes(queryLower)) score += 10;

        // Individual word matches
        queryWords.forEach(word => {
            const matches = (chunkLower.match(new RegExp(word, 'g')) || []).length;
            score += matches * 2;
        });

        // Proximity bonus
        const positions = queryWords.map(word => chunkLower.indexOf(word))
            .filter(p => p !== -1);
        if (positions.length > 1) {
            const spread = Math.max(...positions) - Math.min(...positions);
            if (spread < 100) score += 5;
        }

        return { chunk, score };
    });

    return scored
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, topK)
        .map(s => s.chunk);
};
