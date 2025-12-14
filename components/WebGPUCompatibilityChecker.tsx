'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CompatibilityStatus {
    webgpu: boolean;
    browser: string;
    browserVersion: string;
    os: string;
    gpuInfo?: string;
    recommendations: string[];
}

export function WebGPUCompatibilityChecker() {
    const [status, setStatus] = useState<CompatibilityStatus | null>(null);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        checkCompatibility();
    }, []);

    const checkCompatibility = async () => {
        setIsChecking(true);

        // Detect browser
        const userAgent = navigator.userAgent;
        let browser = 'Unknown';
        let browserVersion = 'Unknown';

        if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
            browser = 'Chrome';
            const match = userAgent.match(/Chrome\/(\d+)/);
            browserVersion = match ? match[1] : 'Unknown';
        } else if (userAgent.includes('Edg')) {
            browser = 'Edge';
            const match = userAgent.match(/Edg\/(\d+)/);
            browserVersion = match ? match[1] : 'Unknown';
        } else if (userAgent.includes('Firefox')) {
            browser = 'Firefox';
            const match = userAgent.match(/Firefox\/(\d+)/);
            browserVersion = match ? match[1] : 'Unknown';
        } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
            browser = 'Safari';
            const match = userAgent.match(/Version\/(\d+)/);
            browserVersion = match ? match[1] : 'Unknown';
        }

        // Detect OS
        let os = 'Unknown';
        if (userAgent.includes('Win')) os = 'Windows';
        else if (userAgent.includes('Mac')) os = 'macOS';
        else if (userAgent.includes('Linux')) os = 'Linux';
        else if (userAgent.includes('Android')) os = 'Android';
        else if (userAgent.includes('iOS')) os = 'iOS';

        // Check WebGPU support
        let webgpuSupported = false;
        let gpuInfo = undefined;
        const recommendations: string[] = [];

        if ('gpu' in navigator && navigator.gpu) {
            try {
                const adapter = await navigator.gpu.requestAdapter();
                if (adapter) {
                    webgpuSupported = true;
                    // Try to get GPU info if available
                    if (adapter.info) {
                        gpuInfo = `${adapter.info.vendor || 'Unknown'} ${adapter.info.device || 'GPU'}`;
                    }
                }
            } catch (error) {
                console.error('WebGPU check failed:', error);
            }
        }

        // Generate recommendations
        if (!webgpuSupported) {
            if (browser === 'Chrome' && parseInt(browserVersion) < 113) {
                recommendations.push('Update Chrome to version 113 or later');
            } else if (browser === 'Edge' && parseInt(browserVersion) < 113) {
                recommendations.push('Update Edge to version 113 or later');
            } else if (browser === 'Safari' && parseInt(browserVersion) < 17) {
                recommendations.push('Update Safari to version 17 or later (requires macOS Ventura)');
            } else if (browser === 'Firefox') {
                recommendations.push('Enable WebGPU in Firefox: about:config → dom.webgpu.enabled = true');
                recommendations.push('Or use Chrome/Edge for better compatibility');
            } else if (browser === 'Unknown') {
                recommendations.push('Use Chrome 113+, Edge 113+, or Safari 17+');
            }

            recommendations.push('Ensure hardware acceleration is enabled in browser settings');
            recommendations.push('Update your GPU drivers to the latest version');

            if (os === 'Windows') {
                recommendations.push('Windows 10 (1903+) or Windows 11 required');
            } else if (os === 'macOS') {
                recommendations.push('macOS Ventura (13.0) or later required');
            }
        }

        setStatus({
            webgpu: webgpuSupported,
            browser,
            browserVersion,
            os,
            gpuInfo,
            recommendations,
        });

        setIsChecking(false);
    };

    if (isChecking) {
        return (
            <Card className="glass border-cyan-500/20">
                <CardContent className="pt-6">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                        <p className="text-gray-400">Checking browser compatibility...</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!status) return null;

    return (
        <Card className={`border-2 ${status.webgpu ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {status.webgpu ? (
                        <>
                            <CheckCircle className="w-6 h-6 text-green-400" />
                            <span className="text-green-400">Browser Compatible</span>
                        </>
                    ) : (
                        <>
                            <XCircle className="w-6 h-6 text-red-400" />
                            <span className="text-red-400">Browser Not Compatible</span>
                        </>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* System Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500">Browser</p>
                        <p className="text-white font-medium">{status.browser} {status.browserVersion}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Operating System</p>
                        <p className="text-white font-medium">{status.os}</p>
                    </div>
                    {status.gpuInfo && (
                        <div className="col-span-2">
                            <p className="text-gray-500">GPU</p>
                            <p className="text-white font-medium">{status.gpuInfo}</p>
                        </div>
                    )}
                </div>

                {/* WebGPU Status */}
                <div className="flex items-center gap-2 p-3 rounded-lg bg-black/30">
                    {status.webgpu ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                        <XCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className={status.webgpu ? 'text-green-400' : 'text-red-400'}>
                        WebGPU: {status.webgpu ? 'Supported' : 'Not Supported'}
                    </span>
                </div>

                {/* Recommendations */}
                {!status.webgpu && status.recommendations.length > 0 && (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-yellow-400">
                            <AlertTriangle className="w-5 h-5" />
                            <span className="font-semibold">Recommendations:</span>
                        </div>
                        <ul className="space-y-1 text-sm text-gray-300 ml-7">
                            {status.recommendations.map((rec, index) => (
                                <li key={index} className="list-disc">{rec}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Help Links */}
                <div className="pt-4 border-t border-white/10">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open('https://webgpu.github.io/webgpu-samples/', '_blank')}
                        className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                    >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Test WebGPU Support
                    </Button>
                </div>

                {status.webgpu && (
                    <p className="text-sm text-green-400 text-center">
                        ✓ Your browser is ready to run AI models locally!
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
