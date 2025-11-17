import { useState, useEffect } from 'react';
import { Navbar, Sidebar } from './components/layout';
import { DashboardPage } from './components/dashboard';
import { CustomersPage } from './components/customers';
import { SubscriptionsPage } from './components/subscriptions';
import { DailyOrdersPage } from './components/daily-orders';

export default function App() {
  const [activeShift, setActiveShift] = useState<'morning' | 'evening' | 'overall'>('overall');
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'customers' | 'subscriptions' | 'orders'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive sidebar
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePageChange = (page: 'dashboard' | 'customers' | 'subscriptions' | 'orders') => {
    setCurrentPage(page);
    // Auto-close sidebar on mobile after navigation
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'customers':
        return <CustomersPage />;
      case 'subscriptions':
        return <SubscriptionsPage />;
      case 'orders':
        return <DailyOrdersPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        activeShift={activeShift} 
        onShiftChange={setActiveShift}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      {/* Mobile backdrop */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 top-[73px] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
        isOpen={isSidebarOpen}
      />
      <main 
        className={`transition-all duration-300 ease-in-out ${
          isMobile ? 'ml-0' : isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <div className="p-6">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}