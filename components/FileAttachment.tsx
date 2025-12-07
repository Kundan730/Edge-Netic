'use client';

import { useState, useRef } from 'react';
import { Paperclip, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface FileAttachmentProps {
    onFileSelect: (file: File, content: string) => void;
    onClear: () => void;
    currentFile: { file: File; content: string } | null;
}

export function FileAttachment({ onFileSelect, onClear, currentFile }: FileAttachmentProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error('File too large. Max 5MB');
            return;
        }

        setIsProcessing(true);

        try {
            const reader = new FileReader();
            const content = await new Promise<string>((resolve, reject) => {
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsText(file);
            });

            onFileSelect(file, content);
            toast.success('File attached!');
        } catch (error) {
            console.error('Error reading file:', error);
            toast.error('Failed to read file');
        } finally {
            setIsProcessing(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <div className="flex items-center gap-2">
            <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,.json,.csv,.js,.ts,.tsx,.jsx,.py,.java,.cpp,.c,.html,.css"
                onChange={handleFileChange}
                className="hidden"
            />

            {currentFile ? (
                <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-lg">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs text-cyan-400 max-w-[100px] truncate">
                        {currentFile.file.name}
                    </span>
                    <button
                        onClick={onClear}
                        className="text-cyan-400 hover:text-red-400 transition-colors"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </div>
            ) : (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessing}
                    className="h-[48px] w-[48px] text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                    title="Attach text or code file"
                >
                    <Paperclip className="w-5 h-5" />
                </Button>
            )}
        </div>
    );
}
