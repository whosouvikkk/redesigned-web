import { Link } from 'react-router-dom';
import { Menu, User, LogOut } from 'lucide-react'; // Assuming you use lucide-react for UI icons

export default function Navbar({ toggleSidebar }: { toggleSidebar?: () => void }) {
  return (
    <nav className="bg-[#12101a] border-b border-gray-800/60 h-16 flex items-center justify-between px-4 lg:px-8">
      {/* Left side: Mobile Menu Toggle & Branding */}
      <div className="flex items-center gap-4">
        {toggleSidebar && (
          <button 
            onClick={toggleSidebar} 
            className="lg:hidden text-gray-400 hover:text-pink-500 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        )}
        
        {/* NEW BRANDING: witch.png and text */}
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/witch.png" 
            alt="MoonWitch Logo" 
            className="h-8 w-8 object-contain" 
          />
          <span className="font-bold text-xl tracking-wider text-white">
            MOONWITCH
          </span>
        </Link>
      </div>

      {/* Right side: User Profile & Actions */}
      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-pink-500 transition-colors">
          <User className="h-5 w-5" />
        </button>
        <button className="text-gray-400 hover:text-pink-500 transition-colors">
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
}
