'use client';

import { motion } from 'framer-motion';
import { WhatsAppIcon } from './icons/BrandIcons';

const WhatsAppButton = () => {
  const whatsappUrl =
    'https://wa.me/917411147986?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20PandaPath.';

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with PandaPath on WhatsApp"
      // Offset by the safe-area inset so the button clears the iOS home
      // indicator instead of sitting on top of it.
      className="fixed right-4 z-40 flex h-13 w-13 items-center justify-center rounded-full text-white shadow-lg sm:right-6 sm:h-14 sm:w-14"
      style={{
        backgroundColor: '#25D366',
        bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
        width: '3.25rem',
        height: '3.25rem',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.4, type: 'spring' }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: '#25D366' }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.55, 0, 0.55] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <span className="relative z-10">
        <WhatsAppIcon size={26} />
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
