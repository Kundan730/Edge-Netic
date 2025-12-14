# Browser & OS Compatibility Guide for Edge-Netic

## WebGPU Requirements

Edge-Netic requires **WebGPU** support to run AI models locally in the browser. WebGPU is a modern graphics API that enables high-performance computing in web browsers.

## ✅ Supported Browsers & Operating Systems

### Chrome/Chromium-based Browsers (Recommended)

| Browser | Version | Windows | macOS | Linux | Notes |
|---------|---------|---------|-------|-------|-------|
| **Google Chrome** | 113+ | ✅ | ✅ | ✅ | **Best support** |
| **Microsoft Edge** | 113+ | ✅ | ✅ | ✅ | Chromium-based |
| **Brave** | 1.50+ | ✅ | ✅ | ✅ | May need to enable in flags |
| **Opera** | 99+ | ✅ | ✅ | ✅ | Chromium-based |

**Requirements:**
- Chrome/Edge 113 or later
- GPU drivers must be up to date
- Hardware acceleration enabled in browser settings

---

### Firefox

| Browser | Version | Windows | macOS | Linux | Notes |
|---------|---------|---------|-------|-------|-------|
| **Firefox** | 121+ | ⚠️ | ⚠️ | ⚠️ | Experimental support |

**Status:** WebGPU support in Firefox is **experimental** and must be enabled manually:
1. Go to `about:config`
2. Set `dom.webgpu.enabled` to `true`
3. Restart browser

**Note:** Firefox WebGPU support is still in development and may have compatibility issues.

---

### Safari

| Browser | Version | macOS | iOS/iPadOS | Notes |
|---------|---------|-------|------------|-------|
| **Safari** | 17+ | ✅ | ❌ | macOS only |
| **Safari Technology Preview** | Latest | ✅ | ⚠️ | Better support |

**Requirements:**
- macOS Ventura (13.0) or later
- Safari 17.0 or later
- iOS/iPadOS support is limited and experimental

---

## ❌ Unsupported Browsers

The following browsers **do NOT support WebGPU** and will not work with Edge-Netic:

- ❌ Internet Explorer (all versions)
- ❌ Safari 16 and earlier
- ❌ Chrome/Edge 112 and earlier
- ❌ Mobile browsers (limited support)

---

## Hardware Requirements

### Minimum Requirements

- **GPU:** Any modern GPU with DirectX 12 (Windows), Metal (macOS), or Vulkan (Linux) support
- **RAM:** 4GB minimum (8GB recommended)
- **CPU:** Modern multi-core processor

### GPU Compatibility

#### Windows
- **NVIDIA:** GTX 900 series or newer
- **AMD:** Radeon RX 400 series or newer
- **Intel:** HD Graphics 500 series or newer (6th gen Intel Core or newer)

#### macOS
- **Apple Silicon (M1/M2/M3):** ✅ Excellent support
- **Intel Macs:** Requires Metal-compatible GPU (2012 or newer)

#### Linux
- **NVIDIA:** GTX 900 series or newer with latest drivers
- **AMD:** Radeon RX 400 series or newer with Mesa 23.0+
- **Intel:** HD Graphics 500 series or newer

---

## Common Issues & Solutions

### Issue 1: "WebGPU not supported" Error

**Possible Causes:**
1. Browser version too old
2. GPU drivers outdated
3. Hardware acceleration disabled

**Solutions:**
1. **Update your browser** to the latest version
2. **Update GPU drivers:**
   - Windows: Use Windows Update or download from GPU manufacturer
   - macOS: Update to latest macOS version
   - Linux: Update Mesa drivers or proprietary drivers
3. **Enable hardware acceleration:**
   - Chrome: `chrome://settings/system` → Enable "Use hardware acceleration"
   - Edge: `edge://settings/system` → Enable "Use hardware acceleration"
   - Firefox: `about:preferences` → Performance → Uncheck "Use recommended performance settings"

### Issue 2: Lag or Performance Issues

**Possible Causes:**
1. Insufficient GPU memory
2. Too many browser tabs open
3. Background applications using GPU

