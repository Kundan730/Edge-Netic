'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
    language: string;
    value: string;
    theme?: 'dark' | 'light';
}

export function CodeBlock({ language, value, theme = 'dark' }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group my-4">
            {/* Language label and copy button */}
            <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-emerald-900/50 to-green-900/50 border-b border-emerald-500/30 rounded-t-lg backdrop-blur-sm">
                <span className="text-xs font-mono text-emerald-300 uppercase font-semibold">
                    {language || 'code'}
                </span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-7 px-2 text-emerald-300 hover:text-emerald-100 hover:bg-emerald-500/20 transition-all"
                >
                    {copied ? (
                        <>
                            <Check className="w-3 h-3 mr-1" />
                            <span className="text-xs">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3 h-3 mr-1" />
                            <span className="text-xs">Copy</span>
                        </>
                    )}
                </Button>
            </div>

            {/* Code content */}
            <SyntaxHighlighter
                language={language || 'text'}
                style={theme === 'dark' ? oneDark : oneLight}
                customStyle={{
                    margin: 0,
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    borderBottomLeftRadius: '0.5rem',
                    borderBottomRightRadius: '0.5rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    background: 'linear-gradient(to bottom, rgba(6, 78, 59, 0.3), rgba(4, 47, 46, 0.4))',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderTop: 'none',
                }}
                showLineNumbers={true}
                wrapLines={true}
            >
                {value}
            </SyntaxHighlighter>
        </div>
    );
}
