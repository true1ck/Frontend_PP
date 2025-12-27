'use client';

import dynamic from 'next/dynamic';

// Dynamically import TechSphere with SSR disabled
// This ensures React Three Fiber only loads on the client side
const TechSphere = dynamic(() => import('./TechSphere'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-purple-900/20 to-transparent" />
  ),
});

const TechSphereWrapper = () => {
  return <TechSphere />;
};

export default TechSphereWrapper;

