import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Switch } from '../ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Play, Pause, Edit, MoreVertical, Sun, Moon, Calendar, MapPin, Phone } from 'lucide-react';
import type { StatusFilter, ShiftFilter, MilkTypeFilter } from '../SubscriptionsPage';

interface Subscription {
  id: number;
  customerName: string;
  customerId: string;
  contact: string;
  address: string;
  cowQty: string;
  buffaloQty: string;
  altCowQty?: string;
  altBuffaloQty?: string;
  shift: 'morning' | 'evening' | 'both';
  frequency: 'daily' | 'alternate';
  dailyAmount: number;
  monthlyEstimate: number;
  coupon?: string;
  discount?: number;
  status: 'active' | 'paused' | 'inactive';
  startDate: string;
  endDate?: string;
  isPaused: boolean;
}

const mockSubscriptions: Subscription[] = [
  {
    id: 1,
    customerName: 'Rajesh Kumar',
    customerId: 'CUST001',
    contact: '+91 98765 43210',
    address: 'House No. 45, Sector 12, Gandhi Nagar, Delhi',
    cowQty: '2L',
    buffaloQty: '1L',
    shift: 'morning',
    frequency: 'daily',
    dailyAmount: 190,
    monthlyEstimate: 5700,
    coupon: 'SAVE10',
    discount: 10,
    status: 'active',
    startDate: 'Oct 15, 2024',
    isPaused: false,
  },
  {
    id: 2,
    customerName: 'Priya Sharma',
    customerId: 'CUST002',
    contact: '+91 98765 43211',
    address: 'Flat 301, Tower B, Sunrise Apartments, Mumbai',
    cowQty: '1L',
    buffaloQty: '2L',
    altCowQty: '1.5L',
    altBuffaloQty: '1L',
    shift: 'evening',
    frequency: 'alternate',
    dailyAmount: 220,
    monthlyEstimate: 3300,
    status: 'active',
    startDate: 'Sep 28, 2024',
    isPaused: false,
  },
  {
    id: 3,
    customerName: 'Amit Patel',
    customerId: 'CUST003',
    contact: '+91 98765 43212',
    address: 'Bungalow 12, Green Valley Society, Ahmedabad',
    cowQty: '1.5L',
    buffaloQty: '0.5L',
    shift: 'morning',
    frequency: 'daily',
    dailyAmount: 135,
    monthlyEstimate: 4050,
    status: 'paused',
    startDate: 'Aug 10, 2024',
    isPaused: true,
  },
  {
    id: 4,
    customerName: 'Sneha Verma',
    customerId: 'CUST004',
    contact: '+91 98765 43213',
    address: 'Plot 78, Phase 2, Rose Garden Colony, Jaipur',
    cowQty: '1L',
    buffaloQty: '1L',
    shift: 'both',
    frequency: 'daily',
    dailyAmount: 160,
    monthlyEstimate: 4800,
    coupon: 'FRESH5',
    discount: 5,
    status: 'active',
    startDate: 'Nov 1, 2024',
    endDate: 'Dec 31, 2024',
    isPaused: false,
  },
  {
    id: 5,
    customerName: 'Rahul Singh',
    customerId: 'CUST005',
    contact: '+91 98765 43214',
    address: 'House 56, Lane 3, Civil Lines, Lucknow',
    cowQty: '2L',
    buffaloQty: '0L',
    shift: 'morning',
    frequency: 'daily',
    dailyAmount: 120,
    monthlyEstimate: 3600,
    status: 'inactive',
    startDate: 'Jul 20, 2024',
    endDate: 'Oct 31, 2024',
    isPaused: false,
  },
];

interface SubscriptionListProps {
  searchQuery: string;
  statusFilter: StatusFilter;
  shiftFilter: ShiftFilter;
  milkTypeFilter: MilkTypeFilter;
  selectedIds: number[];
  onSelectionChange: (ids: number[]) => void;
}

