export interface VoiceSettings {
    rate: number;
    pitch: number;
    volume: number;
    lang: string;
    voice?: SpeechSynthesisVoice;
}

const defaultSettings: VoiceSettings = {
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
    lang: 'en-US'
};

export const speakText = (text: string, settings: Partial<VoiceSettings> = {}): void => {
    if (!('speechSynthesis' in window)) {
        console.error('Text-to-speech not supported in this browser');
        return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const finalSettings = { ...defaultSettings, ...settings };
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.rate = finalSettings.rate;
    utterance.pitch = finalSettings.pitch;
    utterance.volume = finalSettings.volume;
    utterance.lang = finalSettings.lang;

    if (finalSettings.voice) {
        utterance.voice = finalSettings.voice;
    }

    utterance.onstart = () => {
        console.log('Speech started');
    };

    utterance.onend = () => {
        console.log('Speech ended');
    };

    utterance.onerror = (event) => {
        console.error('Speech error:', event.error);
    };

    window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = (): void => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
};

export const pauseSpeaking = (): void => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.pause();
    }
};

export const resumeSpeaking = (): void => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.resume();
    }
};

export const getAvailableVoices = (): Promise<SpeechSynthesisVoice[]> => {
    return new Promise((resolve) => {
        if (!('speechSynthesis' in window)) {
            resolve([]);
            return;
        }

        let voices = window.speechSynthesis.getVoices();

        if (voices.length > 0) {
            resolve(voices);
        } else {
            // Voices might not be loaded yet
            window.speechSynthesis.onvoiceschanged = () => {
                voices = window.speechSynthesis.getVoices();
                resolve(voices);
            };
        }
    });
};

export const isSpeechSynthesisSupported = (): boolean => {
    return 'speechSynthesis' in window;
};
