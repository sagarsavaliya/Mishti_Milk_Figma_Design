import { Milk, Sun, Moon, BarChart3, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface NavbarProps {
  activeShift: 'morning' | 'evening' | 'overall';
  onShiftChange: (shift: 'morning' | 'evening' | 'overall') => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function Navbar({ activeShift, onShiftChange, isSidebarOpen, onToggleSidebar }: NavbarProps) {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Hamburger Menu + Logo and Brand */}
        <div className="flex items-center gap-4">
          {/* Animated Hamburger Button */}
          <button
            onClick={onToggleSidebar}
            className="flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors group"
            aria-label="Toggle sidebar"
          >
            <span
              className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ease-out ${
                isSidebarOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-600 my-1.5 transition-all duration-300 ease-out ${
                isSidebarOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ease-out ${
                isSidebarOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </button>

          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Milk className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl text-gray-900">Misti Milk - 360</h1>
              <p className="text-xs text-gray-500">Fresh milk, delivered daily</p>
            </div>
          </div>
        </div>

        {/* Shift Toggle */}
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full">
          <button
            onClick={() => onShiftChange('morning')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              activeShift === 'morning'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Sun className="w-4 h-4" />
            <span className="text-sm">Morning</span>
          </button>
          <button
            onClick={() => onShiftChange('evening')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              activeShift === 'evening'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Moon className="w-4 h-4" />
            <span className="text-sm">Evening</span>
          </button>
          <button
            onClick={() => onShiftChange('overall')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              activeShift === 'overall'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm">Overall</span>
          </button>
        </div>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full px-4 py-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="" />
              <AvatarFallback className="bg-blue-600 text-white">JD</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-700">John Doe</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Notifications</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}