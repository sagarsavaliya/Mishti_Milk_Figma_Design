import { ShoppingCart, Milk, Package, Clock } from 'lucide-react';

interface Order {
  shift: string;
  milkType: string;
  quantity: number;
  paymentCollected: boolean;
}

interface StatsGridProps {
  orders: Order[];
}

export function StatsGrid({ orders }: StatsGridProps) {
  const morningOrders = orders.filter(o => o.shift === 'Morning').length;
  const eveningOrders = orders.filter(o => o.shift === 'Evening').length;
  
  const cowMilk = orders
    .filter(o => o.milkType === 'Cow')
    .reduce((sum, o) => sum + o.quantity, 0);
  
  const buffaloMilk = orders
    .filter(o => o.milkType === 'Buffalo')
    .reduce((sum, o) => sum + o.quantity, 0);
  
  const pendingOrders = orders.filter(o => !o.paymentCollected).length;
  const totalOrders = orders.length;

  const stats = [
    {
      label: 'Total Orders – Morning / Evening',
      value: `${morningOrders} / ${eveningOrders}`,
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      label: 'Cow Milk Delivered (Ltr)',
      value: cowMilk.toFixed(1),
      icon: Milk,
      color: 'text-amber-600'
    },
    {
      label: 'Buffalo Milk Delivered (Ltr)',
      value: buffaloMilk.toFixed(1),
      icon: Package,
      color: 'text-purple-600'
    },
    {
      label: 'Pending Orders / To Be Delivered Today',
      value: `${pendingOrders} / ${totalOrders}`,
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className={`${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl text-gray-900">{stat.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
