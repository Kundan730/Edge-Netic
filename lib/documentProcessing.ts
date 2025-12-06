import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

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

// Configure PDF.js worker
if (typeof window !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
        '//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

export const processDocument = async (file: File): Promise<UploadedDocument> => {
    let text = '';

    if (file.type === 'text/plain' || file.name.endsWith('.md')) {
        text = await file.text();
    } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        text = await extractPDFText(file);
    } else if (file.name.endsWith('.docx')) {
        const result = await mammoth.extractRawText({
            arrayBuffer: await file.arrayBuffer()
        });
        text = result.value;
    } else {
        throw new Error(`Unsupported file type: ${file.type}`);
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
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += pageText + '\n\n';
    }

    return fullText;
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
