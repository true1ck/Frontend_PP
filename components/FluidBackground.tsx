'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

declare global {
    interface Window {
        initFluidCursor?: () => void;
        __fluidConfig?: { PAUSED: boolean };
        __fluidReady?: boolean;
    }
}

/**
 * Site-wide fluid-cursor background (light mode).
 *
 * Previously this lived inside <Hero>, so it only existed on the homepage and
 * only within the hero box. Mounting it in the root layout instead makes it a
 * persistent, viewport-fixed layer behind every page.
 *
 * Three constraints from public/legacy/script.js drive this implementation:
 *
 *  1. It binds to `document.getElementsByTagName('canvas')[0]`, so this canvas
 *     MUST be the first canvas in the document — hence it renders as the first
 *     child of <body>, ahead of the Three.js hero canvas.
 *
 *  2. It attaches its pointer listeners to that canvas element directly. A
 *     full-page canvas that actually received pointer events would swallow every
 *     click on the site, so the canvas is pointer-events:none and we re-dispatch
 *     window mouse events onto it. Because the canvas is fixed at the viewport
 *     origin, the synthetic event's offsetX/offsetY resolve to the same values
 *     as clientX/clientY, which is what the simulation reads.
 *
 *  3. The canvas reference is captured once, at script-eval time. Unmounting and
 *     remounting would leave the simulation drawing into a detached element, so
 *     the canvas stays mounted for the session and only its opacity changes.
 */
const FluidBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();
    const isLight = theme === 'light';

    // Load the simulation once, the first time light mode is active.
    useEffect(() => {
        // Read the class the inline boot script stamped on <html> before first
        // paint, rather than `isLight`. ThemeContext initialises its state to
        // 'light' and only reads localStorage in an effect, so trusting it here
        // would download and start the simulation for dark-mode visitors too.
        if (!document.documentElement.classList.contains('light')) return;
        if (document.querySelector('script[data-fluid-script]')) return;

        // Respect the OS reduced-motion setting — this is decorative motion.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const script = document.createElement('script');
        script.src = '/legacy/script.js';
        script.setAttribute('data-fluid-script', 'true');
        script.async = false;
        document.body.appendChild(script);
    }, [isLight]);

    // Pause the simulation step while hidden. `update()` still renders one cheap
    // frame, but the multi-pass solver — the expensive part — stops.
    useEffect(() => {
        if (window.__fluidConfig) window.__fluidConfig.PAUSED = !isLight;
    }, [isLight]);

    // Re-dispatch window pointer motion onto the canvas (see note 2 above).
    // Mouse only: the script calls preventDefault() in its touch handlers, and
    // forwarding those would block scrolling on mobile.
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const forward = (event: MouseEvent) => {
            if (!isLight) return;
            canvas.dispatchEvent(
                new MouseEvent(event.type, {
                    clientX: event.clientX,
                    clientY: event.clientY,
                    bubbles: false,
                    cancelable: true,
                    view: window,
                }),
            );
        };

        window.addEventListener('mousemove', forward, { passive: true });
        window.addEventListener('mousedown', forward, { passive: true });

        return () => {
            window.removeEventListener('mousemove', forward);
            window.removeEventListener('mousedown', forward);
        };
    }, [isLight]);

    return (
        <canvas
            ref={canvasRef}
            id="fluid-canvas"
            aria-hidden="true"
            className={`fluid-bg ${isLight ? 'is-visible' : ''}`}
        />
    );
};

export default FluidBackground;
