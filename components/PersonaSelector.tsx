'use client';

import { PersonaType } from '@/types/chat';
import { PERSONAS } from '@/lib/personaPrompts';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface PersonaSelectorProps {
    value: PersonaType;
    onChange: (persona: PersonaType) => void;
}

export function PersonaSelector({ value, onChange }: PersonaSelectorProps) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[180px] bg-white/5 border-white/20 text-white">
                <SelectValue>
                    <div className="flex items-center gap-2">
                        <span>{PERSONAS[value].icon}</span>
                        <span>{PERSONAS[value].name}</span>
                    </div>
                </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-white/20">
                {(Object.keys(PERSONAS) as PersonaType[]).map((key) => (
                    <SelectItem
                        key={key}
                        value={key}
                        className="text-gray-300 hover:bg-white/10 cursor-pointer"
                    >
                        <div className="flex items-center gap-2">
                            <span>{PERSONAS[key].icon}</span>
                            <div className="flex flex-col">
                                <span className="font-medium">{PERSONAS[key].name}</span>
                                <span className="text-xs text-gray-500">{PERSONAS[key].description}</span>
                            </div>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
