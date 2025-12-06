import { processDocument, UploadedDocument, DocumentChunk, findRelevantChunks } from './documentProcessing';

const DB_NAME = 'edge-netic-docs';
const DB_VERSION = 1;
const STORE_NAME = 'documents';

// Initialize IndexedDB
function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };
    });
}

// Save document with chunks
export async function saveDocument(file: File): Promise<UploadedDocument> {
    const doc = await processDocument(file);

    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
        const request = store.add(doc);
        request.onsuccess = () => {
            db.close();
            resolve(doc);
        };
        request.onerror = () => {
            db.close();
            reject(request.error);
        };
    });
}

// Get all documents
export async function getAllDocuments(): Promise<UploadedDocument[]> {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => {
            db.close();
            resolve(request.result);
        };
        request.onerror = () => {
            db.close();
            reject(request.error);
        };
    });
}

// Delete document
export async function deleteDocument(id: string): Promise<void> {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    await new Promise((resolve, reject) => {
        const request = store.delete(id);
        request.onsuccess = () => {
            db.close();
            resolve(request.result);
        };
        request.onerror = () => {
            db.close();
            reject(request.error);
        };
    });
}

// Search across all documents
export async function searchDocuments(query: string, topK: number = 3): Promise<{ chunk: DocumentChunk; docName: string }[]> {
    const docs = await getAllDocuments();
    const relevantChunks = findRelevantChunks(query, docs, topK);

    return relevantChunks.map(chunk => {
        const doc = docs.find(d => d.chunks.some(c => c.id === chunk.id));
        return {
            chunk,
            docName: doc?.name || 'Unknown',
        };
    });
}
