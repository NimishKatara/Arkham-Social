import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Compass, Film, Clock, LayoutDashboard,
  User, Package, Store, Settings, Rss, MessageCircle
} from 'lucide-react';

// Define the type of the icon property as a React component type
interface NavItemsProps {
  isExpanded: boolean;
}

interface NavItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Icon is of React Component type
  path: string;
  divider?: boolean;
}

const NavItems = ({ isExpanded }: NavItemsProps) => {
  const navItems: NavItem[] = [
    { icon: Compass, path: '/explore' },
    { icon: Rss, path: '/feed' },
    { icon: MessageCircle, path: '/messenger' }, // Inserted Message icon at position 3
    { icon: Film, path: '/reels' },
    { icon: Store, path: '/store' },
    { icon: Clock, path: '/timeline' },
    { icon: LayoutDashboard, path: '/dashboard' },
    { icon: User, path: '/profile' },
    
    { icon: Package, path: '/addons' },
    
    { icon: Settings, path: '/settings' }
  ];

  return (
    <div className="flex flex-col items-center space-y-2">
      {navItems.map((item, index) =>
        item.divider ? (
          <div key={`divider-${index}`} className="w-full border-t border-zinc-800/50 my-4" />
        ) : (
          <NavLink
            key={item.path}
            to={item.path || '/'} // Ensure there's always a valid path
            className={({ isActive }) =>
              `flex items-center justify-center p-3 rounded-lg transition-all ${
                isActive
                  ? 'metallic-shine bg-zinc-900 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                  : 'text-white/70 hover:bg-zinc-900/50 hover:text-white'
              }`
            }
          >
            {/* Render the icon as a component */}
            <item.icon className="h-5 w-5" />
          </NavLink>
        )
      )}
    </div>
  );
};

export default NavItems;
