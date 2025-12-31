/**
 * Backend health check utility
 * Checks if the backend server is reachable
 */

import { BACKEND_URL } from './config';

/**
 * Check if backend server is healthy and reachable
 * @returns Promise<boolean> - true if backend is reachable, false otherwise
 */
export async function checkBackendHealth(): Promise<boolean> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout for health check

        const response = await fetch(`${BACKEND_URL}/health`, {
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
    return `Backend server is not reachable at ${BACKEND_URL}. Please ensure:
1. The backend server is running (npm run dev in Backend folder)
2. The server is running on port 3100
3. Check NEXT_PUBLIC_BACKEND_URL environment variable if using a different URL`;
}


