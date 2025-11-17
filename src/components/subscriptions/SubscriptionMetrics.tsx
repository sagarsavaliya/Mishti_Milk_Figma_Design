import { TrendingUp, CheckCircle, IndianRupee, BarChart3 } from 'lucide-react';
import { Card } from '../ui/card';

export function SubscriptionMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {/* Total Subscriptions */}
      <Card className="p-2.5 bg-white border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Total Subscriptions
            </p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <p className="text-xl text-gray-900">255</p>
              <span className="text-xs text-green-600">+12</span>
            </div>
          </div>
          <div className="bg-blue-100 p-1.5 rounded-lg">
            <BarChart3 className="w-4 h-4 text-blue-600" />
          </div>
        </div>
      </Card>

      {/* Active Today */}
      <Card className="p-2.5 bg-white border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Active Today
            </p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <p className="text-xl text-gray-900">210</p>
              <span className="text-xs text-gray-500">82.4%</span>
            </div>
          </div>
          <div className="bg-green-100 p-1.5 rounded-lg">
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
        </div>
      </Card>

      {/* Revenue This Month */}
      <Card className="p-2.5 bg-white border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Revenue This Month
            </p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <p className="text-xl text-gray-900">₹1,65,240</p>
              <span className="text-xs text-green-600">+8.2%</span>
            </div>
          </div>
          <div className="bg-green-100 p-1.5 rounded-lg">
            <IndianRupee className="w-4 h-4 text-green-600" />
          </div>
        </div>
      </Card>

      {/* Avg Order Value */}
      <Card className="p-2.5 bg-white border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Avg. Order Value
            </p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <p className="text-xl text-gray-900">₹185</p>
              <span className="text-xs text-gray-500">/day</span>
            </div>
          </div>
          <div className="bg-purple-100 p-1.5 rounded-lg">
            <IndianRupee className="w-4 h-4 text-purple-600" />
          </div>
        </div>
      </Card>
    </div>
  );
}
