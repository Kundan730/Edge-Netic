interface GPU {
  requestAdapter(options?: GPURequestAdapterOptions): Promise<GPUAdapter | null>;
}

interface GPUAdapter {
  info?: {
    vendor?: string;
    architecture?: string;
    device?: string;
    description?: string;
  };
}

interface GPURequestAdapterOptions {
  powerPreference?: 'low-power' | 'high-performance';
}

interface Navigator {
  gpu?: GPU;
}
