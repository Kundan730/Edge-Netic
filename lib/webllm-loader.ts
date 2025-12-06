export async function loadWebLLM() {
  if (typeof window === 'undefined') {
    return null;
  }
  const webllm = await import('@mlc-ai/web-llm');
  return webllm;
}
