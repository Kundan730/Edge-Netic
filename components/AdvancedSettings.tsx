'use client';

import { useState } from 'react';
import { Settings, Sparkles, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AISettings, PRESETS, saveSettings, validateSettings } from '@/lib/settingsStorage';

interface AdvancedSettingsProps {
    settings: AISettings;
    onSettingsChange: (settings: AISettings) => void;
    onClose: () => void;
}

export function AdvancedSettings({ settings, onSettingsChange, onClose }: AdvancedSettingsProps) {
    const [localSettings, setLocalSettings] = useState<AISettings>(settings);

    const handlePresetClick = (preset: typeof PRESETS[0]) => {
        setLocalSettings(preset.settings);
    };

    const handleSave = () => {
        const validated = validateSettings(localSettings);
        saveSettings(validated);
        onSettingsChange(validated);
        onClose();
    };

    const presetIcons = {
        Creative: Sparkles,
        Balanced: Zap,
        Precise: Target,
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-cyan-500/30 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-cyan-500/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Settings className="w-6 h-6 text-cyan-400" />
                            <h2 className="text-2xl font-bold text-cyan-400">ADVANCED SETTINGS</h2>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="text-gray-400 hover:text-white"
                        >
                            ✕
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Presets */}
                    <div>
                        <h3 className="text-sm font-bold text-white mb-3">PRESETS</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {PRESETS.map((preset) => {
                                const Icon = presetIcons[preset.name as keyof typeof presetIcons];
                                return (
                                    <button
                                        key={preset.name}
                                        onClick={() => handlePresetClick(preset)}
                                        className="p-4 rounded-lg border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all text-left"
                                    >
                                        <Icon className="w-5 h-5 text-cyan-400 mb-2" />
                                        <p className="text-sm font-bold text-white">{preset.name}</p>
                                        <p className="text-xs text-gray-500 mt-1">{preset.description}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Temperature */}
                    <div>
                        <label className="block text-sm font-bold text-white mb-2">
                            TEMPERATURE: {localSettings.temperature.toFixed(2)}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="2"
                            step="0.1"
                            value={localSettings.temperature}
                            onChange={(e) => setLocalSettings({ ...localSettings, temperature: parseFloat(e.target.value) })}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Lower = more focused, Higher = more creative
                        </p>
                    </div>

                    {/* Max Tokens */}
                    <div>
                        <label className="block text-sm font-bold text-white mb-2">
                            MAX TOKENS: {localSettings.maxTokens}
                        </label>
                        <input
                            type="range"
                            min="128"
                            max="2048"
                            step="128"
                            value={localSettings.maxTokens}
                            onChange={(e) => setLocalSettings({ ...localSettings, maxTokens: parseInt(e.target.value) })}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Maximum length of AI responses
                        </p>
                    </div>

                    {/* Top P */}
                    <div>
                        <label className="block text-sm font-bold text-white mb-2">
                            TOP-P: {localSettings.topP.toFixed(2)}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={localSettings.topP}
                            onChange={(e) => setLocalSettings({ ...localSettings, topP: parseFloat(e.target.value) })}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Nucleus sampling threshold
                        </p>
                    </div>

                    {/* Top K */}
                    <div>
                        <label className="block text-sm font-bold text-white mb-2">
                            TOP-K: {localSettings.topK}
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            step="1"
                            value={localSettings.topK}
                            onChange={(e) => setLocalSettings({ ...localSettings, topK: parseInt(e.target.value) })}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Number of top tokens to consider
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-cyan-500/20 flex gap-3 justify-end">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
                    >
                        Save Settings
                    </Button>
                </div>
            </div>
        </div>
    );
}
