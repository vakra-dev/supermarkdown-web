// Types for the WASM module
export interface ConvertOptions {
  headingStyle?: 'atx' | 'setext';
  linkStyle?: 'inline' | 'referenced';
  codeFence?: '`' | '~';
  bulletMarker?: '-' | '*' | '+';
  baseUrl?: string;
  excludeSelectors?: string[];
  includeSelectors?: string[];
}

export interface ConvertResult {
  markdown: string;
  timing: number;
  inputBytes: number;
  outputBytes: number;
}

// WASM module type
interface WasmModule {
  convert: (html: string) => string;
  convertWithOptions: (html: string, options: ConvertOptions) => string;
}

let wasmModule: WasmModule | null = null;
let loading: Promise<void> | null = null;

export async function loadWasm(): Promise<WasmModule> {
  if (wasmModule) return wasmModule;

  if (!loading) {
    loading = (async () => {
      // Dynamic import of the WASM package
      const mod = await import('@vakra-dev/supermarkdown-wasm');
      // Initialize the WASM module
      await mod.default();
      wasmModule = mod as unknown as WasmModule;
    })();
  }

  await loading;
  return wasmModule!;
}

export async function convert(
  html: string,
  options?: ConvertOptions
): Promise<ConvertResult> {
  const wasm = await loadWasm();

  const start = performance.now();
  const markdown = options
    ? wasm.convertWithOptions(html, options)
    : wasm.convert(html);
  const timing = performance.now() - start;

  return {
    markdown,
    timing,
    inputBytes: new Blob([html]).size,
    outputBytes: new Blob([markdown]).size,
  };
}

export function isWasmLoaded(): boolean {
  return wasmModule !== null;
}
