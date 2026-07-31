import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6 max-w-7xl mx-auto mt-20 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 relative z-10">
      <div>© 2026 MoonWitch OSINT. All rights reserved.</div>
      <div className="flex items-center gap-6 my-4 md:my-0">
        <a href="#" className="hover:text-pink-400 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-pink-400 transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-pink-400 transition-colors">Contact</a>
      </div>
      <div className="text-xs text-gray-600">
        Special Thanks: Souvik • Spandan • Yash
      </div>
    </footer>
  );
}
