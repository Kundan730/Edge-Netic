'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, X, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface VoiceAssistantProps {
    onVoiceQuery: (text: string) => Promise<string>;
}

export function VoiceAssistant({ onVoiceQuery }: VoiceAssistantProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');
    const recognitionRef = useRef<any>(null);
    const synthRef = useRef<SpeechSynthesis | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            synthRef.current = window.speechSynthesis;
        }
    }, []);

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            toast.error('Speech recognition not supported');
            return;
        }

        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
            setTranscript('');
            setResponse('');
            setIsProcessing(false);
        };

        recognition.onresult = async (event: any) => {
            const text = event.results[0][0].transcript;
            setTranscript(text);
            setIsListening(false);
            setIsProcessing(true); // Show processing state immediately

            try {
                const aiResponse = await onVoiceQuery(text);
                setResponse(aiResponse);
                setIsProcessing(false);
                speak(aiResponse);
            } catch (error) {
                toast.error('Failed to get response');
                setIsListening(false);
                setIsProcessing(false);
            }
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            toast.error('Speech recognition error');
            setIsListening(false);
            setIsProcessing(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    const speak = (text: string) => {
        if (!synthRef.current) return;

        synthRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Enhanced natural human-like voice settings for female voice
        utterance.rate = 0.92; // Slightly slower for clarity and naturalness
        utterance.pitch = 1.05; // Slightly higher for female voice warmth
        utterance.volume = 1.0;

        // Try to use high-quality female voice
        const voices = synthRef.current.getVoices();

        // Priority order: Premium female voices > Indian English female > Google female > Any female English
        const preferredVoice =
            // Premium/Enhanced female voices (common on macOS/iOS)
            voices.find(voice => voice.name.includes('Samantha')) || // High-quality US English female
            voices.find(voice => voice.name.includes('Karen')) || // Australian English female
            voices.find(voice => voice.name.includes('Moira')) || // Irish English female
            voices.find(voice => voice.name.includes('Tessa')) || // South African English female

            // Indian English female voices
            voices.find(voice => voice.name.includes('Veena')) ||
            voices.find(voice => (voice.lang === 'en-IN' || voice.lang.startsWith('en-IN')) && voice.name.toLowerCase().includes('female')) ||

            // Google female voices
            voices.find(voice => voice.name.includes('Google') && voice.name.toLowerCase().includes('female')) ||
            voices.find(voice => voice.name.includes('Google UK English Female')) ||
            voices.find(voice => voice.name.includes('Google US English Female')) ||

            // Natural/Premium female voices
            voices.find(voice => (voice.name.includes('Natural') || voice.name.includes('Premium')) && voice.name.toLowerCase().includes('female')) ||

            // British English female (often higher quality)
            voices.find(voice => voice.lang === 'en-GB' && voice.name.toLowerCase().includes('female')) ||

            // Any English female voice
            voices.find(voice => voice.lang.startsWith('en') && voice.name.toLowerCase().includes('female')) ||

            // Fallback to any high-quality voice
            voices.find(voice => voice.name.includes('Samantha') || voice.name.includes('Karen')) ||
            voices.find(voice => voice.lang.startsWith('en'));

        if (preferredVoice) {
            utterance.voice = preferredVoice;
            console.log('Using voice:', preferredVoice.name, '|', preferredVoice.lang);
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);

        synthRef.current.speak(utterance);
    };

    const stopSpeaking = () => {
        if (synthRef.current) {
            synthRef.current.cancel();
            setIsSpeaking(false);
        }
    };

    const handleClose = () => {
        stopListening();
        stopSpeaking();
        setIsOpen(false);
        setTranscript('');
        setResponse('');
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/60 transition-all duration-300 flex items-center justify-center z-50 group hover:scale-105"
                style={{ backgroundColor: '#05B6D4' }}
                title="Voice Assistant"
            >
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity" style={{ backgroundColor: '#05B6D4' }} />
                <Mic className="w-6 h-6 text-black relative z-10" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-gray-900/95 via-purple-900/20 to-gray-900/95 border border-purple-500/20 rounded-3xl shadow-2xl shadow-purple-500/20 p-6 w-96">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 blur-xl -z-10" />

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                            Voice Mode
                        </h3>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Animated Orb */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        {/* Outer rings */}
                        {(isListening || isSpeaking || isProcessing) && (
                            <>
                                <div className={`absolute inset-0 rounded-full ${isListening ? 'bg-purple-500/20' :
                                        isProcessing ? 'bg-cyan-500/20' :
                                            'bg-indigo-500/20'
                                    } animate-ping`} style={{ animationDuration: '2s' }} />
                                <div className={`absolute inset-0 rounded-full ${isListening ? 'bg-purple-500/10' :
                                        isProcessing ? 'bg-cyan-500/10' :
                                            'bg-indigo-500/10'
                                    } animate-pulse`} />
                            </>
                        )}

                        {/* Main orb */}
                        <div className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 ${isListening
                                ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50'
                                : isProcessing
                                    ? 'bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/50 animate-pulse'
                                    : isSpeaking
                                        ? 'bg-gradient-to-br from-indigo-500 to-blue-500 shadow-lg shadow-indigo-500/50 animate-pulse'
                                        : 'bg-gradient-to-br from-gray-700 to-gray-800 shadow-lg shadow-gray-700/30'
                            }`}>
                            <Mic className={`w-10 h-10 transition-all duration-300 ${isListening ? 'text-white scale-110' :
                                    (isSpeaking || isProcessing) ? 'text-white' :
                                        'text-gray-400'
                                }`} />
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div className="text-center mb-6 min-h-[80px]">
                    {isListening && (
                        <div className="space-y-2">
                            <p className="text-purple-400 font-medium animate-pulse">Listening...</p>
                            <div className="flex justify-center gap-1">
                                <div className="w-1 h-8 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                                <div className="w-1 h-10 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                                <div className="w-1 h-6 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                                <div className="w-1 h-9 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '450ms' }} />
                            </div>
                        </div>
                    )}

                    {isProcessing && !isListening && (
                        <div className="space-y-2">
                            <p className="text-cyan-400 font-medium animate-pulse">Thinking...</p>
                            <div className="flex justify-center gap-1">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}

                    {isSpeaking && !isListening && !isProcessing && (
                        <div className="space-y-2">
                            <p className="text-indigo-400 font-medium">Speaking...</p>
                            <p className="text-sm text-gray-400 line-clamp-3">{response}</p>
                        </div>
                    )}

                    {transcript && !isListening && !isSpeaking && !isProcessing && (
                        <div className="space-y-2">
                            <p className="text-xs text-gray-500 uppercase tracking-wider">You said:</p>
                            <p className="text-sm text-gray-300 italic">"{transcript}"</p>
                        </div>
                    )}

                    {!transcript && !isListening && !isSpeaking && !isProcessing && (
                        <p className="text-gray-500 text-sm">Tap the button below to speak</p>
                    )}
                </div>

                {/* Controls */}
                <div className="flex justify-center">
                    {!isListening && !isSpeaking && (
                        <button
                            onClick={startListening}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-full font-medium transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105"
                        >
                            <Mic className="w-4 h-4 inline mr-2" />
                            Start Speaking
                        </button>
                    )}

                    {isListening && (
                        <button
                            onClick={stopListening}
                            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full font-medium transition-all duration-300 shadow-lg shadow-red-500/30"
                        >
                            Stop
                        </button>
                    )}

                    {isSpeaking && (
                        <button
                            onClick={stopSpeaking}
                            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full font-medium transition-all duration-300"
                        >
                            Stop Speaking
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
