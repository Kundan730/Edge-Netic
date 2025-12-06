'use client';

import { Stats } from '@/types/chat';
import { BarChart3, MessageSquare, Clock, Zap, Hash } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';

interface AnalyticsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    stats: Stats;
}

export function AnalyticsModal({ open, onOpenChange, stats }: AnalyticsModalProps) {
    const formatTime = (ms: number) => {
        if (ms < 1000) return `${ms}ms`;
        return `${(ms / 1000).toFixed(2)}s`;
    };

    const statCards = [
        {
            icon: MessageSquare,
            label: 'Total Messages',
            value: stats.totalMessages.toLocaleString(),
            color: 'text-cyan-400',
            bgColor: 'bg-cyan-500/10',
        },
        {
            icon: Hash,
            label: 'Conversations',
            value: stats.totalConversations.toLocaleString(),
            color: 'text-purple-400',
            bgColor: 'bg-purple-500/10',
        },
        {
            icon: Clock,
            label: 'Avg Response Time',
            value: formatTime(stats.avgResponseTime),
            color: 'text-green-400',
            bgColor: 'bg-green-500/10',
        },
        {
            icon: Zap,
            label: 'Model Load Time',
            value: formatTime(stats.modelLoadTime),
            color: 'text-yellow-400',
            bgColor: 'bg-yellow-500/10',
        },
        {
            icon: BarChart3,
            label: 'Estimated Tokens',
            value: stats.totalTokens.toLocaleString(),
            color: 'text-pink-400',
            bgColor: 'bg-pink-500/10',
        },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-gray-900 border-white/20 text-white max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center gap-2">
                        <BarChart3 className="w-6 h-6 text-cyan-400" />
                        Analytics Dashboard
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Your Edge-Netic usage statistics
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {statCards.map((stat) => (
                        <Card key={stat.label} className="glass border-white/10">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3">
                                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">{stat.label}</p>
                                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-6 p-4 bg-black/40 rounded-lg border border-white/5">
                    <p className="text-xs text-gray-500">
                        Last updated: {new Date(stats.lastUpdated).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                        All processing happens locally on your device. No data is transmitted.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
