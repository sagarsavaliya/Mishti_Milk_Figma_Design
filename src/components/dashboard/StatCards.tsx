import { TrendingUp, TrendingDown, Package, Users, IndianRupee, Beef } from 'lucide-react';
import { Card } from '../ui/card';

export function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Production */}
      <Card className="p-3 bg-white border border-gray-200">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Production</p>
            <p className="text-2xl text-gray-900 mt-1">150L</p>
          </div>
          <div className="bg-green-100 p-2 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-2">
          <div className="text-center">
            <p className="text-lg text-gray-900">70L</p>
            <p className="text-xs text-gray-500">Cow</p>
          </div>
          <div className="text-center">
            <p className="text-lg text-gray-900">80L</p>
            <p className="text-xs text-gray-500">Buffalo</p>
          </div>
        </div>
      </Card>

      {/* Required */}
      <Card className="p-3 bg-white border border-gray-200">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Required</p>
            <p className="text-2xl text-gray-900 mt-1">190L</p>
          </div>
          <div className="bg-orange-100 p-2 rounded-lg">
            <TrendingDown className="w-5 h-5 text-orange-600" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-2">
          <div className="text-center">
            <p className="text-lg text-gray-900">90L</p>
            <p className="text-xs text-gray-500">Cow</p>
          </div>
          <div className="text-center">
            <p className="text-lg text-gray-900">100L</p>
            <p className="text-xs text-gray-500">Buffalo</p>
          </div>
        </div>
      </Card>

      {/* Bottle Counts */}
      <Card className="p-3 bg-white border border-gray-200">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Bottle Counts</p>
            <p className="text-2xl text-gray-900 mt-1">240</p>
          </div>
          <div className="bg-blue-100 p-2 rounded-lg">
            <Package className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-2">
          {/* Cow Column */}
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Cow</p>
            <div className="flex gap-2">
              <div className="flex-1 text-center">
                <p className="text-lg text-gray-900">40</p>
                <p className="text-xs text-gray-500">500ml</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-lg text-gray-900">70</p>
                <p className="text-xs text-gray-500">1L</p>
              </div>
            </div>
          </div>
          
          {/* Buffalo Column */}
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Buffalo</p>
            <div className="flex gap-2">
              <div className="flex-1 text-center">
                <p className="text-lg text-gray-900">60</p>
                <p className="text-xs text-gray-500">500ml</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-lg text-gray-900">70</p>
                <p className="text-xs text-gray-500">1L</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Transaction with Supplier */}
      <Card className="p-3 bg-white border border-gray-200">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Supplier Transaction</p>
            <p className="text-2xl text-gray-900 mt-1">40L</p>
          </div>
          <div className="bg-purple-100 p-2 rounded-lg">
            <Package className="w-5 h-5 text-purple-600" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-2">
          <div className="text-center">
            <p className="text-lg text-gray-900">20L</p>
            <p className="text-xs text-gray-500">Cow</p>
          </div>
          <div className="text-center">
            <p className="text-lg text-gray-900">20L</p>
            <p className="text-xs text-gray-500">Buffalo</p>
          </div>
        </div>
      </Card>

      {/* Subscriptions */}
      <Card className="p-3 bg-white border border-gray-200">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Subscriptions</p>
            <p className="text-2xl text-gray-900 mt-1">255</p>
          </div>
          <div className="bg-indigo-100 p-2 rounded-lg">
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-2">
          <div className="text-center">
            <p className="text-lg text-green-600">210</p>
            <p className="text-xs text-gray-500">Active</p>
          </div>
          <div className="text-center">
            <p className="text-lg text-orange-600">30</p>
            <p className="text-xs text-gray-500">Off</p>
          </div>
          <div className="text-center">
            <p className="text-lg text-red-600">15</p>
            <p className="text-xs text-gray-500">Inactive</p>
          </div>
        </div>
      </Card>

      {/* Pending Collection */}
      <Card className="p-3 bg-white border border-gray-200">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Pending Collection</p>
            <p className="text-2xl text-gray-900 mt-1">₹53,220</p>
          </div>
          <div className="bg-red-100 p-2 rounded-lg">
            <IndianRupee className="w-5 h-5 text-red-600" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-2">
          <div className="text-center">
            <p className="text-sm text-gray-900">₹16,720</p>
            <p className="text-xs text-gray-500">Pre. Month</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-900">₹14,320</p>
            <p className="text-xs text-gray-500">Sep</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-900">₹20,280</p>
            <p className="text-xs text-gray-500">Aug</p>
          </div>
        </div>
      </Card>

      {/* Daily Revenue */}
      <Card className="p-3 bg-white border border-gray-200">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Daily Revenue</p>
            <p className="text-2xl text-gray-900 mt-1">₹15,200</p>
          </div>
          <div className="bg-green-100 p-2 rounded-lg">
            <IndianRupee className="w-5 h-5 text-green-600" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-2">
          <div className="text-center">
            <p className="text-lg text-gray-900">₹7,200</p>
            <p className="text-xs text-gray-500">Cow</p>
          </div>
          <div className="text-center">
            <p className="text-lg text-gray-900">₹8,000</p>
            <p className="text-xs text-gray-500">Buffalo</p>
          </div>
        </div>
      </Card>

      {/* Animals */}
      <Card className="p-3 bg-white border border-gray-200">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Animals</p>
            <p className="text-2xl text-gray-900 mt-1">70</p>
          </div>
          <div className="bg-amber-100 p-2 rounded-lg">
            <Beef className="w-5 h-5 text-amber-600" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-2">
          {/* Milking Column */}
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Milking</p>
            <div className="flex gap-2">
              <div className="flex-1 text-center">
                <p className="text-lg text-gray-900">15</p>
                <p className="text-xs text-gray-500">Cows</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-lg text-gray-900">35</p>
                <p className="text-xs text-gray-500">Buffalo</p>
              </div>
            </div>
          </div>
          
          {/* Pregnant Column */}
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Pregnant</p>
            <div className="flex gap-2">
              <div className="flex-1 text-center">
                <p className="text-lg text-gray-900">8</p>
                <p className="text-xs text-gray-500">Cows</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-lg text-gray-900">12</p>
                <p className="text-xs text-gray-500">Buffalo</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
