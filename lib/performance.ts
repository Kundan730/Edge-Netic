/**
 * Performance monitoring and optimization utilities
 */

// Web Vitals tracking
export function reportWebVitals(metric: any) {
    if (process.env.NODE_ENV === 'production') {
        // Log to console in production for monitoring
        console.log(metric);

        // You can send to analytics service here
        // Example: analytics.track(metric.name, metric.value);
    }
}

// Debounce function for performance optimization
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null;
            func(...args);
        };

        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean;

    return function executedFunction(...args: Parameters<T>) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

// Lazy load component helper
export function lazyLoadWithRetry<T extends React.ComponentType<any>>(
    componentImport: () => Promise<{ default: T }>,
    retries = 3,
    interval = 1000
): Promise<{ default: T }> {
    return new Promise((resolve, reject) => {
        componentImport()
            .then(resolve)
            .catch((error) => {
                if (retries === 0) {
                    reject(error);
                    return;
                }

                setTimeout(() => {
                    lazyLoadWithRetry(componentImport, retries - 1, interval)
                        .then(resolve)
                        .catch(reject);
                }, interval);
            });
    });
}

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Optimize image loading
export function getOptimizedImageUrl(
    url: string,
    width?: number,
    quality = 75
): string {
    if (!url) return '';

    // For Next.js Image optimization
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    params.set('q', quality.toString());

    return `${url}${url.includes('?') ? '&' : '?'}${params.toString()}`;
}

// Measure component render time
export function measureRenderTime(componentName: string) {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
        return { start: () => { }, end: () => { } };
    }

    return {
        start: () => {
            performance.mark(`${componentName}-start`);
        },
        end: () => {
            performance.mark(`${componentName}-end`);
            performance.measure(
                componentName,
                `${componentName}-start`,
                `${componentName}-end`
            );

            const measure = performance.getEntriesByName(componentName)[0];
            console.log(`${componentName} render time:`, measure.duration.toFixed(2), 'ms');

            // Clean up
            performance.clearMarks(`${componentName}-start`);
            performance.clearMarks(`${componentName}-end`);
            performance.clearMeasures(componentName);
        },
    };
}

// Check if browser supports WebGPU
export async function checkWebGPUSupport(): Promise<boolean> {
    if (typeof window === 'undefined') return false;

    if (!navigator.gpu) {
        return false;
    }

    try {
        const adapter = await navigator.gpu.requestAdapter();
        return !!adapter;
    } catch {
        return false;
    }
}

// Preload critical resources
export function preloadResource(href: string, as: string) {
    if (typeof document === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
}

// Memory usage monitoring (for development)
export function logMemoryUsage() {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
        return;
    }

    if ('memory' in performance) {
        const memory = (performance as any).memory;
        console.log('Memory Usage:', {
            usedJSHeapSize: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
            totalJSHeapSize: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
            jsHeapSizeLimit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`,
        });
    }
}
