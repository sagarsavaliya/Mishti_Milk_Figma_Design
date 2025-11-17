import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';

interface CreateDeliveryLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock customer subscriptions
const mockCustomers = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    address: '123 MG Road, Sector 12',
    subscriptionId: 'SUB001',
    shift: 'Morning',
    milkType: 'Cow',
    subscribedQty: 2,
    lastOrder: { qty: 2, date: '19 Sept' }
  },
  {
    id: 2,
    name: 'Suresh Patel',
    address: '45 Gandhi Nagar, Block A',
    subscriptionId: 'SUB003',
    shift: 'Morning',
    milkType: 'Cow',
    subscribedQty: 3,
    lastOrder: { qty: 3, date: '18 Sept' }
  },
  {
    id: 3,
    name: 'Anita Desai',
    address: '78 Park Street, Villa 5',
    subscriptionId: 'SUB004',
    shift: 'Morning',
    milkType: 'Buffalo',
    subscribedQty: 2,
    lastOrder: { qty: 2, date: '19 Sept' }
  },
  {
    id: 4,
    name: 'Ramesh Yadav',
    address: '90 Nehru Colony',
    subscriptionId: 'SUB007',
    shift: 'Morning',
    milkType: 'Cow',
    subscribedQty: 1.5,
    lastOrder: { qty: 1.5, date: '18 Sept' }
  },
  {
    id: 5,
    name: 'Priya Sharma',
    address: '56 Lal Bahadur Marg',
    subscriptionId: 'SUB002',
    shift: 'Evening',
    milkType: 'Buffalo',
    subscribedQty: 1.5,
    lastOrder: { qty: 1, date: '19 Sept' }
  },
  {
    id: 6,
    name: 'Mahesh Gupta',
    address: '12 Ring Road, Apartment 302',
    subscriptionId: 'SUB005',
    shift: 'Evening',
    milkType: 'Cow',
    subscribedQty: 1,
    lastOrder: { qty: 1, date: '19 Sept' }
  },
  {
    id: 7,
    name: 'Kavita Mehta',
    address: '67 Station Road',
    subscriptionId: 'SUB006',
    shift: 'Evening',
    milkType: 'Buffalo',
    subscribedQty: 2.5,
    lastOrder: { qty: 2.5, date: '18 Sept' }
  },
];

export function CreateDeliveryLogModal({ isOpen, onClose }: CreateDeliveryLogModalProps) {
  const [selectedShift, setSelectedShift] = useState('Morning');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [customerQuantities, setCustomerQuantities] = useState<Record<number, number>>({});

  const filteredCustomers = mockCustomers.filter(
    customer => customer.shift === selectedShift
  );

  // Initialize quantities when shift changes
  const handleShiftChange = (shift: string) => {
    setSelectedShift(shift);
    const initialQuantities: Record<number, number> = {};
    mockCustomers
      .filter(c => c.shift === shift)
      .forEach(customer => {
        initialQuantities[customer.id] = customer.subscribedQty;
      });
    setCustomerQuantities(initialQuantities);
  };

  const handleQuantityChange = (customerId: number, value: string) => {
    const qty = parseFloat(value) || 0;
    setCustomerQuantities(prev => ({
      ...prev,
      [customerId]: qty
    }));
  };

  const handleSave = () => {
    console.log('Saving delivery log:', {
      shift: selectedShift,
      date: selectedDate,
      customers: filteredCustomers.map(c => ({
        ...c,
        deliveryQty: customerQuantities[c.id] || c.subscribedQty
      }))
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Create Delivery Log</DialogTitle>
          <DialogDescription>
            Enter the delivery details for the selected shift and date.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex-shrink-0">
          {/* Top Row Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Shift</Label>
              <Select value={selectedShift} onValueChange={handleShiftChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Morning">Morning</SelectItem>
                  <SelectItem value="Evening">Evening</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>

          <Separator />

          <div>
            <Label className="text-gray-900">Customers for {selectedShift} Shift</Label>
            <p className="text-sm text-gray-500 mb-3">
              {filteredCustomers.length} customers found
            </p>
          </div>
        </div>

        {/* Customer List */}
        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-3 pr-4">
            {filteredCustomers.map((customer, index) => (
              <div key={customer.id}>
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-gray-900">{customer.name}</p>
                        <Badge variant="outline" className="text-xs">
                          {customer.subscriptionId}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">{customer.address}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>Milk: {customer.milkType}</span>
                        <span>•</span>
                        <span className="text-gray-400">
                          Last: {customer.lastOrder.qty} Ltr · {customer.lastOrder.date}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 w-24">
                      <Label className="text-xs">Qty (Ltr)</Label>
                      <Input
                        type="number"
                        step="0.5"
                        min="0"
                        value={customerQuantities[customer.id] ?? customer.subscribedQty}
                        onChange={(e) => handleQuantityChange(customer.id, e.target.value)}
                        className="text-center"
                      />
                    </div>
                  </div>
                </div>
                {index < filteredCustomers.length - 1 && (
                  <Separator className="my-3" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter className="flex-shrink-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Delivery Log
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
