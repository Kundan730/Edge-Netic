'use client';

import { Message } from '@/types/chat';
import { Bot, User, Copy, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MessageItemProps {
    message: Message;
    onRegenerate?: () => void;
    isStreaming?: boolean;
}

export function MessageItem({ message, onRegenerate, isStreaming }: MessageItemProps) {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(message.content);
        toast.success('Message copied to clipboard!');
    };

    const isUser = message.role === 'user';
    const isSystem = message.role === 'system';

    if (isSystem) return null;

    return (
        <div className={`flex gap-3 group ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                </div>
            )}

            <div className="flex flex-col gap-2 max-w-[80%] md:max-w-[70%]">
                <div
                    className={`p-4 rounded-2xl ${isUser
                        ? 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white'
                        : 'glass border border-white/10 text-gray-100'
                        }`}
                >
                    {isUser ? (
                        <p className="whitespace-pre-wrap break-words">{message.content}</p>
                    ) : (
                        <div className="prose prose-invert prose-sm max-w-none">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    code({ node, className, children, ...props }: any) {
                                        const match = /language-(\w+)/.exec(className || '');
                                        const inline = !match;
                                        return !inline && match ? (
                                            <SyntaxHighlighter
                                                style={vscDarkPlus}
                                                language={match[1]}
                                                PreTag="div"
                                                {...props}
                                            >
                                                {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                        ) : (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        );
                                    },
                                }}
                            >
                                {message.content}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyToClipboard}
                        className="h-7 text-xs text-gray-400 hover:text-white"
                    >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                    </Button>

                    {!isUser && onRegenerate && !isStreaming && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onRegenerate}
                            className="h-7 text-xs text-gray-400 hover:text-white"
                        >
                            <RefreshCw className="w-3 h-3 mr-1" />
                            Regenerate
                        </Button>
                    )}

                    <span className="text-xs text-gray-500 ml-auto">
                        {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                </div>
            </div>

            {isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                </div>
            )}
        </div>
    );
}