export function SubscriptionList({
  searchQuery,
  statusFilter,
  shiftFilter,
  milkTypeFilter,
  selectedIds,
  onSelectionChange,
}: SubscriptionListProps) {
  const filteredSubscriptions = mockSubscriptions.filter((sub) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !sub.customerName.toLowerCase().includes(query) &&
        !sub.contact.includes(query) &&
        !sub.customerId.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Status filter
    if (statusFilter !== 'all' && sub.status !== statusFilter) {
      return false;
    }

    // Shift filter
    if (shiftFilter !== 'all' && sub.shift !== shiftFilter) {
      return false;
    }

    return true;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(filteredSubscriptions.map((s) => s.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedIds, id]);
    } else {
      onSelectionChange(selectedIds.filter((i) => i !== id));
    }
  };

  return (
    <Card className="bg-white border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={
              filteredSubscriptions.length > 0 &&
              selectedIds.length === filteredSubscriptions.length
            }
            onCheckedChange={handleSelectAll}
          />
          <h2 className="text-lg text-gray-900">All Subscriptions</h2>
          <Badge variant="secondary">{filteredSubscriptions.length}</Badge>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Sort by:</span>
          <Button variant="ghost" size="sm">
            Customer Name
          </Button>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {filteredSubscriptions.map((sub) => (
          <div
            key={sub.id}
            className="p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start gap-4">
              {/* Checkbox */}
              <Checkbox
                checked={selectedIds.includes(sub.id)}
                onCheckedChange={(checked) =>
                  handleSelectOne(sub.id, checked as boolean)
                }
                className="mt-1"
              />

              {/* Customer Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-gray-900">{sub.customerName}</h3>
                      <Badge variant="outline" className="text-xs">
                        {sub.customerId}
                      </Badge>
                      {sub.status === 'active' && (
                        <Badge className="text-xs bg-green-600">Active</Badge>
                      )}
                      {sub.status === 'paused' && (
                        <Badge className="text-xs bg-yellow-600">Paused</Badge>
                      )}
                      {sub.status === 'inactive' && (
                        <Badge className="text-xs bg-gray-600">Inactive</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {sub.contact}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate max-w-xs">{sub.address}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subscription Details */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2">
                  {/* Milk Details */}
                  <div className="flex flex-wrap items-center gap-1">
                    {sub.cowQty !== '0L' && (
                      <Badge variant="secondary" className="text-xs">
                        🐄 {sub.cowQty}
                      </Badge>
                    )}
                    {sub.buffaloQty !== '0L' && (
                      <Badge variant="secondary" className="text-xs">
                        🐃 {sub.buffaloQty}
                      </Badge>
                    )}
                    {sub.frequency === 'alternate' && (
                      <Badge variant="outline" className="text-xs">
                        Alt: 🐄 {sub.altCowQty} | 🐃 {sub.altBuffaloQty}
                      </Badge>
                    )}
                  </div>

                  {/* Shift & Frequency */}
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" className="text-xs">
                      {sub.shift === 'morning' && (
                        <>
                          <Sun className="w-3 h-3 mr-1" />
                          Morning
                        </>
                      )}
                      {sub.shift === 'evening' && (
                        <>
                          <Moon className="w-3 h-3 mr-1" />
                          Evening
                        </>
                      )}
                      {sub.shift === 'both' && (
                        <>
                          <Calendar className="w-3 h-3 mr-1" />
                          Both
                        </>
                      )}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {sub.frequency === 'daily' ? 'Daily' : 'Alt Days'}
                    </Badge>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-900">₹{sub.dailyAmount}/day</span>
                  </div>

                  {/* Dates */}
                  <div className="text-xs text-gray-500">
                    Since {sub.startDate}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  {sub.isPaused ? (
                    <Play className="w-4 h-4" />
                  ) : (
                    <Pause className="w-4 h-4" />
                  )}
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Edit className="w-4 h-4" />
                </Button>
                <Switch checked={sub.status === 'active'} />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Delivery History</DropdownMenuItem>
                    <DropdownMenuItem>View Billing</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate Subscription</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Delete Subscription
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
