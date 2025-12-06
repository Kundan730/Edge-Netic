'use client';

import { useState, useCallback } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface DocumentUploadZoneProps {
    onUpload: (file: File) => Promise<void>;
    isUploading: boolean;
}

export function DocumentUploadZone({ onUpload, isUploading }: DocumentUploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false);

    const acceptedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'text/markdown',
    ];

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback(async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        const file = files[0];

        if (!file) return;

        if (!acceptedTypes.includes(file.type)) {
            toast.error('Unsupported file type. Please upload PDF, DOCX, TXT, or MD files.');
            return;
        }

        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            toast.error('File too large. Maximum size is 10MB.');
            return;
        }

        await onUpload(file);
    }, [onUpload, acceptedTypes]);

    const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!acceptedTypes.includes(file.type)) {
            toast.error('Unsupported file type. Please upload PDF, DOCX, TXT, or MD files.');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            toast.error('File too large. Maximum size is 10MB.');
            return;
        }

        await onUpload(file);
        e.target.value = ''; // Reset input
    }, [onUpload, acceptedTypes]);

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${isDragging
                    ? 'border-cyan-400 bg-cyan-500/10'
                    : 'border-cyan-500/30 hover:border-cyan-400/50'
                } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
        >
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    {isUploading ? (
                        <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Upload className="w-8 h-8 text-cyan-400" />
                    )}
                </div>

                <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                        {isUploading ? 'Processing document...' : 'Upload Document'}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                        Drag & drop or click to select
                    </p>
                    <p className="text-xs text-gray-500">
                        Supported: PDF, DOCX, TXT, MD (max 10MB)
                    </p>
                </div>

                <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf,.docx,.txt,.md"
                    onChange={handleFileSelect}
                    disabled={isUploading}
                />

                <Button
                    onClick={() => document.getElementById('file-upload')?.click()}
                    disabled={isUploading}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
                >
                    <FileText className="w-4 h-4 mr-2" />
                    Select File
                </Button>
            </div>
        </div>
    );
}
