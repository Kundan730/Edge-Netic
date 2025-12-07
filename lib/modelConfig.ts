export interface ModelConfig {
    id: string;
    name: string;
    displayName: string;
    size: string;
    contextWindow: number;
    description: string;
}

export const AVAILABLE_MODELS: ModelConfig[] = [
    {
        id: 'llama-3.2-1b',
        name: 'Llama-3.2-1B-Instruct-q4f16_1-MLC',
        displayName: 'Llama 3.2 1B',
        size: '815 MB',
        contextWindow: 2048,
        description: 'Fast, lightweight model'
    },
    {
        id: 'qwen2.5-1.5b',
        name: 'Qwen2.5-1.5B-Instruct-q4f16_1-MLC',
        displayName: 'Qwen2.5 1.5B',
        size: '1.6 GB',
        contextWindow: 4096,
        description: 'Lightweight, fast responses'
    },
    {
        id: 'gemma-2-2b',
        name: 'gemma-2-2b-it-q4f16_1-MLC',
        displayName: 'Gemma 2 2B',
        size: '1.4 GB',
        contextWindow: 8192,
        description: 'More capable, larger context'
    },
    {
        id: 'llama-3.2-3b',
        name: 'Llama-3.2-3B-Instruct-q4f16_1-MLC',
        displayName: 'Llama 3.2 3B',
        size: '2.0 GB',
        contextWindow: 131072,
        description: 'Excellent balance, 128K context window'
    },
    {
        id: 'qwen2.5-coder-3b',
        name: 'Qwen2.5-Coder-3B-Instruct-q4f16_1-MLC',
        displayName: 'Qwen2.5 Coder 3B',
        size: '2.5 GB',
        contextWindow: 4096,
        description: 'Specialized for coding tasks'
    },
    {
        id: 'phi-3.5-mini',
        name: 'Phi-3.5-mini-instruct-q4f16_1-MLC',
        displayName: 'Phi-3.5 Mini 4B',
        size: '2.5 GB',
        contextWindow: 4096,
        description: 'Balanced performance & capability'
    },
    {
        id: 'mistral-7b',
        name: 'Mistral-7B-Instruct-v0.3-q4f16_1-MLC',
        displayName: 'Mistral 7B v0.3',
        size: '4.5 GB',
        contextWindow: 4096,
        description: 'Most capable, complex reasoning'
    }
];

export const DEFAULT_MODEL_ID = 'llama-3.2-1b';

export function getModelById(id: string): ModelConfig | undefined {
    return AVAILABLE_MODELS.find(model => model.id === id);
}

export function saveSelectedModel(modelId: string): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem('edge-netic-selected-model', modelId);
    }
}

export function loadSelectedModel(): string {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('edge-netic-selected-model') || DEFAULT_MODEL_ID;
    }
    return DEFAULT_MODEL_ID;
}
