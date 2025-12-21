'use client';

import { useEffect, useRef } from 'react';

const FluidCursor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        function resizeCanvas() {
            if (!canvas) return;
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        }
        resizeCanvas();


    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: '100%',
                height: '100%',
                display: 'block'
            }}
        />
    );
};

export default FluidCursor;
