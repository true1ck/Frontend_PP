/**
 * Backend health check utility
 * Checks if the backend server is reachable
 */

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3100';

/**
 * Check if backend server is healthy and reachable
 * @returns Promise<boolean> - true if backend is reachable, false otherwise
 */
export async function checkBackendHealth(): Promise<boolean> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout for health check

        const response = await fetch(`${BACKEND_API_URL}/health`, {
            method: 'GET',
            signal: controller.signal,
        });

        clearTimeout(timeoutId);
        return response.ok;
    } catch (error) {
        return false;
    }
}

/**
 * Get backend connection status message
 */
export function getBackendConnectionMessage(): string {
    return `Backend server is not reachable at ${BACKEND_API_URL}. Please ensure:
1. The backend server is running (npm run dev in Backend folder)
2. The server is running on port 3100
3. Check BACKEND_API_URL environment variable if using a different URL`;
}

