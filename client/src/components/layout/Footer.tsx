import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-black/60 py-12 px-8 text-sm text-gray-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <h4 className="text-white font-bold mb-4">MoonWitch OSINT</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            Enterprise OSINT intelligence recovery platform. Secure, confidential, and compliant lookup algorithms.
          </p>
        </div>
        <div>
          <h5 className="text-white font-semibold mb-3">Platform</h5>
          <ul className="space-y-2 text-xs">
            <li>Number Intelligence</li>
            <li>Vehicle Verification</li>
            <li>UPI Records</li>
            <li>Aadhaar Verification</li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-semibold mb-3">Legal</h5>
          <ul className="space-y-2 text-xs">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Data Protection Notice</li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-semibold mb-3">Acknowledgements</h5>
          <p className="text-xs text-gray-400">
            Special thanks to <span className="text-white">Souvik</span>, <span className="text-white">Spandan</span>, and <span className="text-white">Yash</span>.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-border/50 pt-6 text-center text-xs text-gray-600">
        &copy; {new Date().getFullYear()} MoonWitch. All rights reserved.
      </div>
    </footer>
  );
};
