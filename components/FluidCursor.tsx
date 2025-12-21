'use client';

import { useEffect, useRef } from 'react';

const FluidCursor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

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

        return () => {
            // Don't remove the script
        };
    }, []);

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
