'use client';

import { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface VoiceInputButtonProps {
    onTranscript: (text: string) => void;
}

export function VoiceInputButton({ onTranscript }: VoiceInputButtonProps) {
    const [isListening, setIsListening] = useState(false);
    const [isSupported, setIsSupported] = useState(false);

    useEffect(() => {
        // Check if Web Speech API is supported
        setIsSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
    }, []);

    const startListening = () => {
        if (!isSupported) {
            toast.error('Voice input is not supported in your browser');
            return;
        }

        try {
            const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
            const recognition = new SpeechRecognition();

            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                setIsListening(true);
                toast.info('Listening... Speak now');
            };

            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                onTranscript(transcript);
                toast.success('Voice input captured!');
            };

            recognition.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);

                if (event.error === 'not-allowed') {
                    toast.error('Microphone permission denied');
                } else if (event.error === 'no-speech') {
                    toast.error('No speech detected');
                } else {
                    toast.error('Voice input failed');
                }
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.start();
        } catch (error) {
            console.error('Failed to start voice recognition:', error);
            toast.error('Failed to start voice input');
            setIsListening(false);
        }
    };

    if (!isSupported) {
        return null;
    }

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={startListening}
            disabled={isListening}
            className={`border-white/20 ${isListening
                    ? 'bg-red-500/20 border-red-500/50 animate-pulse'
                    : 'hover:bg-white/5'
                }`}
        >
            {isListening ? (
                <MicOff className="w-5 h-5 text-red-400" />
            ) : (
                <Mic className="w-5 h-5 text-gray-300" />
            )}
        </Button>
    );
}
