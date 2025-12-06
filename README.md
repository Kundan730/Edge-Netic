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
- **5 AI Personas**: Standard, Professional, Friendly, Creative, Technical
- **Multiple Conversations**: Manage separate chat threads
- **Export Options**: Save conversations as TXT, JSON, or Markdown
- **Voice Input**: Speak your messages using Web Speech API
- **Markdown Support**: Rich text formatting with syntax highlighting
- **Analytics Dashboard**: Track usage statistics locally
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
| **AI Engine** | @mlc-ai/web-llm (Llama-3.2-1B-Instruct) |
| **Styling** | Tailwind CSS 3.3 |
| **UI Components** | shadcn/ui with custom theming |
| **PWA** | next-pwa 5.6 |
| **Language** | TypeScript 5.2 |
| **Markdown** | react-markdown with syntax highlighting |
| **State Management** | React Hooks + localStorage |

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

### 🎤 Voice Input

Use the Web Speech API to dictate messages:
- Click the microphone button
- Speak your message
- Automatic transcription to text

### 🔄 Message Actions

- **Copy**: Copy any message to clipboard
- **Regenerate**: Re-generate AI responses
- **Timestamps**: View exact message times

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
| Model Download | ~800MB (one-time) |
| First Load Time | 5-15 seconds |
| Cached Load Time | 2-5 seconds |
| First Message | 2-5 seconds |
| Subsequent Messages | 1-3 seconds |
| Memory Usage | 1.5-2GB RAM |

*Performance varies based on hardware and GPU capabilities*

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
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── AnalyticsModal.tsx    # Analytics dashboard
│   ├── ConversationSidebar.tsx
│   ├── ExportMenu.tsx
│   ├── MessageItem.tsx       # Chat message component
│   ├── PersonaSelector.tsx
│   └── VoiceInputButton.tsx
├── lib/
│   ├── personaPrompts.ts     # AI persona definitions
│   └── storageUtils.ts       # localStorage utilities
├── types/
│   └── chat.ts               # TypeScript interfaces
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
