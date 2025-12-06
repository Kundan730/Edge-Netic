'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Cpu, CheckCircle, XCircle, Download, Database, Lock, Zap, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background layers */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-transparent to-purple-950/20" />

        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-cyan-500/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-cyan-400" />
            <div>
              <h1 className="text-xl font-bold tracking-wider text-cyan-400">
                EDGE-NETIC
              </h1>
              <p className="text-xs text-gray-500">PRIVACY FIRST AI</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-400">OFFLINE SECURE</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-7xl md:text-8xl font-bold tracking-wider mb-6">
            <span className="text-white">EDGE</span>
            <span className="text-cyan-400">-</span>
            <span className="text-cyan-400">NETIC</span>
          </h2>
          <p className="text-2xl md:text-3xl text-cyan-400 mb-6">
            Privacy-First AI Platform
          </p>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Run powerful AI models directly in your browser. No servers, no data transmission,
            complete privacy. Your conversations stay on your device.
          </p>
        </div>

        {/* System Check Section */}
        <div className="max-w-2xl mx-auto mb-16">


          {/* System Check Cards */}
          <div className="space-y-4 mb-8">
            {/* WebGPU Check */}
            <div className="bg-gray-950/50 border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-500/40 transition-all backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">WebGPU Acceleration</h4>
                    <p className="text-base text-gray-500">
                      {isChecking ? 'Scanning...' : webGPUSupported ? 'Available' : 'Not Available'}
                    </p>
                  </div>
                </div>
                {isChecking ? (
                  <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                ) : webGPUSupported ? (
                  <CheckCircle className="w-6 h-6 text-cyan-400" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400" />
                )}
              </div>
            </div>

            {/* Storage Check */}
            <div className="bg-gray-950/50 border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-500/40 transition-all backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <Database className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Local Storage</h4>
                    <p className="text-base text-gray-500">Ready for ~800MB Model</p>
                  </div>
                </div>
                <CheckCircle className="w-6 h-6 text-cyan-400" />
              </div>
            </div>

            {/* GPU Info (if available) */}
            {webGPUSupported && gpuInfo && (
              <div className="bg-gray-950/50 border border-cyan-500/20 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-sm text-gray-500 mb-1">DETECTED GPU</p>
                <p className="text-base text-cyan-400">{gpuInfo}</p>
              </div>
            )}
          </div>

          {/* Initialize Button */}
          {!isChecking && (
            <>
              {webGPUSupported ? (
                <div className="space-y-4">
                  <Button
                    onClick={handleInitialize}
                    className="w-full h-16 bg-transparent border-2 border-cyan-500 hover:bg-cyan-500/10 text-cyan-400 font-bold text-2xl tracking-wider transition-all"
                  >
                    <Download className="w-6 h-6 mr-2" />
                    INITIALIZE AI
                  </Button>
                  <p className="text-center text-sm text-gray-600">
                    First launch downloads AI model • Cached permanently • 100% offline
                  </p>
                </div>
              ) : (
                <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle className="w-5 h-5 text-red-400" />
                    <p className="text-red-400 font-semibold">WEBGPU NOT SUPPORTED</p>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">
                    Your browser doesn't support WebGPU. Please use:
                  </p>
                  <ul className="text-sm text-gray-400 space-y-1 ml-6 list-disc">
                    <li>Chrome/Edge 113+ (recommended)</li>
                    <li>Enable chrome://flags/#enable-unsafe-webgpu</li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        {/* Features Grid */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
            WHY EDGE-NETIC?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'COMPLETE PRIVACY',
                description: 'All AI processing happens on your device. Zero data leaves your browser.',
              },
              {
                icon: Zap,
                title: 'GPU ACCELERATED',
                description: 'WebGPU-powered inference delivers fast, responsive AI interactions.',
              },
              {
                icon: Database,
                title: 'FULLY OFFLINE',
                description: 'Works completely offline after initial setup. No internet required.',
              }
            ].map((feature, idx) => (
              <Card key={idx} className="bg-gray-950/30 border-cyan-500/20 hover:border-cyan-500/40 transition-all backdrop-blur-sm">
                <CardContent className="pt-6 space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h4 className="font-semibold text-white text-lg">{feature.title}</h4>
                  <p className="text-gray-400 text-base leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-3xl mx-auto">
          <Card className="bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border-cyan-500/20 backdrop-blur-sm">
            <CardContent className="py-8">
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-5xl md:text-6xl font-bold text-cyan-400">800MB</p>
                  <p className="text-base text-gray-400 mt-2">Model Size</p>
                </div>
                <div>
                  <p className="text-5xl md:text-6xl font-bold text-cyan-400">0ms</p>
                  <p className="text-base text-gray-400 mt-2">Server Latency</p>
                </div>
                <div>
                  <p className="text-5xl md:text-6xl font-bold text-cyan-400">100%</p>
                  <p className="text-base text-gray-400 mt-2">Private</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-cyan-500/20 py-6 mt-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Shield className="w-3 h-3" />
                <span>100% Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-3 h-3" />
                <span>GPU Accelerated</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-3 h-3" />
                <span>Fully Offline</span>
              </div>
            </div>
            <span>Built with Next.js • WebGPU • MLC-LLM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
