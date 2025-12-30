// SPA-safe, robust fluid animation engine for FluidCursor
// This file is designed to be loaded only once and manages its own global state.
// It is safe for Next.js App Router and SPA navigation.

(function () {
    if (window.__fluidCursorLoaded) return;
    window.__fluidCursorLoaded = true;

    let canvas = document.getElementById('fluid-canvas');
    if (!canvas) {
        // Wait for canvas to appear
        const observer = new MutationObserver(() => {
            canvas = document.getElementById('fluid-canvas');
            if (canvas) {
                observer.disconnect();
                startFluid();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        return;
    }
    startFluid();

    function startFluid() {
        // If already initialized on this canvas, skip
        if (canvas.__fluidInitialized) return;
        canvas.__fluidInitialized = true;

        // --- Insert your fluid simulation code here ---
        // For demonstration, we'll just fill the canvas with a color
        // Replace this with your actual fluid simulation logic
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgba(0, 150, 255, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Example: Listen for context loss and recovery
        canvas.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            canvas.__fluidInitialized = false;
        });
        canvas.addEventListener('webglcontextrestored', () => {
            startFluid();
        });
    }

    // Listen for route changes (Next.js App Router)
    let lastPath = location.pathname;
    setInterval(() => {
        if (location.pathname !== lastPath) {
            lastPath = location.pathname;
            // Try to re-initialize on new canvas
            const newCanvas = document.getElementById('fluid-canvas');
            if (newCanvas && !newCanvas.__fluidInitialized) {
                canvas = newCanvas;
                startFluid();
            }
        }
    }, 500);
})();
