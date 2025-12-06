'use client';

import { FileText, Trash2, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UploadedDocument } from '@/lib/documentProcessing';

interface DocumentListProps {
    documents: UploadedDocument[];
    onDelete: (id: string) => void;
}

export function DocumentList({ documents, onDelete }: DocumentListProps) {
    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const getFileIcon = (type: string) => {
        if (type.includes('pdf')) return '📄';
        if (type.includes('word')) return '📝';
        if (type.includes('text')) return '📃';
        return '📄';
    };

    if (documents.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <File className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No documents uploaded yet</p>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {documents.map((doc) => (
                <div
                    key={doc.id}
                    className="group p-3 rounded-lg bg-gray-900/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
                >
                    <div className="flex items-start gap-3">
                        <div className="text-2xl flex-shrink-0 mt-1">
                            {getFileIcon(doc.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                                {doc.name}
                            </p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                <span>{formatFileSize(doc.size)}</span>
                                <span>•</span>
                                <span>{doc.chunks.length} chunks</span>
                                <span>•</span>
                                <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(doc.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
