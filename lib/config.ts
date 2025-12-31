/**
 * Application Configuration
 * Centralized configuration for environment variables
 */

/**
 * Backend API URL
 * Must be set via NEXT_PUBLIC_BACKEND_URL environment variable
 * 
 * Local: http://localhost:3100
 * Production: https://api.pandapath.in
 */
export const BACKEND_URL = (() => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  
  if (!url) {
    throw new Error(
      'NEXT_PUBLIC_BACKEND_URL is not set. ' +
      'Please set it in your .env.local file (local) or .env.production (production).'
    );
  }
  
  return url;
})();

