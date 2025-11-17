import { Users, MapPin, Clock, Milk } from 'lucide-react';
import { Card } from '../ui/card';

export function CustomerMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {/* Total Customers */}
      <Card className="p-2.5 bg-white border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Total Customers
            </p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <p className="text-xl text-gray-900">245</p>
            </div>
            <div className="flex items-center gap-3 mt-1 text-xs">
              <span className="text-green-600">Active: 210</span>
              <span className="text-gray-400">Inactive: 35</span>
            </div>
          </div>
          <div className="bg-blue-100 p-1.5 rounded-lg">
            <Users className="w-4 h-4 text-blue-600" />
          </div>
        </div>
      </Card>

      {/* Routes Overview */}
      <Card className="p-2.5 bg-white border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Routes Overview
            </p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <p className="text-xl text-gray-900">12</p>
              <span className="text-xs text-gray-500">routes</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              ~20 customers/route
            </p>
          </div>
          <div className="bg-purple-100 p-1.5 rounded-lg">
            <MapPin className="w-4 h-4 text-purple-600" />
          </div>
        </div>
      </Card>

      {/* Shift Distribution */}
      <Card className="p-2.5 bg-white border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Shift Distribution
            </p>
            <div className="space-y-0.5 text-xs">
              <div className="flex items-center gap-1">
                <span>☀️ Morning:</span>
                <span className="text-gray-900">142</span>
              </div>
              <div className="flex items-center gap-1">
                <span>🌙 Evening:</span>
                <span className="text-gray-900">103</span>
              </div>
            </div>
          </div>
          <div className="bg-amber-100 p-1.5 rounded-lg">
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
        </div>
      </Card>

      {/* Milk Type Distribution */}
      <Card className="p-2.5 bg-white border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Milk Type Distribution
            </p>
            <div className="space-y-0.5 text-xs">
              <div className="flex items-center gap-1">
                <span>🐄 Cow:</span>
                <span className="text-gray-900">158</span>
              </div>
              <div className="flex items-center gap-1">
                <span>🐃 Buffalo:</span>
                <span className="text-gray-900">87</span>
              </div>
            </div>
          </div>
          <div className="bg-green-100 p-1.5 rounded-lg">
            <Milk className="w-4 h-4 text-green-600" />
          </div>
        </div>
      </Card>
    </div>
  );
}
