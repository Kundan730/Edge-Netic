import { Conversation, Message } from '@/types/chat';

export const exportAsText = (conversation: Conversation): void => {
    const text = conversation.messages
        .map((msg) => {
            const role = msg.role === 'user' ? 'You' : 'AI';
            const timestamp = new Date(msg.timestamp).toLocaleString();
            return `[${timestamp}] ${role}:\n${msg.content}\n`;
        })
        .join('\n');

    const header = `Edge-Netic Conversation: ${conversation.title}\nExported: ${new Date().toLocaleString()}\n${'='.repeat(60)}\n\n`;
    const fullText = header + text;

    downloadFile(
        fullText,
        `edge-netic-${conversation.title.replace(/[^a-z0-9]/gi, '-')}-${Date.now()}.txt`,
        'text/plain'
    );
};

export const exportAsJSON = (conversation: Conversation): void => {
    const data = {
        ...conversation,
        exportedAt: new Date().toISOString(),
        version: '1.0'
    };

    const json = JSON.stringify(data, null, 2);

    downloadFile(
        json,
        `edge-netic-${conversation.title.replace(/[^a-z0-9]/gi, '-')}-${Date.now()}.json`,
        'application/json'
    );
};

export const exportAsMarkdown = (conversation: Conversation): void => {
    const header = `# ${conversation.title}\n\n**Exported:** ${new Date().toLocaleString()}  \n**Persona:** ${conversation.persona}  \n**Created:** ${new Date(conversation.createdAt).toLocaleString()}\n\n---\n\n`;

    const messages = conversation.messages
        .map((msg) => {
            const role = msg.role === 'user' ? '👤 **You**' : '🤖 **AI**';
            const timestamp = new Date(msg.timestamp).toLocaleString();
            return `### ${role}\n*${timestamp}*\n\n${msg.content}\n`;
        })
        .join('\n---\n\n');

    const markdown = header + messages;

    downloadFile(
        markdown,
        `edge-netic-${conversation.title.replace(/[^a-z0-9]/gi, '-')}-${Date.now()}.md`,
        'text/markdown'
    );
};

const downloadFile = (content: string, filename: string, mimeType: string): void => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};
