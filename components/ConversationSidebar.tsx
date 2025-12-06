'use client';

import { Conversation } from '@/types/chat';
import { Plus, MessageSquare, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';

interface ConversationSidebarProps {
    conversations: Conversation[];
    activeConvId: string;
    onSelectConversation: (id: string) => void;
    onNewConversation: () => void;
    onDeleteConversation: (id: string) => void;
    isMobileOpen?: boolean;
    onMobileClose?: () => void;
}

export function ConversationSidebar({
    conversations,
    activeConvId,
    onSelectConversation,
    onNewConversation,
    onDeleteConversation,
    isMobileOpen = false,
    onMobileClose,
}: ConversationSidebarProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (deletingId === id) {
            onDeleteConversation(id);
            setDeletingId(null);
        } else {
            setDeletingId(id);
            setTimeout(() => setDeletingId(null), 3000);
        }
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onMobileClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed md:relative top-0 left-0 h-full w-64 bg-gray-900 border-r border-white/10 flex flex-col z-50 transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    }`}
            >
                {/* Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white">Conversations</h2>
                    {isMobileOpen && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onMobileClose}
                            className="md:hidden"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    )}
                </div>

                {/* New Conversation Button */}
                <div className="p-4">
                    <Button
                        onClick={onNewConversation}
                        className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        New Chat
                    </Button>
                </div>

                {/* Conversation List */}
                <ScrollArea className="flex-1">
                    <div className="p-2 space-y-2">
                        {conversations.length === 0 ? (
                            <div className="text-center text-gray-500 text-sm py-8">
                                No conversations yet
                            </div>
                        ) : (
                            conversations.map((conv) => (
                                <div
                                    key={conv.id}
                                    onClick={() => {
                                        onSelectConversation(conv.id);
                                        onMobileClose?.();
                                    }}
                                    className={`group p-3 rounded-lg cursor-pointer transition-all ${conv.id === activeConvId
                                            ? 'bg-cyan-500/20 border border-cyan-500/50'
                                            : 'hover:bg-white/5 border border-transparent'
                                        }`}
                                >
                                    <div className="flex items-start gap-2">
                                        <MessageSquare className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-white font-medium truncate">
                                                {conv.title}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(conv.updatedAt).toLocaleDateString()}
                                            </p>
                                            <p className="text-xs text-gray-600 mt-0.5">
                                                {conv.messages.length} messages
                                            </p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => handleDelete(conv.id, e)}
                                            className={`opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 ${deletingId === conv.id
                                                    ? 'text-red-400 hover:text-red-300'
                                                    : 'text-gray-400 hover:text-white'
                                                }`}
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </Button>
                                    </div>
                                    {deletingId === conv.id && (
                                        <p className="text-xs text-red-400 mt-2">Click again to confirm</p>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>

                {/* Footer */}
                <div className="p-4 border-t border-white/10">
                    <p className="text-xs text-gray-500 text-center">
                        {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>
        </>
    );
}
