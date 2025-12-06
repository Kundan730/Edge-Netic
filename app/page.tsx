'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Cpu, CheckCircle, XCircle, Lock, Zap, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const router = useRouter();
  const [webGPUSupported, setWebGPUSupported] = useState<boolean | null>(null);
  const [gpuInfo, setGpuInfo] = useState<string>('');
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkWebGPUSupport();
  }, []);

  const checkWebGPUSupport = async () => {
    try {
      if (!navigator.gpu) {
        setWebGPUSupported(false);
        setIsChecking(false);
        return;
      }

      const adapter = await navigator.gpu.requestAdapter();
      if (adapter) {
        setWebGPUSupported(true);
        const info = adapter.info;
        setGpuInfo(info?.description || info?.vendor || 'WebGPU Compatible Device');
      } else {
        setWebGPUSupported(false);
      }
    } catch (error) {
      console.error('WebGPU check failed:', error);
      setWebGPUSupported(false);
    } finally {
      setIsChecking(false);
    }
  };

  const handleInitialize = () => {
    router.push('/chat');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>

      <div className="relative z-10 w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="w-12 h-12 text-cyan-400 animate-pulse-slow" />
            <h1 className="text-6xl font-bold text-gradient">
              Edge-Netic
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Privacy-First AI Chat - Run AI models locally in your browser with WebGPU
          </p>
        </div>

        <Card className="glass glow-cyan border-cyan-400/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Cpu className="w-6 h-6 text-cyan-400" />
              System Check
            </CardTitle>
            <CardDescription className="text-gray-400">
              Verifying your browser compatibility
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-white/5">
                <div className="flex items-center gap-3">
                  {isChecking ? (
                    <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  ) : webGPUSupported ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400" />
                  )}
                  <div>
                    <p className="font-semibold text-white">WebGPU Support</p>
                    <p className="text-sm text-gray-400">Required for local AI inference</p>
                  </div>
                </div>
                <span className={`text-sm font-mono px-3 py-1 rounded ${
                  webGPUSupported
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {isChecking ? 'Checking...' : webGPUSupported ? 'ACTIVE' : 'UNAVAILABLE'}
                </span>
              </div>

              {webGPUSupported && gpuInfo && (
                <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-white/5">
                  <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6 text-purple-400" />
                    <div>
                      <p className="font-semibold text-white">GPU Device</p>
                      <p className="text-sm text-gray-400 font-mono">{gpuInfo}</p>
                    </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
              )}
            </div>

            {!isChecking && (
              <>
                {webGPUSupported ? (
                  <div className="space-y-4">
                    <Button
                      onClick={handleInitialize}
                      className="w-full h-14 text-lg bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold shadow-lg glow-cyan transition-all duration-300"
                    >
                      <Lock className="w-5 h-5 mr-2" />
                      Initialize Vault
                    </Button>
                    <p className="text-center text-sm text-gray-500">
                      First launch will download ~800MB AI model
                    </p>
                  </div>
                ) : (
                  <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-lg space-y-3">
                    <p className="text-red-400 font-semibold flex items-center gap-2">
                      <XCircle className="w-5 h-5" />
                      WebGPU Not Supported
                    </p>
                    <p className="text-sm text-gray-400">
                      Your browser doesn't support WebGPU. Please use:
                    </p>
                    <ul className="text-sm text-gray-400 space-y-1 ml-6 list-disc">
                      <li>Chrome/Edge 113+ (recommended)</li>
                      <li>Enable chrome://flags/#enable-unsafe-webgpu if needed</li>
                    </ul>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass border-white/10">
            <CardContent className="pt-6 text-center space-y-2">
              <Eye className="w-8 h-8 text-cyan-400 mx-auto" />
              <h3 className="font-semibold text-white">100% Private</h3>
              <p className="text-sm text-gray-400">Zero data transmitted to servers</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardContent className="pt-6 text-center space-y-2">
              <Download className="w-8 h-8 text-purple-400 mx-auto" />
              <h3 className="font-semibold text-white">Fully Offline</h3>
              <p className="text-sm text-gray-400">Works without internet after setup</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardContent className="pt-6 text-center space-y-2">
              <Shield className="w-8 h-8 text-green-400 mx-auto" />
              <h3 className="font-semibold text-white">Your Device</h3>
              <p className="text-sm text-gray-400">All processing happens locally</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
