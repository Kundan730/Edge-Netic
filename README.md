# 🧠 Edge-Netic

> **Privacy-First AI Chat PWA** - Your conversations, your device, your data.

**Edge-Netic** is a cutting-edge Progressive Web App that brings AI directly to your browser. No servers, no cloud, no data leaks - just pure, private AI running locally on your device using WebGPU acceleration.

Built in **DEEP Open Innovation Hackathon 2025** 🚀

---

## 🔗 Links

- **Live Demo**: https://edge-netic.vercel.app/]

---

## ✨ Key Features

### 🔒 **100% Private & Secure**
- All AI processing happens **locally on your device**
- Zero data transmission to external servers
- No analytics, tracking, or telemetry
- Your conversations never leave your browser

### ⚡ **Blazing Fast Performance**
- **WebGPU acceleration** for lightning-fast inference
- Model caching for instant subsequent loads
- Optimized for both desktop and mobile devices
- Smooth, responsive UI with real-time updates

### 🌐 **Fully Offline Capable**
- Works completely offline after initial setup
- Progressive Web App (PWA) - install like a native app
- Service worker caching for instant loading
- No internet required for AI conversations

### 🎨 **Rich User Experience**
- **7 AI Models**: Llama 3.2 (1B & 3B), Qwen 2.5, Gemma 2, Phi 3.5, Mistral 7B, Qwen Coder
- **5 AI Personas**: Standard, Professional, Friendly, Creative, Technical
- **Multiple Conversations**: Manage separate chat threads with auto-titling
- **Export Options**: Save conversations as TXT, JSON, or Markdown
- **Voice Input & Assistant**: Speak messages + hands-free voice-only mode
- **File Attachments**: Upload and analyze PDF, DOCX, TXT files
- **Markdown Support**: Rich text formatting with syntax highlighting
- **Code Highlighting**: Copy code blocks with one click
- **Analytics Dashboard**: Track usage statistics locally
- **Theme Customization**: Dark/Light mode toggle
- **Offline Indicator**: Real-time connection status
- **Advanced AI Settings**: Customize temperature, tokens, top_p
- **Stage Indicators**: Clear progress during model initialization

### 🛠️ **Developer-Friendly**
- Built with modern web technologies
- Clean, maintainable codebase
- Fully typed with TypeScript
- Responsive design with Tailwind CSS

---

## 🚀 Quick Start

### Prerequisites

- **Browser**: Chrome/Edge 113+ or Opera 99+ (WebGPU support required)
- **RAM**: Minimum 2GB available
- **Storage**: ~800MB for AI model cache
- **GPU**: WebGPU-compatible graphics card

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/edge-netic.git
   cd edge-netic
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Production Build

```bash
# Build the application
npm run build

# Serve the static build
npm start
```

The optimized static site will be generated in the `out` directory and served on `http://localhost:3000`.

---

## 🏗️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 13.5 (App Router) |
| **AI Engine** | @mlc-ai/web-llm 0.2.80 |
| **AI Models** | Llama 3.2 (1B & 3B), Qwen 2.5, Gemma 2, Phi 3.5, Mistral 7B, Qwen Coder |
| **Styling** | Tailwind CSS 3.3 + next-themes |
| **UI Components** | shadcn/ui with Radix UI primitives |
| **PWA** | next-pwa 5.6 |
| **Language** | TypeScript 5.2 |
| **Markdown** | react-markdown + rehype-highlight + remark-gfm |
| **File Processing** | pdfjs-dist, mammoth (DOCX) |
| **Voice** | Web Speech API (Recognition & Synthesis) |
| **State Management** | React Hooks + localStorage + IndexedDB |

---

## 📱 Features Breakdown

### 🎭 AI Personas

Choose from 5 distinct AI personalities:

1. **🤖 Standard** - Balanced and neutral responses (default)
2. **💼 Professional** - Formal and concise for business use
3. **😊 Friendly** - Warm and conversational tone
4. **🎨 Creative** - Imaginative and expressive
5. **⚙️ Technical** - Detailed and precise explanations

