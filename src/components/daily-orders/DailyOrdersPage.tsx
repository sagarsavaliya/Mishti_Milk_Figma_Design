import { useState } from 'react';
import { Button } from '../ui/button';
import { StatsGrid } from './StatsGrid';
import { FilterBar } from './FilterBar';
import { OrdersTable } from './OrdersTable';
import { CreateDeliveryLogModal } from './CreateDeliveryLogModal';
import { Plus } from 'lucide-react';
import { Badge } from '../ui/badge';

// Mock data
export const mockOrders = [
  {
    id: 1,
    customerName: 'Rajesh Kumar',
    milkType: 'Cow',
    quantity: 2,
    shift: 'Morning',
    routeName: 'Route A',
    deliveryBoy: 'Amit Singh',
    orderAmount: 120,
    paymentCollected: true,
    paymentAmount: 120,
    notes: 'Leave at gate'
  },
  {
    id: 2,
    customerName: 'Priya Sharma',
    milkType: 'Buffalo',
    quantity: 1.5,
    shift: 'Evening',
    routeName: 'Route B',
    deliveryBoy: 'Vikram Rao',
    orderAmount: 105,
    paymentCollected: false,
    paymentAmount: 0,
    notes: ''
  },
  {
    id: 3,
    customerName: 'Suresh Patel',
    milkType: 'Cow',
    quantity: 3,
    shift: 'Morning',
    routeName: 'Route A',
    deliveryBoy: 'Amit Singh',
    orderAmount: 180,
    paymentCollected: true,
    paymentAmount: 180,
    notes: ''
  },
  {
    id: 4,
    customerName: 'Anita Desai',
    milkType: 'Buffalo',
    quantity: 2,
    shift: 'Morning',
    routeName: 'Route C',
    deliveryBoy: 'Rahul Verma',
    orderAmount: 140,
    paymentCollected: true,
    paymentAmount: 140,
    notes: 'Ring doorbell'
  },
  {
    id: 5,
    customerName: 'Mahesh Gupta',
    milkType: 'Cow',
    quantity: 1,
    shift: 'Evening',
    routeName: 'Route B',
    deliveryBoy: 'Vikram Rao',
    orderAmount: 60,
    paymentCollected: false,
    paymentAmount: 0,
    notes: ''
  },
  {
    id: 6,
    customerName: 'Kavita Mehta',
    milkType: 'Buffalo',
    quantity: 2.5,
    shift: 'Evening',
    routeName: 'Route A',
    deliveryBoy: 'Amit Singh',
    orderAmount: 175,
    paymentCollected: true,
    paymentAmount: 175,
    notes: ''
  },
];

export function DailyOrdersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    shift: 'all',
    milkType: 'all',
    deliveryBoy: 'all',
    route: 'all'
  });

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(filters.search.toLowerCase());
    const matchesShift = filters.shift === 'all' || order.shift === filters.shift;
    const matchesMilkType = filters.milkType === 'all' || order.milkType === filters.milkType;
    const matchesDeliveryBoy = filters.deliveryBoy === 'all' || order.deliveryBoy === filters.deliveryBoy;
    const matchesRoute = filters.route === 'all' || order.routeName === filters.route;

    return matchesSearch && matchesShift && matchesMilkType && matchesDeliveryBoy && matchesRoute;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl text-gray-900">Daily Order Log</h1>
            <Badge variant="secondary" className="text-sm">
              {mockOrders.length}
            </Badge>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Track and manage daily milk deliveries
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Delivery Log
        </Button>
      </div>

      {/* Stats Grid */}
      <StatsGrid orders={mockOrders} />

      {/* Filters */}
      <FilterBar filters={filters} setFilters={setFilters} />

      {/* Orders Table */}
      <OrdersTable orders={filteredOrders} />

      {/* Create Delivery Log Modal */}
      <CreateDeliveryLogModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
