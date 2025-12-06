'use client';

import { Conversation } from '@/types/chat';
import { Download, FileText, FileJson, FileCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { exportAsText, exportAsJSON, exportAsMarkdown } from '@/lib/exportUtils';

interface ExportMenuProps {
    conversation: Conversation;
}

export function ExportMenu({ conversation }: ExportMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-white/20 text-gray-300 hover:bg-white/5">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-900 border-white/20">
                <DropdownMenuItem
                    onClick={() => exportAsText(conversation)}
                    className="text-gray-300 hover:bg-white/10 cursor-pointer"
                >
                    <FileText className="w-4 h-4 mr-2" />
                    Export as TXT
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => exportAsJSON(conversation)}
                    className="text-gray-300 hover:bg-white/10 cursor-pointer"
                >
                    <FileJson className="w-4 h-4 mr-2" />
                    Export as JSON
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => exportAsMarkdown(conversation)}
                    className="text-gray-300 hover:bg-white/10 cursor-pointer"
                >
                    <FileCode className="w-4 h-4 mr-2" />
                    Export as Markdown
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