### 💬 Conversation Management

- **Multiple Threads**: Create and manage separate conversations
- **Auto-Titling**: Conversations automatically titled from first message
- **Persistent Storage**: All data saved locally in browser
- **Easy Navigation**: Sidebar for quick conversation switching
- **Delete Protection**: Confirmation required before deletion

### 📊 Analytics Dashboard

Track your usage with local analytics:
- Total messages sent
- Number of conversations
- Average response time
- Model load time
- Estimated token usage

**Privacy Note**: All analytics are stored locally and never transmitted.

### 📤 Export Conversations

Export your conversations in multiple formats:
- **TXT**: Plain text with timestamps
- **JSON**: Structured data for backup
- **Markdown**: Formatted with metadata

### 🎤 Voice Input & Voice Assistant

**Voice Input for Messages:**
- Click the microphone button in the input area
- Speak your message
- Automatic transcription to text
- Multi-language support

**Voice Assistant Mode (NEW!):**
- Floating voice assistant button for hands-free interaction
- Ask questions using voice only
- Get spoken AI responses
- Futuristic pulsing animation during listening
- Perfect for multitasking and accessibility
- Works with all AI personas

### 📎 File Attachments

Upload and analyze documents directly:
- **Supported Formats**: PDF, DOCX, TXT
- **Smart Extraction**: Automatic text extraction from documents
- **Context-Aware**: AI analyzes file content with your questions
- **File Preview**: See attached file before sending
- **Easy Management**: Clear attachments with one click

### 🎨 Theme Customization

- **Dark Mode**: Default sleek dark theme
- **Light Mode**: Clean, professional light theme
- **System Sync**: Match your OS theme preference
- **Persistent**: Theme choice saved across sessions
- **Smooth Transitions**: Elegant theme switching animations

### 🤖 Multiple AI Models

Switch between **7 different AI models** optimized for various tasks:

| Model | Size | Context | Speed | Best For |
|-------|------|---------|-------|----------|
| **Llama 3.2 1B** | 815 MB | 2K | ⚡⚡⚡ | Quick responses, general chat (Default) |
| **Qwen 2.5 1.5B** | 1.6 GB | 4K | ⚡⚡⚡ | Multilingual, fast responses |
| **Gemma 2 2B** | 1.4 GB | 8K | ⚡⚡ | Longer context, Google's model |
| **Llama 3.2 3B** | 2.0 GB | **128K** | ⚡⚡ | **Massive context**, document analysis |
| **Qwen Coder 3B** | 2.5 GB | 4K | ⚡⚡ | Programming, code generation |
| **Phi 3.5 Mini 4B** | 2.5 GB | 4K | ⚡ | Balanced capability, Microsoft |
| **Mistral 7B** | 4.5 GB | 4K | ⚡ | Most powerful, complex reasoning |

**🌟 Highlight: Llama 3.2 3B** features an incredible **128K token context window** - perfect for analyzing entire documents, long conversations, and complex multi-turn interactions!

**Model Switching:**
- Select from dropdown in header
- Automatic re-initialization with progress tracking
- Models cached separately in IndexedDB
- Size and capability info displayed
- Instant switching between cached models

### 🔄 Message Actions

- **Copy**: Copy any message to clipboard
- **Copy Code**: One-click copy for code blocks
- **Regenerate**: Re-generate AI responses
- **Timestamps**: View exact message times
- **Markdown Rendering**: Beautiful formatting with GitHub-style markdown
- **Syntax Highlighting**: Code blocks with language detection

### 🌐 Offline Support

- **Offline Indicator**: Real-time connection status display
- **Full Offline Functionality**: Chat works without internet after setup
- **PWA Installation**: Install as standalone app
- **Service Worker**: Aggressive caching for instant loads
- **No Degradation**: Same experience online or offline

