import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-2 font-bold text-lg text-white">
  <img
    src="/witch.png"
    alt="MoonWitch"
    className="w-8 h-8 object-contain"
  />
  <span>
    MOONWITCH<span className="text-pink-500">.IN</span>
  </span>
</div>

          <p className="text-gray-500 text-sm font-light text-center md:text-left">
            &copy; {new Date().getFullYear()} MoonWitch Intelligence. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link to="/tos" className="text-sm text-gray-400 hover:text-pink-400 transition-colors font-medium">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-pink-400 transition-colors font-medium">
              Privacy Policy
            </Link>
            {/* Replace the href below with your actual Telegram link */}
            <a 
              href="https://t.me/moonwitchservices" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-gray-400 hover:text-pink-400 transition-colors font-medium"
            >
              Contact
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
