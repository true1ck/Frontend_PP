'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// Add type definition for window.initFluidCursor
declare global {
    interface Window {
        initFluidCursor?: () => void;
    }
}

const FluidCursor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Only load the script once, ever
        const existingScript = document.querySelector('script[data-fluid-script]');
        if (!existingScript) {
            const script = document.createElement('script');
            script.src = '/legacy/script.js';
            script.setAttribute('data-fluid-script', 'true');
            script.async = false;
            document.body.appendChild(script);
        }

        // On homepage, call the global re-init function if it exists
        if (pathname === '/' && typeof window !== 'undefined' && typeof window.initFluidCursor === 'function') {
            window.initFluidCursor();
        }

        return () => {
            // Don't remove the script
        };
    }, [pathname]);

    return (
        <canvas
            ref={canvasRef}
            id="fluid-canvas"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'block',
                zIndex: 5
            }}
        />
    );
};

export default FluidCursor;
