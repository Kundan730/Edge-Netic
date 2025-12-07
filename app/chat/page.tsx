'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Trash2, Lock, Loader2, Download, ArrowLeft, Bot, Menu, BarChart3, Shield, Pause, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Conversation, Message, Stats, PersonaType } from '@/types/chat';
import {
  saveConversations,
  loadConversations,
  generateId,
  generateConversationTitle,
  saveStats,
  loadStats,
} from '@/lib/storageUtils';
import { getPersonaSystemMessage } from '@/lib/personaPrompts';
import { MessageItem } from '@/components/MessageItem';
import { ConversationSidebar } from '@/components/ConversationSidebar';
import { ExportMenu } from '@/components/ExportMenu';
import { PersonaSelector } from '@/components/PersonaSelector';
import { VoiceInputButton } from '@/components/VoiceInputButton';
import { AnalyticsModal } from '@/components/AnalyticsModal';
import { AdvancedSettings } from '@/components/AdvancedSettings';
import { ModelSelector } from '@/components/ModelSelector';
import { AISettings, loadSettings } from '@/lib/settingsStorage';
import { loadSelectedModel, getModelById } from '@/lib/modelConfig';

export default function ChatPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string>('');
  const [input, setInput] = useState('');
  const [isInitializing, setIsInitializing] = useState(true);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadStatus, setDownloadStatus] = useState('');
  const [downloadMB, setDownloadMB] = useState({ current: 0, total: 0 });
  const [currentStage, setCurrentStage] = useState('Initializing');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<PersonaType>('standard');
  const [stats, setStats] = useState<Stats>(loadStats());
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [aiSettings, setAiSettings] = useState<AISettings>(loadSettings());
  const [selectedModelId, setSelectedModelId] = useState<string>(loadSelectedModel());
  const modelLoadStartTimeRef = useRef<number>(0);
  const maxProgressRef = useRef<number>(0);

  const engineRef = useRef<any | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if engine is already initialized in this session
    const isEngineReady = sessionStorage.getItem('edge-netic-engine-ready');
    if (isEngineReady === 'true') {
      // Engine was initialized before, but check if reference still exists
      if (!engineRef.current) {
        // Reference lost (page refresh), need to re-initialize
        sessionStorage.removeItem('edge-netic-engine-ready');
        initializeEngine();
      } else {
        setIsInitializing(false);
        setDownloadStatus('Ready');
      }
    } else {
      initializeEngine();
    }
    loadConversationsFromStorage();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [activeConvId, conversations]);

  useEffect(() => {
    saveConversations(conversations);
  }, [conversations]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversationsFromStorage = () => {
    const loaded = loadConversations();
    setConversations(loaded);

    if (loaded.length > 0) {
      setActiveConvId(loaded[0].id);
      setSelectedPersona(loaded[0].persona);
    } else {
      createNewConversation();
    }
  };

  const initializeEngine = async () => {
    try {
      setIsInitializing(true);
      const selectedModel = getModelById(selectedModelId);
      const modelName = selectedModel?.displayName || 'AI Model';
      setDownloadStatus(`Initializing ${modelName}...`);
      modelLoadStartTimeRef.current = Date.now();

      const webllm = await import('@mlc-ai/web-llm');

      // Configure custom model URLs for all supported models
      const appConfig = {
        model_list: [
          {
            model_id: 'Llama-3.2-1B-Instruct-q4f16_1-MLC',
            model: 'https://huggingface.co/mlc-ai/Llama-3.2-1B-Instruct-q4f16_1-MLC/resolve/main/',
            model_lib: 'https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/web-llm-models/v0_2_80/Llama-3.2-1B-Instruct-q4f16_1-ctx4k_cs1k-webgpu.wasm',
          },
          {
            model_id: 'Qwen2.5-1.5B-Instruct-q4f16_1-MLC',
            model: 'https://huggingface.co/mlc-ai/Qwen2.5-1.5B-Instruct-q4f16_1-MLC/resolve/main/',
            model_lib: 'https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/web-llm-models/v0_2_80/Qwen2-1.5B-Instruct-q4f16_1-ctx4k_cs1k-webgpu.wasm',
          },
          {
            model_id: 'gemma-2-2b-it-q4f16_1-MLC',
            model: 'https://huggingface.co/mlc-ai/gemma-2-2b-it-q4f16_1-MLC/resolve/main/',
            model_lib: 'https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/web-llm-models/v0_2_80/gemma-2-2b-it-q4f16_1-ctx4k_cs1k-webgpu.wasm',
          },
          {
            model_id: 'Qwen2.5-Coder-3B-Instruct-q4f16_1-MLC',
            model: 'https://huggingface.co/mlc-ai/Qwen2.5-Coder-3B-Instruct-q4f16_1-MLC/resolve/main/',
            model_lib: 'https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/web-llm-models/v0_2_80/Qwen2.5-3B-Instruct-q4f16_1-ctx4k_cs1k-webgpu.wasm',
          },
          {
            model_id: 'Phi-3.5-mini-instruct-q4f16_1-MLC',
            model: 'https://huggingface.co/mlc-ai/Phi-3.5-mini-instruct-q4f16_1-MLC/resolve/main/',
            model_lib: 'https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/web-llm-models/v0_2_80/Phi-3.5-mini-instruct-q4f16_1-ctx4k_cs1k-webgpu.wasm',
          },
          {
            model_id: 'Mistral-7B-Instruct-v0.3-q4f16_1-MLC',
            model: 'https://huggingface.co/mlc-ai/Mistral-7B-Instruct-v0.3-q4f16_1-MLC/resolve/main/',
            model_lib: 'https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/web-llm-models/v0_2_80/Mistral-7B-Instruct-v0.3-q4f16_1-ctx4k_cs1k-webgpu.wasm',
          }
        ]
      };

      const modelToLoad = selectedModel?.name || 'Llama-3.2-1B-Instruct-q4f16_1-MLC';

      const engine = await webllm.CreateMLCEngine(
        modelToLoad,
        {
          appConfig,
          initProgressCallback: (progress) => {
            // Calculate progress percentage
            const percent = Math.round(progress.progress * 100);

            // Only update progress if it's higher than previous maximum (prevent backwards movement)
            if (percent > maxProgressRef.current) {
              maxProgressRef.current = percent;
              setDownloadProgress(percent);
            }

            // Detect and update current stage based on progress text
            let stage = 'Initializing';
            if (progress.text.includes('Downloading')) {
              stage = 'Downloading';
            } else if (progress.text.includes('Loading')) {
              stage = 'Loading';
            } else if (progress.text.includes('Compiling') || progress.text.includes('compile')) {
              stage = 'Compiling';
            } else if (progress.text.includes('Initializing')) {
              stage = 'Initializing';
            }
            setCurrentStage(stage);
            setDownloadStatus(progress.text);

            // Extract download size information if available
            if (progress.text.includes('Downloading')) {
              const match = progress.text.match(/(\d+\.\d+)\/(\d+\.\d+) MB/);
              if (match) {
                setDownloadMB({
                  current: parseFloat(match[1]),
                  total: parseFloat(match[2]),
                });
              }
            }
          },
        }
      );

      engineRef.current = engine;

      const loadTime = Date.now() - modelLoadStartTimeRef.current;
      setStats(prev => {
        const updated = { ...prev, modelLoadTime: loadTime };
        saveStats(updated);
        return updated;
      });
      // Mark engine as ready in session storage
      sessionStorage.setItem('edge-netic-engine-ready', 'true');
      sessionStorage.setItem('edge-netic-loaded-model', selectedModelId);

      setIsInitializing(false);
      setDownloadStatus('Ready');
      toast.success(`${modelName} loaded successfully!`);
    } catch (error) {
      console.error('Failed to initialize engine:', error);
      setDownloadStatus('Initialization failed. Please refresh the page.');
      setIsInitializing(false);
      toast.error('Failed to load AI model');
    }
  };

  const handleModelChange = (newModelId: string) => {
    // Clear engine ready flag to force re-initialization
    sessionStorage.removeItem('edge-netic-engine-ready');
    sessionStorage.removeItem('edge-netic-loaded-model');

    // Reload page to reinitialize with new model
    window.location.reload();
  };

  const createNewConversation = () => {
    const newConv: Conversation = {
      id: generateId(),
      title: 'New Conversation',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      persona: selectedPersona,
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveConvId(newConv.id);

    setStats(prev => {
      const updated = { ...prev, totalConversations: prev.totalConversations + 1, lastUpdated: Date.now() };
      saveStats(updated);
      return updated;
    });
  };

  const deleteConversation = (id: string) => {
    setConversations(prev => {
      const filtered = prev.filter(c => c.id !== id);

      if (id === activeConvId) {
        if (filtered.length > 0) {
          setActiveConvId(filtered[0].id);
          setSelectedPersona(filtered[0].persona);
        } else {
          createNewConversation();
        }
      }

      return filtered;
    });

    toast.success('Conversation deleted');
  };

  const getCurrentConversation = (): Conversation | undefined => {
    return conversations.find(c => c.id === activeConvId);
  };

  const updateConversation = (updates: Partial<Conversation>) => {
    setConversations(prev =>
      prev.map(c =>
        c.id === activeConvId
          ? { ...c, ...updates, updatedAt: Date.now() }
          : c
      )
    );
  };

  const handleSend = async (messageContent?: string) => {
    const content = messageContent || input.trim();
    if (!content || !engineRef.current || isGenerating) return;

    const currentConv = getCurrentConversation();
    if (!currentConv) return;

    const userMessage: Message = {
      role: 'user',
      content: content,
      timestamp: Date.now(),
    };

    // Update conversation with user message
    const updatedMessages = [...currentConv.messages, userMessage];
    const title = currentConv.messages.length === 0 ? generateConversationTitle(content) : currentConv.title;

    updateConversation({ messages: updatedMessages, title });
    setInput('');
    setIsGenerating(true);

    const startTime = Date.now();

    try {
      // Build messages with system prompt
      const systemMessage: Message = {
        role: 'system',
        content: getPersonaSystemMessage(currentConv.persona),
        timestamp: Date.now(),
      };

      const chatMessages = [systemMessage, ...updatedMessages].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Streaming response with AI settings
      const completion = await engineRef.current.chat.completions.create({
        messages: chatMessages,
        temperature: aiSettings.temperature,
        max_tokens: aiSettings.maxTokens,
        top_p: aiSettings.topP,
        stream: true,
      });

      let fullResponse = '';
      const assistantMessage: Message = {
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
      };

      // Add empty assistant message for streaming
      updateConversation({ messages: [...updatedMessages, assistantMessage] });

      // Stream chunks
      for await (const chunk of completion) {
        const delta = chunk.choices[0]?.delta?.content || '';
        fullResponse += delta;

        // Update the last message with accumulated content
        setConversations(prev =>
          prev.map(c => {
            if (c.id === activeConvId) {
              const msgs = [...c.messages];
              msgs[msgs.length - 1] = {
                ...msgs[msgs.length - 1],
                content: fullResponse,
              };
              return { ...c, messages: msgs, updatedAt: Date.now() };
            }
            return c;
          })
        );
      }

      const responseTime = Date.now() - startTime;
      const estimatedTokens = Math.ceil((content.length + fullResponse.length) / 4);

      // Update stats
      setStats(prev => {
        const newTotalMessages = prev.totalMessages + 2;
        const newAvgResponseTime =
          (prev.avgResponseTime * prev.totalMessages + responseTime) / newTotalMessages;

        const updated = {
          ...prev,
          totalMessages: newTotalMessages,
          avgResponseTime: Math.round(newAvgResponseTime),
          totalTokens: prev.totalTokens + estimatedTokens,
          lastUpdated: Date.now(),
        };

        saveStats(updated);
        return updated;
      });

    } catch (error) {
      console.error('Failed to generate response:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error generating a response. Please try again.',
        timestamp: Date.now(),
      };

      updateConversation({ messages: [...updatedMessages, errorMessage] });
      toast.error('Failed to generate response');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = async () => {
    const currentConv = getCurrentConversation();
    if (!currentConv || currentConv.messages.length < 2) return;

    // Remove last assistant message
    const messagesWithoutLast = currentConv.messages.slice(0, -1);
    updateConversation({ messages: messagesWithoutLast });

    // Get the last user message
    const lastUserMessage = messagesWithoutLast[messagesWithoutLast.length - 1];
    if (lastUserMessage && lastUserMessage.role === 'user') {
      await handleSend(lastUserMessage.content);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceTranscript = (text: string) => {
    setInput(prev => prev + (prev ? ' ' : '') + text);
  };

  const handlePersonaChange = (persona: PersonaType) => {
    setSelectedPersona(persona);
    updateConversation({ persona });
  };

  const clearCurrentChat = () => {
    const currentConv = getCurrentConversation();
    if (!currentConv) return;

    if (confirm('Clear all messages in this conversation? This cannot be undone.')) {
      updateConversation({ messages: [], title: 'New Conversation' });
      toast.success('Conversation cleared');
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>

        <div className="relative z-10 w-full max-w-2xl space-y-6">
          <div className="text-center space-y-2">
            <Download className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
            <h2 className="text-3xl font-bold text-gradient">Downloading AI Brain</h2>
            <p className="text-gray-400">First-time setup - This will take a few minutes</p>
          </div>

          <Card className="glass border-cyan-400/20">
            <CardContent className="pt-6 space-y-4">
              {/* Stage Indicator */}
              <div className="text-center mb-2">
                <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 font-semibold text-sm">
                  {currentStage}
                </span>
              </div>

              <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-mono">{downloadProgress}%</span>
                {downloadMB.total > 0 && (
                  <span className="text-gray-400 font-mono">
                    {downloadMB.current.toFixed(1)} / {downloadMB.total.toFixed(1)} MB
                  </span>
                )}
              </div>

              <div className="p-4 bg-black/40 rounded-lg border border-white/5">
                <p className="text-sm text-cyan-400 font-mono">{downloadStatus}</p>
              </div>

              <div className="space-y-2 text-xs text-gray-500">
                <p>• Model is cached locally after first download</p>
                <p>• Next time you visit, it will load instantly</p>
                <p>• All processing happens on your device</p>
              </div>
            </CardContent>
          </Card>

          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="w-full border-white/20 hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const currentConv = getCurrentConversation();

  return (
    <div className="h-screen flex overflow-hidden bg-black">
      {/* Sidebar - Toggleable on all screen sizes */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed md:static z-50 md:z-0 transition-transform duration-300 ease-in-out h-full w-64`}>
        <ConversationSidebar
          conversations={conversations}
          activeConvId={activeConvId}
          onSelectConversation={(id) => {
            setActiveConvId(id);
            const conv = conversations.find(c => c.id === id);
            if (conv) setSelectedPersona(conv.persona);
          }}
          onNewConversation={createNewConversation}
          onDeleteConversation={deleteConversation}
          isMobileOpen={isSidebarOpen}
          onMobileClose={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Overlay for mobile only */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}


      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="border-b border-cyan-500/20 bg-black/80 backdrop-blur-lg flex-shrink-0">
          <div className="px-4 md:px-6 py-3 md:py-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                >
                  <Menu className="w-5 h-5 md:w-6 md:h-6" />
                </Button>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                  <div>
                    <h1 className="text-base md:text-xl font-bold text-cyan-400 tracking-wider">EDGE-NETIC</h1>
                    <p className="text-[10px] text-gray-500 hidden sm:block">PRIVACY FIRST AI</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <PersonaSelector value={selectedPersona} onChange={handlePersonaChange} />

                <div className="px-2 md:px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-[10px] md:text-xs font-semibold text-green-400 hidden sm:inline">SECURE</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(true)}
                  className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 text-xs px-2 py-1"
                >
                  <Settings className="w-4 h-4" />
                </Button>

                <ModelSelector
                  currentModelId={selectedModelId}
                  onModelChange={handleModelChange}
                />

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAnalytics(true)}
                  className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 text-xs px-2 py-1"
                >
                  <BarChart3 className="w-4 h-4" />
                </Button>

                {getCurrentConversation() && (
                  <ExportMenu conversation={getCurrentConversation()!} />
                )}


                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearCurrentChat}
                  className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
            {!currentConv || currentConv.messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
                <Bot className="w-16 h-16 text-cyan-400 animate-pulse-slow" />
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-semibold text-white">Your Private AI Assistant</h3>
                  <p className="text-gray-400 max-w-md text-sm md:text-base">
                    Start a conversation. Everything runs locally on your device.
                  </p>
                  <p className="text-sm text-cyan-400">
                    Current Persona: {selectedPersona}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mt-6">
                  <button
                    onClick={() => setInput('What are you capable of?')}
                    className="p-4 glass hover:bg-white/10 rounded-lg text-left transition-all duration-300 border border-white/10 hover:border-cyan-400/50"
                  >
                    <p className="text-sm text-gray-300">What are you capable of?</p>
                  </button>
                  <button
                    onClick={() => setInput('Explain quantum computing in simple terms')}
                    className="p-4 glass hover:bg-white/10 rounded-lg text-left transition-all duration-300 border border-white/10 hover:border-purple-400/50"
                  >
                    <p className="text-sm text-gray-300">Explain quantum computing</p>
                  </button>
                  <button
                    onClick={() => setInput('Write a haiku about privacy')}
                    className="p-4 glass hover:bg-white/10 rounded-lg text-left transition-all duration-300 border border-white/10 hover:border-cyan-400/50"
                  >
                    <p className="text-sm text-gray-300">Write a haiku about privacy</p>
                  </button>
                  <button
                    onClick={() => setInput('Tell me a joke')}
                    className="p-4 glass hover:bg-white/10 rounded-lg text-left transition-all duration-300 border border-white/10 hover:border-purple-400/50"
                  >
                    <p className="text-sm text-gray-300">Tell me a joke</p>
                  </button>
                </div>
              </div>
            ) : (
              <>
                {currentConv.messages.map((message, index) => (
                  <MessageItem
                    key={index}
                    message={message}
                    onRegenerate={
                      index === currentConv.messages.length - 1 && message.role === 'assistant'
                        ? handleRegenerate
                        : undefined
                    }
                    isStreaming={isGenerating && index === currentConv.messages.length - 1}
                  />
                ))}

                {isGenerating && currentConv.messages[currentConv.messages.length - 1]?.content === '' && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="glass border border-white/10 p-4 rounded-2xl">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </main>

        {/* Input Area - Fixed at Bottom */}
        <div className="border-t border-cyan-500/20 bg-black/80 backdrop-blur-lg flex-shrink-0">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex gap-2 items-center">
              <VoiceInputButton onTranscript={handleVoiceTranscript} />

              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 h-[48px] resize-none bg-gray-950/50 border-cyan-500/20 text-white text-sm placeholder:text-gray-500 focus:border-cyan-400/50 focus:ring-cyan-400/20 rounded-lg px-3 py-3"
                disabled={isGenerating}
              />

              <Button
                onClick={() => handleSend()}
                disabled={!input.trim() || isGenerating}
                className="h-[48px] w-[48px] p-0 bg-transparent border-2 border-cyan-500 hover:bg-cyan-500/10 text-cyan-400 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isGenerating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>



      {/* Settings Modal */}
      {showSettings && (
        <AdvancedSettings
          settings={aiSettings}
          onSettingsChange={setAiSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Analytics Modal */}
      <AnalyticsModal
        open={showAnalytics}
        onOpenChange={setShowAnalytics}
        stats={stats}
      />
    </div>
  );
}