**Solutions:**
1. Close unnecessary browser tabs
2. Close GPU-intensive applications (games, video editing software)
3. Try a smaller AI model (Llama 3.2 1B instead of Mistral 7B)
4. Restart your browser

### Issue 3: Model Download Fails

**Possible Causes:**
1. Slow internet connection
2. Browser cache issues
3. Insufficient disk space

**Solutions:**
1. Check your internet connection
2. Clear browser cache
3. Ensure you have at least 5GB free disk space

---

## Testing WebGPU Support

### Quick Test

Visit this URL in your browser:
```
https://webgpu.github.io/webgpu-samples/
```

If you see the demos working, WebGPU is supported.

### Check in Edge-Netic

1. Open Edge-Netic in your browser
2. Open browser DevTools (F12)
3. Go to Console tab
4. Type: `navigator.gpu`
5. If it returns an object, WebGPU is supported

---

## OS-Specific Notes

### Windows

**Best Support:** Windows 10 (version 1903+) or Windows 11

**GPU Driver Updates:**
- NVIDIA: https://www.nvidia.com/Download/index.aspx
- AMD: https://www.amd.com/en/support
- Intel: https://www.intel.com/content/www/us/en/download-center/home.html

**Known Issues:**
- Some older Intel integrated GPUs may have limited support
- Windows 7/8 are not supported

### macOS

**Best Support:** macOS Ventura (13.0) or later with Apple Silicon

**Recommendations:**
- Apple Silicon Macs (M1/M2/M3) have excellent WebGPU support
- Intel Macs require macOS Ventura or later
- Safari 17+ recommended for best performance

**Known Issues:**
- Older Intel Macs (pre-2012) may not support Metal

### Linux

**Best Support:** Ubuntu 22.04+, Fedora 38+, or equivalent

**Requirements:**
- Mesa 23.0+ for AMD/Intel GPUs
- Latest proprietary drivers for NVIDIA GPUs
- Vulkan support required

**Recommendations:**
- Use Chrome/Chromium for best compatibility
- Ensure Vulkan is properly installed: `vulkaninfo`

**Known Issues:**
- Some distributions may require manual Vulkan setup
- Wayland vs X11 may affect performance

---

## Deployment Considerations

### For Your Friends' Laptops

The lag issues you mentioned could be caused by:

1. **Browser Version:** Ensure they're using Chrome 113+ or Edge 113+
2. **GPU Drivers:** Outdated drivers can cause significant lag
3. **Hardware Acceleration:** Must be enabled in browser settings
4. **System Resources:** Close other applications to free up GPU memory

### Recommended Setup for Users

1. **Browser:** Latest Chrome or Edge
2. **OS:** 
   - Windows 10/11 (latest updates)
   - macOS Ventura or later
   - Ubuntu 22.04+ or equivalent Linux
3. **GPU Drivers:** Latest version
4. **RAM:** 8GB minimum
5. **Internet:** Stable connection for initial model download

---

## Adding WebGPU Detection

I recommend adding a WebGPU detection check to your app to show users a helpful error message if their browser doesn't support it.

The app already initializes WebGPU in the chat page, but you could add a more user-friendly check on the home page.

---

## Summary

**Will it work on all laptops?**

❌ **No** - It requires:
- Modern browser (Chrome 113+, Edge 113+, Safari 17+)
- WebGPU-capable GPU
- Up-to-date GPU drivers
- Hardware acceleration enabled

**Most likely to work:**
- ✅ Recent Windows laptops (2016+) with Chrome/Edge
- ✅ Apple Silicon Macs (M1/M2/M3) with Safari/Chrome
- ✅ Modern Linux systems with updated drivers

**May have issues:**
- ⚠️ Older laptops (pre-2015)
- ⚠️ Laptops with integrated Intel graphics (older than 6th gen)
- ⚠️ Systems with outdated GPU drivers
- ⚠️ Firefox users (experimental support)

**Recommendation:** Add a compatibility check page or banner to inform users about requirements before they try to use the AI features.
