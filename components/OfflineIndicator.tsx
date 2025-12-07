'use client';

import { useEffect, useState } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { toast } from 'sonner';

export function OfflineIndicator() {
    const isOnline = useOnlineStatus();
    const [hasShownToast, setHasShownToast] = useState(false);

    useEffect(() => {
        if (!isOnline && !hasShownToast) {
            toast.warning('You are offline. The AI model will still work locally!');
            setHasShownToast(true);
        } else if (isOnline && hasShownToast) {
            toast.success('Back online!');
            setHasShownToast(false);
        }
    }, [isOnline, hasShownToast]);

    return (
        <div
            className={`px-2 md:px-3 py-1 rounded-full flex items-center gap-1.5 transition-all duration-300 ${isOnline
                    ? 'bg-green-500/10 border border-green-500/30'
                    : 'bg-orange-500/10 border border-orange-500/30'
                }`}
            title={isOnline ? 'Online - All features available' : 'Offline - AI model works locally'}
        >
            <div
                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse ${isOnline ? 'bg-green-400' : 'bg-orange-400'
                    }`}
            />
            {isOnline ? (
                <Wifi className="w-3 h-3 text-green-400 hidden sm:block" />
            ) : (
                <WifiOff className="w-3 h-3 text-orange-400 hidden sm:block" />
            )}
            <span
                className={`text-[10px] md:text-xs font-semibold hidden sm:inline ${isOnline ? 'text-green-400' : 'text-orange-400'
                    }`}
            >
                {isOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
        </div>
    );
}
