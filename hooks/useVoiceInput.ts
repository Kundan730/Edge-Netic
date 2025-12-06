import { useState, useRef, useCallback, useEffect } from 'react';

export interface VoiceInputHookReturn {
    isListening: boolean;
    transcript: string;
    error: string | null;
    startListening: () => void;
    stopListening: () => void;
    resetTranscript: () => void;
    isSupported: boolean;
}

export const useVoiceInput = (language: string = 'en-US'): VoiceInputHookReturn => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSupported, setIsSupported] = useState(false);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        // Check if speech recognition is supported
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            setIsSupported(true);
        } else {
            setIsSupported(false);
            setError('Speech recognition not supported in this browser');
        }
    }, []);

    const startListening = useCallback(() => {
        if (!isSupported) {
            setError('Speech recognition not supported in this browser');
            return;
        }

        try {
            const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
            recognitionRef.current = new SpeechRecognition();

            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = language;
            recognitionRef.current.maxAlternatives = 1;

            recognitionRef.current.onstart = () => {
                setIsListening(true);
                setError(null);
                console.log('Voice recognition started');
            };

            recognitionRef.current.onresult = (event: any) => {
                const current = event.resultIndex;
                const transcriptText = event.results[current][0].transcript;
                setTranscript(transcriptText);

                // If it's a final result, log it
                if (event.results[current].isFinal) {
                    console.log('Final transcript:', transcriptText);
                }
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
                console.log('Voice recognition ended');
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                setError(`Speech recognition error: ${event.error}`);
                setIsListening(false);
            };

            recognitionRef.current.start();
        } catch (err) {
            console.error('Failed to start speech recognition:', err);
            setError('Failed to start speech recognition');
            setIsListening(false);
        }
    }, [isSupported, language]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    }, []);

    const resetTranscript = useCallback(() => {
        setTranscript('');
        setError(null);
    }, []);

    return {
        isListening,
        transcript,
        error,
        startListening,
        stopListening,
        resetTranscript,
        isSupported
    };
};
