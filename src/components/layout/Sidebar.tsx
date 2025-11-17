import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  ClipboardList, 
  Route, 
  CreditCard, 
  Beef, 
  Wheat, 
  UserCircle, 
  TrendingDown, 
  Store, 
  Settings 
} from 'lucide-react';

interface SidebarProps {
  currentPage: 'dashboard' | 'customers' | 'subscriptions' | 'orders';
  onPageChange: (page: 'dashboard' | 'customers' | 'subscriptions' | 'orders') => void;
  isOpen: boolean;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', page: 'dashboard' as const },
  { icon: Users, label: 'Customers', page: 'customers' as const },
  { icon: Calendar, label: 'Subscriptions', page: 'subscriptions' as const },
  { icon: ClipboardList, label: 'Daily Orders Log', page: 'orders' as const },
  { icon: Route, label: 'Delivery Routes', page: null },
  { icon: CreditCard, label: 'Billing & Payments', page: null },
  { icon: Beef, label: 'Animals', page: null },
  { icon: Wheat, label: 'Cattle Feed', page: null },
  { icon: UserCircle, label: 'Employees', page: null },
  { icon: TrendingDown, label: 'Expenses', page: null },
  { icon: Store, label: 'Suppliers', page: null },
  { icon: Settings, label: 'Settings', page: null },
];

export function Sidebar({ currentPage, onPageChange, isOpen }: SidebarProps) {
  return (
    <aside 
      className={`fixed left-0 top-[73px] h-[calc(100vh-73px)] bg-white border-r border-gray-200 overflow-y-auto transition-all duration-300 ease-in-out z-40 shadow-lg lg:shadow-none
      ${isOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'}
      lg:${isOpen ? 'w-64' : 'w-20'}`}
    >
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => item.page && onPageChange(item.page)}
            disabled={!item.page}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative ${
              item.page === currentPage
                ? 'bg-blue-50 text-blue-600'
                : item.page
                ? 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                : 'text-gray-400 cursor-not-allowed'
            } ${!isOpen ? 'justify-center' : ''}`}
            title={!isOpen ? item.label : undefined}
          >
            <item.icon className={`w-5 h-5 flex-shrink-0 ${!isOpen ? 'mx-auto' : ''}`} />
            <span 
              className={`text-sm whitespace-nowrap transition-all duration-300 ${
                isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 w-0 overflow-hidden'
              }`}
            >
              {item.label}
            </span>
            
            {/* Tooltip for collapsed state */}
            {!isOpen && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}