### ⚙️ Advanced Settings

Fine-tune AI behavior:
- **Temperature** (0.0 - 2.0): Control randomness/creativity
- **Max Tokens** (50 - 2048): Limit response length
- **Top P** (0.0 - 1.0): Nucleus sampling parameter
- **Real-time Updates**: Changes apply immediately
- **Persistent Settings**: Saved across sessions

---

## 🎨 User Interface

### Loading Screen

Beautiful initialization screen with:
- **Stage Indicators**: Shows current phase (Downloading, Loading, Compiling)
- **Progress Bar**: Never goes backwards, smooth transitions
- **Download Stats**: Real-time MB downloaded / total size
- **Status Messages**: Clear feedback on what's happening

### Chat Interface

- **Glassmorphism Design**: Modern, sleek aesthetic
- **Gradient Accents**: Cyan and purple color scheme
- **Responsive Layout**: Works on all screen sizes
- **Smooth Animations**: Polished transitions and effects
- **Dark Theme**: Easy on the eyes for extended use

---

## 🔧 How It Works

### Architecture

```
┌─────────────────────────────────────────────────┐
│                   Browser                       │
│  ┌───────────────────────────────────────────┐  │
│  │          Next.js Application              │  │
│  │  ┌─────────────────────────────────────┐  │  │
│  │  │      @mlc-ai/web-llm Engine         │  │  │
│  │  │  ┌───────────────────────────────┐  │  │  │
│  │  │  │   Llama 3.2 1B Model          │  │  │  │
│  │  │  │   (WebGPU Accelerated)        │  │  │  │
│  │  │  └───────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────┐  │
│  │     localStorage (Conversations)          │  │
│  │     IndexedDB (Model Cache)               │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### Initialization Flow

1. **WebGPU Detection**: Checks browser compatibility
2. **Model Download**: Downloads Llama 3.2 1B (~800MB) on first visit
3. **Model Caching**: Stores in IndexedDB for instant future loads
4. **Engine Initialization**: Loads model into WebGPU
5. **Ready to Chat**: AI fully operational in your browser

### Message Flow

1. User types message
2. Message added to conversation
3. System prompt + conversation sent to local AI
4. AI generates response using WebGPU
5. Response streamed back to UI
6. Conversation saved to localStorage

---

## 🌐 Browser Compatibility

### ✅ Fully Supported

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 113+ | Recommended |
| Edge | 113+ | Recommended |
| Opera | 99+ | Fully supported |

### ⚠️ Experimental

| Browser | Status | How to Enable |
|---------|--------|---------------|
| Firefox Nightly | Experimental | Enable `dom.webgpu.enabled` in `about:config` |

### ❌ Not Supported

- Safari (WebGPU not yet available)
- Mobile browsers (Limited WebGPU support)
- Internet Explorer (Deprecated)

---

## 📊 Performance Metrics

| Metric | Value |
|--------|-------|
| Model Download | 815MB - 4.5GB (one-time, varies by model) |
| First Load Time | 5-20 seconds (depends on model size) |
| Cached Load Time | 2-8 seconds (depends on model size) |
| First Message | 1-5 seconds (smaller models faster) |
| Subsequent Messages | 1-4 seconds (varies by model) |
| Memory Usage | 1.5-4GB RAM (depends on model) |
| Context Window | 2K - **128K tokens** (Llama 3.2 3B) |

**Model Performance Comparison:**
- **Fastest**: Llama 3.2 1B, Qwen 2.5 1.5B (~1-2s responses)
- **Balanced**: Gemma 2 2B, Llama 3.2 3B (~2-3s responses)
- **Most Capable**: Mistral 7B (~3-5s responses)
- **Best for Code**: Qwen Coder 3B (~2-3s responses)

*Performance varies based on hardware, GPU capabilities, and prompt complexity*

---

## 🔒 Security & Privacy

### Data Privacy

- ✅ **No Server Communication**: All processing happens locally
- ✅ **No Data Collection**: Zero analytics or tracking
- ✅ **No Cloud Storage**: Conversations stored only in your browser
- ✅ **No Third-Party APIs**: Completely self-contained

### Security Features

- 🔐 **WebAssembly Sandbox**: AI runs in isolated environment
- 🔐 **localStorage Only**: Data never leaves your device
- 🔐 **No External Requests**: After initial model download
- 🔐 **Open Source**: Fully auditable codebase

---

## 🎯 Use Cases

- **Privacy-Conscious Users**: Keep sensitive conversations private
- **Offline Environments**: Work without internet connectivity
- **Research & Development**: Experiment with local AI
- **Education**: Learn about AI without cloud dependencies
- **Content Creation**: Brainstorm ideas privately
- **Code Assistance**: Get programming help offline

## 🐛 Troubleshooting

### WebGPU Not Detected

**Solution**:
1. Update browser to latest version
2. Enable `chrome://flags/#enable-unsafe-webgpu`
3. Update GPU drivers
4. Check GPU compatibility: [WebGPU Report](https://webgpureport.org/)

### Model Download Fails

**Solution**:
1. Check internet connection
2. Clear browser cache (`Ctrl+Shift+Delete`)
3. Ensure sufficient disk space (~1GB free)
4. Try different network (VPN might block CDN)

### Slow Performance

**Solution**:
1. Close GPU-intensive applications
2. Check if discrete GPU is being used
3. Reduce browser tab count
4. Try a smaller model variant

### Progress Bar Issues

**Solution**:
1. Hard refresh (`Ctrl+Shift+R`)
2. Clear IndexedDB (DevTools → Application → IndexedDB)
3. Restart browser

---

## 📝 Project Structure

```
edge-netic/
├── app/
│   ├── chat/
│   │   └── page.tsx          # Main chat interface
│   ├── globals.css           # Global styles + animations
│   ├── layout.tsx            # Root layout with theme provider
│   └── page.tsx              # Landing page
├── components/
│   ├── ui/                   # shadcn/ui components (47 components)
│   ├── AdvancedSettings.tsx  # AI parameter controls
│   ├── AnalyticsModal.tsx    # Usage statistics dashboard
│   ├── CodeBlock.tsx         # Syntax highlighted code
│   ├── ConversationSidebar.tsx # Chat thread navigation
│   ├── ExportMenu.tsx        # Export conversations
│   ├── FileAttachment.tsx    # Document upload handler
│   ├── MarkdownRenderer.tsx  # Rich text rendering
│   ├── MessageItem.tsx       # Chat message component
│   ├── ModelSelector.tsx     # AI model switcher
│   ├── OfflineIndicator.tsx  # Connection status
│   ├── PersonaSelector.tsx   # AI personality picker
│   ├── ThemeToggle.tsx       # Dark/Light mode switch
│   ├── VoiceAssistant.tsx    # Hands-free voice mode
│   └── VoiceInputButton.tsx  # Voice input for messages
├── contexts/
│   └── ThemeContext.tsx      # Theme management
├── hooks/
│   ├── use-mobile.tsx        # Responsive utilities
│   ├── use-toast.ts          # Toast notifications
│   └── use-theme.ts          # Theme hook
├── lib/
│   ├── modelConfig.ts        # AI model configurations
│   ├── personaPrompts.ts     # AI persona definitions
│   ├── settingsStorage.ts    # Settings persistence
│   ├── storageUtils.ts       # localStorage utilities
│   └── utils.ts              # Helper functions
├── types/
│   ├── chat.ts               # Chat interfaces
│   └── settings.ts           # Settings types
├── public/
│   ├── manifest.json         # PWA manifest
│   └── sw.js                 # Service worker
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**Developer**: Kundan Sahu
**Email**: espkundan@gmail.com  
**Hackathon**: DEEP Open Innovation Hackathon 2025

---

<div align="center">

⭐ Star this repo if you find it useful!

</div>
