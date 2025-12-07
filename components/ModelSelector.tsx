'use client';

import { useState } from 'react';
import { ChevronDown, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AVAILABLE_MODELS, ModelConfig, saveSelectedModel, loadSelectedModel } from '@/lib/modelConfig';

interface ModelSelectorProps {
    currentModelId: string;
    onModelChange: (modelId: string) => void;
}

export function ModelSelector({ currentModelId, onModelChange }: ModelSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const currentModel = AVAILABLE_MODELS.find(m => m.id === currentModelId);

    const handleModelSelect = (modelId: string) => {
        if (modelId === currentModelId) {
            setIsOpen(false);
            return;
        }

        const confirmed = window.confirm(
            'Switching models will reload the page and download the new model if not cached. Continue?'
        );

        if (confirmed) {
            saveSelectedModel(modelId);
            onModelChange(modelId);
            setIsOpen(false);
        }
    };

    return (
        <div className="relative">
            <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 text-xs px-2 py-1 flex items-center gap-1"
            >
                <Cpu className="w-4 h-4" />
                <span className="hidden sm:inline">{currentModel?.displayName}</span>
                <ChevronDown className="w-3 h-3" />
            </Button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-[9998]"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="fixed top-[60px] right-4 w-72 bg-gray-900 border border-cyan-500/30 rounded-lg shadow-xl z-[9999] overflow-hidden">
                        <div className="p-3 border-b border-cyan-500/20">
                            <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                                <Cpu className="w-4 h-4" />
                                SELECT MODEL
                            </h3>
                        </div>

                        <div className="max-h-80 overflow-y-auto">
                            {AVAILABLE_MODELS.map((model) => (
                                <button
                                    key={model.id}
                                    onClick={() => handleModelSelect(model.id)}
                                    className={`w-full text-left p-3 hover:bg-cyan-500/10 transition-colors ${model.id === currentModelId ? 'bg-cyan-500/20' : ''
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-sm font-semibold text-white">
                                                    {model.displayName}
                                                </h4>
                                                {model.id === currentModelId && (
                                                    <span className="text-[10px] bg-cyan-500 text-black px-1.5 py-0.5 rounded font-bold">
                                                        ACTIVE
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {model.description}
                                            </p>
                                            <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-500">
                                                <span>📦 {model.size}</span>
                                                <span>📝 {model.contextWindow.toLocaleString()} tokens</span>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="p-2 border-t border-cyan-500/20 bg-gray-950">
                            <p className="text-[10px] text-gray-500 text-center">
                                Models are cached after first download
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
