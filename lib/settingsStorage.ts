export interface AISettings {
    temperature: number;
    maxTokens: number;
    topP: number;
    topK: number;
}

export interface SettingsPreset {
    name: string;
    description: string;
    settings: AISettings;
}

const STORAGE_KEY = 'edge-netic-settings';

export const DEFAULT_SETTINGS: AISettings = {
    temperature: 0.7,
    maxTokens: 512,
    topP: 0.9,
    topK: 40,
};

export const PRESETS: SettingsPreset[] = [
    {
        name: 'Creative',
        description: 'More creative and diverse responses',
        settings: {
            temperature: 1.2,
            maxTokens: 1024,
            topP: 0.95,
            topK: 50,
        },
    },
    {
        name: 'Balanced',
        description: 'Good balance of creativity and accuracy',
        settings: {
            temperature: 0.7,
            maxTokens: 512,
            topP: 0.9,
            topK: 40,
        },
    },
    {
        name: 'Precise',
        description: 'More focused and deterministic responses',
        settings: {
            temperature: 0.3,
            maxTokens: 256,
            topP: 0.8,
            topK: 20,
        },
    },
];

export function saveSettings(settings: AISettings): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
}

export function loadSettings(): AISettings {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS;

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Failed to load settings:', error);
    }

    return DEFAULT_SETTINGS;
}

export function validateSettings(settings: AISettings): AISettings {
    return {
        temperature: Math.max(0, Math.min(2, settings.temperature)),
        maxTokens: Math.max(128, Math.min(2048, settings.maxTokens)),
        topP: Math.max(0, Math.min(1, settings.topP)),
        topK: Math.max(1, Math.min(100, settings.topK)),
    };
}
