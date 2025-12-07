'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { CodeBlock } from './CodeBlock';
import { Components } from 'react-markdown';

interface MarkdownRendererProps {
    content: string;
    theme?: 'dark' | 'light';
}

export function MarkdownRenderer({ content, theme = 'dark' }: MarkdownRendererProps) {
    const components: Components = {
        code({ node, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const value = String(children).replace(/\n$/, '');

            // Check if it's a code block (has language) or inline code
            const isCodeBlock = match && className?.includes('language-');

            return isCodeBlock ? (
                <CodeBlock language={language} value={value} theme={theme} />
            ) : (
                <code
                    className="px-1.5 py-0.5 rounded bg-gray-800 text-cyan-400 font-mono text-sm border border-gray-700"
                    {...props}
                >
                    {children}
                </code>
            );
        },
        a({ node, children, href, ...props }) {
            return (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
                    {...props}
                >
                    {children}
                </a>
            );
        },
        blockquote({ node, children, ...props }) {
            return (
                <blockquote
                    className="border-l-4 border-cyan-500 pl-4 py-2 my-4 italic text-gray-300 bg-gray-800/30"
                    {...props}
                >
                    {children}
                </blockquote>
            );
        },
        table({ node, children, ...props }) {
            return (
                <div className="overflow-x-auto my-4">
                    <table
                        className="min-w-full border border-gray-700 rounded-lg overflow-hidden"
                        {...props}
                    >
                        {children}
                    </table>
                </div>
            );
        },
        thead({ node, children, ...props }) {
            return (
                <thead className="bg-gray-800" {...props}>
                    {children}
                </thead>
            );
        },
        th({ node, children, ...props }) {
            return (
                <th
                    className="px-4 py-2 text-left text-sm font-semibold text-cyan-400 border-b border-gray-700"
                    {...props}
                >
                    {children}
                </th>
            );
        },
        td({ node, children, ...props }) {
            return (
                <td
                    className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700"
                    {...props}
                >
                    {children}
                </td>
            );
        },
        ul({ node, children, ...props }) {
            return (
                <ul className="list-disc list-inside my-2 space-y-1 text-gray-300" {...props}>
                    {children}
                </ul>
            );
        },
        ol({ node, children, ...props }) {
            return (
                <ol className="list-decimal list-inside my-2 space-y-1 text-gray-300" {...props}>
                    {children}
                </ol>
            );
        },
        h1({ node, children, ...props }) {
            return (
                <h1 className="text-2xl font-bold text-white mt-6 mb-3" {...props}>
                    {children}
                </h1>
            );
        },
        h2({ node, children, ...props }) {
            return (
                <h2 className="text-xl font-bold text-white mt-5 mb-2" {...props}>
                    {children}
                </h2>
            );
        },
        h3({ node, children, ...props }) {
            return (
                <h3 className="text-lg font-semibold text-white mt-4 mb-2" {...props}>
                    {children}
                </h3>
            );
        },
        p({ node, children, ...props }) {
            return (
                <p className="text-gray-300 leading-relaxed my-2" {...props}>
                    {children}
                </p>
            );
        },
        hr({ node, ...props }) {
            return <hr className="my-4 border-gray-700" {...props} />;
        },
    };

    return (
        <div className="markdown-content">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={components}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
