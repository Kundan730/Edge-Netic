import { Conversation, Stats, Message } from '@/types/chat';

const CONVERSATIONS_KEY = 'edge-netic-conversations';
const STATS_KEY = 'edge-netic-stats';
const OLD_MESSAGES_KEY = 'edge-netic-messages';

export const saveConversations = (conversations: Conversation[]): void => {
    try {
        localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
    } catch (error) {
        console.error('Failed to save conversations:', error);
    }
};

export const loadConversations = (): Conversation[] => {
    try {
        const saved = localStorage.getItem(CONVERSATIONS_KEY);
        if (saved) {
            return JSON.parse(saved);
        }

        // Try to migrate old messages if no conversations exist
        return migrateOldMessages();
    } catch (error) {
        console.error('Failed to load conversations:', error);
        return [];
    }
};

export const migrateOldMessages = (): Conversation[] => {
    try {
        const oldMessages = localStorage.getItem(OLD_MESSAGES_KEY);
        if (oldMessages) {
            const messages: Message[] = JSON.parse(oldMessages);

            if (messages.length > 0) {
                // Create a single conversation from old messages
                const conversation: Conversation = {
                    id: generateId(),
                    title: 'Migrated Conversation',
                    messages: messages,
                    createdAt: messages[0]?.timestamp || Date.now(),
                    updatedAt: messages[messages.length - 1]?.timestamp || Date.now(),
                    persona: 'standard'
                };

                // Save the migrated conversation
                saveConversations([conversation]);

                // Remove old messages
                localStorage.removeItem(OLD_MESSAGES_KEY);

                return [conversation];
            }
        }
    } catch (error) {
        console.error('Failed to migrate old messages:', error);
    }

    return [];
};

export const saveStats = (stats: Stats): void => {
    try {
        console.log('[saveStats] Saving modelLoadTime:', stats.modelLoadTime);
        localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch (error) {
        console.error('Failed to save stats:', error);
    }
};

export const loadStats = (): Stats => {
    try {
        const saved = localStorage.getItem(STATS_KEY);
        if (saved) {
            const stats = JSON.parse(saved);
            console.log('[loadStats] Loaded modelLoadTime:', stats.modelLoadTime);

            // Fix corrupted modelLoadTime (if it's a timestamp instead of duration)
            // Model load time should be under 5 minutes (300000ms), not billions
            if (stats.modelLoadTime > 300000) {
                console.log('[loadStats] Detected corrupted modelLoadTime, resetting to 0');
                stats.modelLoadTime = 0;
                // Save the corrected stats
                saveStats(stats);
            }

            return stats;
        }
    } catch (error) {
        console.error('Failed to load stats:', error);
    }

    return {
        totalMessages: 0,
        totalConversations: 0,
        avgResponseTime: 0,
        modelLoadTime: 0,
        totalTokens: 0,
        lastUpdated: Date.now()
    };
};

export const generateId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const generateConversationTitle = (firstMessage: string): string => {
    const maxLength = 40;
    const title = firstMessage.trim();

    if (title.length <= maxLength) {
        return title;
    }

    return title.substring(0, maxLength) + '...';
};
