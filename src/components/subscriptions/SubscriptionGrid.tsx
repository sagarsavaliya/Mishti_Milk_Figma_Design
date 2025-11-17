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
import {
  Play,
  Pause,
  Edit,
  MoreVertical,
  Sun,
  Moon,
  Calendar,
  MapPin,
  Phone,
  User,
} from 'lucide-react';
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
    address: 'House No. 45, Sector 12, Gandhi Nagar',
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
    address: 'Flat 301, Tower B, Sunrise Apartments',
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
    address: 'Bungalow 12, Green Valley Society',
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
    address: 'Plot 78, Phase 2, Rose Garden Colony',
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
    address: 'House 56, Lane 3, Civil Lines',
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
  {
    id: 6,
    customerName: 'Deepak Mehta',
    customerId: 'CUST006',
    contact: '+91 98765 43215',
    address: 'Villa 23, Palm Heights',
    cowQty: '1.5L',
    buffaloQty: '1.5L',
    shift: 'evening',
    frequency: 'daily',
    dailyAmount: 210,
    monthlyEstimate: 6300,
    status: 'active',
    startDate: 'Oct 1, 2024',
    isPaused: false,
  },
];

interface SubscriptionGridProps {
  searchQuery: string;
  statusFilter: StatusFilter;
  shiftFilter: ShiftFilter;
  milkTypeFilter: MilkTypeFilter;
  selectedIds: number[];
  onSelectionChange: (ids: number[]) => void;
}

export function SubscriptionGrid({
  searchQuery,
  statusFilter,
  shiftFilter,
  milkTypeFilter,
  selectedIds,
  onSelectionChange,
}: SubscriptionGridProps) {
  const filteredSubscriptions = mockSubscriptions.filter((sub) => {
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

    if (statusFilter !== 'all' && sub.status !== statusFilter) {
      return false;
    }

    if (shiftFilter !== 'all' && sub.shift !== shiftFilter) {
      return false;
    }

    return true;
  });

  const handleSelectOne = (id: number, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedIds, id]);
    } else {
      onSelectionChange(selectedIds.filter((i) => i !== id));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredSubscriptions.map((sub) => (
        <Card
          key={sub.id}
          className={`p-4 bg-white border transition-all hover:shadow-md ${
            selectedIds.includes(sub.id)
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-200'
          }`}
        >
          {/* Header with Checkbox and Status */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-start gap-2 flex-1 min-w-0">
              <Checkbox
                checked={selectedIds.includes(sub.id)}
                onCheckedChange={(checked) =>
                  handleSelectOne(sub.id, checked as boolean)
                }
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-sm text-gray-900 truncate">{sub.customerName}</h3>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {sub.cowQty !== '0L' && (
                      <span className="text-xs text-gray-600">🐄 {sub.cowQty}</span>
                    )}
                    {sub.buffaloQty !== '0L' && (
                      <span className="text-xs text-gray-600">🐃 {sub.buffaloQty}</span>
                    )}
                    {sub.status === 'active' && (
                      <div className="w-2 h-2 bg-green-500 rounded-full ml-1" />
                    )}
                    {sub.status === 'paused' && (
                      <div className="w-2 h-2 bg-yellow-500 rounded-full ml-1" />
                    )}
                    {sub.status === 'inactive' && (
                      <div className="w-2 h-2 bg-gray-400 rounded-full ml-1" />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    {sub.customerId}
                  </Badge>
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
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-1 mb-2 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>{sub.contact}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{sub.address}</span>
            </div>
          </div>

          {/* Alternate Day Quantities */}
          {sub.frequency === 'alternate' && sub.altCowQty && (
            <div className="mb-2">
              <Badge variant="outline" className="text-xs">
                Alt: 🐄 {sub.altCowQty} | 🐃 {sub.altBuffaloQty}
              </Badge>
            </div>
          )}

          {/* Pricing */}
          <div className="mb-2 p-2 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Daily</span>
              <span className="text-sm text-gray-900">₹{sub.dailyAmount}</span>
            </div>
            {sub.coupon && (
              <Badge variant="secondary" className="text-xs mt-1">
                {sub.coupon} (-₹{sub.discount})
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                {sub.isPaused ? (
                  <Play className="w-3 h-3" />
                ) : (
                  <Pause className="w-3 h-3" />
                )}
              </Button>
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                <Edit className="w-3 h-3" />
              </Button>
            </div>
            
            {/* Dates - Centered */}
            <div className="text-xs text-gray-500">
              Since {sub.startDate}
            </div>

            <div className="flex items-center gap-2">
              <Switch checked={sub.status === 'active'} className="scale-75" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                    <MoreVertical className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View History</DropdownMenuItem>
                  <DropdownMenuItem>View Billing</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
