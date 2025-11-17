import { StatCards } from './StatCards';
import { DeliveryTables } from './DeliveryTables';
import { SubscriptionTables } from './SubscriptionTables';

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <StatCards />

      {/* Delivery Tables */}
      <DeliveryTables />

      {/* Subscription Tables */}
      <SubscriptionTables />
    </div>
  );
}
