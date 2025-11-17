import { useState } from 'react';
import { X, Edit, MessageSquare, Phone, Mail, MapPin, Bell, IndianRupee, Calendar, FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

interface CustomerDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: any;
  onEdit: () => void;
}

export function CustomerDetailsModal({
  open,
  onOpenChange,
  customer,
  onEdit,
}: CustomerDetailsModalProps) {
  const [selectedMonth, setSelectedMonth] = useState('current');

  if (!customer) return null;

  // Mock billing data
  const billingData = [
    {
      month: 'Nov \'24',
      consumed: 42,
      cowMilk: 25,
      buffaloMilk: 17,
      totalBill: 4200,
      received: 4200,
      pending: 0,
      status: 'paid',
    },
    {
      month: 'Oct \'24',
      consumed: 38,
      cowMilk: 20,
      buffaloMilk: 18,
      totalBill: 3800,
      received: 3500,
      pending: 300,
      status: 'partial',
    },
    {
      month: 'Sep \'24',
      consumed: 40,
      cowMilk: 22,
      buffaloMilk: 18,
      totalBill: 4000,
      received: 4000,
      pending: 0,
      status: 'paid',
    },
  ];

  // Mock subscription data
  const subscriptions = [
    {
      id: 1,
      product: 'Premium Cow Milk',
      shift: 'morning',
      milkType: 'cow',
      quantity: '1.5 L',
      rate: 60,
      dailyAmount: 90,
      discount: 10,
      coupon: 'SAVE10',
    },
    {
      id: 2,
      product: 'Buffalo Milk',
      shift: 'evening',
      milkType: 'buffalo',
      quantity: '1 L',
      rate: 70,
      dailyAmount: 70,
      discount: 0,
      coupon: null,
    },
  ];

  // Mock consumption data
  const consumptionData = [
    {
      date: '10 Nov',
      morningCow: 1.5,
      morningBuffalo: 0,
      eveningCow: 0,
      eveningBuffalo: 1,
      total: 2.5,
      status: 'delivered',
      isCurrent: true,
    },
    {
      date: '09 Nov',
      morningCow: 1.5,
      morningBuffalo: 0,
      eveningCow: 0,
      eveningBuffalo: 1,
      total: 2.5,
      status: 'delivered',
      isCurrent: false,
    },
    {
      date: '08 Nov',
      morningCow: 0,
      morningBuffalo: 0,
      eveningCow: 0,
      eveningBuffalo: 0,
      total: 0,
      status: 'vacation',
      isCurrent: false,
    },
    {
      date: '07 Nov',
      morningCow: 1.5,
      morningBuffalo: 0,
      eveningCow: 0,
      eveningBuffalo: 1,
      total: 2.5,
      status: 'delivered',
      isCurrent: false,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[95vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">
                {customer.firstName} {customer.lastName}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Customer details and information
              </DialogDescription>
              <div className="flex items-center gap-2 mt-2">
                {customer.status === 'active' && (
                  <Badge className="bg-green-600">Active</Badge>
                )}
                {customer.status === 'inactive' && (
                  <Badge variant="secondary" className="bg-gray-600">
                    Inactive
                  </Badge>
                )}
                {customer.status === 'vacation' && (
                  <Badge variant="secondary" className="bg-amber-600">
                    On Vacation
                  </Badge>
                )}
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto px-6 py-4" style={{ maxHeight: 'calc(95vh - 180px)', scrollbarWidth: 'none' }}>
          <div className="space-y-6">
            {/* Section 1: Customer Information */}
            <Card className="p-4 bg-white border border-gray-200">
              <h3 className="text-sm text-gray-900 mb-3">Customer Information</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{customer.contact}</span>
                    {customer.hasWhatsApp && (
                      <MessageSquare className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  {customer.secondaryContact && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{customer.secondaryContact}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">customer@example.com</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span>{customer.address}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span>Zip: {customer.zip}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100">
                <Badge variant="outline">{customer.route}</Badge>
                <Badge variant="outline">
                  {customer.shift === 'morning' ? '☀️ Morning' : customer.shift === 'evening' ? '🌙 Evening' : '⏰ Both'}
                </Badge>
                <Badge variant="secondary">
                  {customer.milkType === 'cow' ? '🐄 Cow' : customer.milkType === 'buffalo' ? '🐃 Buffalo' : '🐄🐃 Both'}
                </Badge>
                <span className="text-xs text-gray-500 ml-auto">Member Since: Jan 2024</span>
              </div>
              {customer.remarks && (
                <div className="mt-3 p-2 bg-gray-50 border border-dashed border-gray-300 rounded text-xs text-gray-600">
                  <span className="text-gray-500">Remarks:</span> {customer.remarks || 'Prefers delivery before 7 AM'}
                </div>
              )}
            </Card>

            {/* Section 2: Billing & Payment Overview */}
            <div>
              <h3 className="text-sm text-gray-900 mb-3">Billing & Payment Overview</h3>
              <div className="grid grid-cols-3 gap-3 pb-2">
                {billingData.map((billing, index) => (
                  <Card
                    key={index}
                    className={`border-l-4 ${
                      billing.status === 'paid'
                        ? 'border-l-green-500'
                        : billing.status === 'partial'
                        ? 'border-l-amber-500'
                        : 'border-l-red-500'
                    }`}
                  >
                    <div className="p-3 space-y-2">
                      {/* Billing Section */}
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {billing.month}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xl text-gray-900">{billing.consumed} L</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                          <span>🐄 {billing.cowMilk} L</span>
                          <span>🐃 {billing.buffaloMilk} L</span>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 pt-2">
                        <p className="text-xs text-gray-500">Total Bill</p>
                        <p className="text-xl text-gray-900">₹{billing.totalBill}</p>
                      </div>
                      {/* Payment Section */}
                      <div
                        className={`p-2 rounded-lg ${
                          billing.status === 'paid'
                            ? 'bg-green-50'
                            : billing.status === 'partial'
                            ? 'bg-amber-50'
                            : 'bg-red-50'
                        }`}
                      >
                        <p className="text-xs text-gray-500">Received</p>
                        <p className="text-lg text-gray-900">₹{billing.received}</p>
                        {billing.pending > 0 ? (
                          <p className="text-sm text-red-600 mt-1">
                            Pending: ₹{billing.pending}
                          </p>
                        ) : (
                          <p className="text-sm text-green-600 mt-1">
                            Fully Paid ✓
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Section 3: Active Subscriptions */}
            <div>
              <h3 className="text-sm text-gray-900 mb-3">Active Subscriptions</h3>
              <div className="grid grid-cols-2 gap-3">
                {subscriptions.map((sub) => (
                  <Card key={sub.id} className="p-3 bg-white border border-gray-200 hover:border-blue-400 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm text-gray-900">{sub.product}</h4>
                      <span className="text-blue-600">→</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {sub.shift === 'morning' ? '☀️ Morning' : '🌙 Evening'}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {sub.milkType === 'cow' ? '🐄 Cow' : '🐃 Buffalo'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-gray-500">Quantity</p>
                        <p className="text-gray-900">{sub.quantity}</p>
                        <p className="text-gray-500">Daily</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Rate</p>
                        <p className="text-gray-900">₹{sub.rate}/L</p>
                        <p className="text-gray-900">₹{sub.dailyAmount}/day</p>
                      </div>
                    </div>
                    {sub.discount > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                          {sub.discount}% OFF
                        </Badge>
                        {sub.coupon && (
                          <Badge variant="outline" className="text-xs border-dashed">
                            {sub.coupon}
                          </Badge>
                        )}
                      </div>
                    )}
                    <p className="text-xs text-blue-600 mt-2">View in Subscriptions →</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Section 4: Milk Consumption History */}
            <div>
              <h3 className="text-sm text-gray-900 mb-3">Milk Consumption History</h3>
              <Tabs value={selectedMonth} onValueChange={setSelectedMonth}>
                <TabsList>
                  <TabsTrigger value="current">Current Month</TabsTrigger>
                  <TabsTrigger value="previous">Previous Month</TabsTrigger>
                  <TabsTrigger value="oct">Oct '24</TabsTrigger>
                  <TabsTrigger value="sep">Sep '24</TabsTrigger>
                </TabsList>
                <TabsContent value="current" className="mt-3">
                  <Card className="overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead rowSpan={2} className="border-r">Date</TableHead>
                          <TableHead colSpan={2} className="text-center border-r">Morning</TableHead>
                          <TableHead colSpan={2} className="text-center border-r">Evening</TableHead>
                          <TableHead rowSpan={2} className="border-r">Total</TableHead>
                          <TableHead rowSpan={2}>Status</TableHead>
                        </TableRow>
                        <TableRow className="bg-gray-50">
                          <TableHead className="text-center">Cow</TableHead>
                          <TableHead className="text-center border-r">Buffalo</TableHead>
                          <TableHead className="text-center">Cow</TableHead>
                          <TableHead className="text-center border-r">Buffalo</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {consumptionData.map((day, index) => (
                          <TableRow
                            key={index}
                            className={day.isCurrent ? 'border-l-4 border-l-blue-500 bg-blue-50' : ''}
                          >
                            <TableCell className="border-r">{day.date}</TableCell>
                            <TableCell className="text-center">{day.morningCow || '—'}</TableCell>
                            <TableCell className="text-center border-r">{day.morningBuffalo || '—'}</TableCell>
                            <TableCell className="text-center">{day.eveningCow || '—'}</TableCell>
                            <TableCell className="text-center border-r">{day.eveningBuffalo || '—'}</TableCell>
                            <TableCell className="border-r">{day.total} L</TableCell>
                            <TableCell>
                              {day.status === 'delivered' && (
                                <Badge className="text-xs bg-green-600">Delivered</Badge>
                              )}
                              {day.status === 'vacation' && (
                                <Badge variant="secondary" className="text-xs bg-gray-400">Vacation</Badge>
                              )}
                              {day.status === 'refused' && (
                                <Badge variant="secondary" className="text-xs bg-red-600">Refused</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-blue-50">
                          <TableCell className="border-r">TOTAL</TableCell>
                          <TableCell className="text-center">4.5</TableCell>
                          <TableCell className="text-center border-r">0</TableCell>
                          <TableCell className="text-center">0</TableCell>
                          <TableCell className="text-center border-r">3</TableCell>
                          <TableCell className="border-r">7.5 L</TableCell>
                          <TableCell className="text-xs">✓ 3 | ✗ 0</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Fixed footer with quick actions */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Bell className="w-4 h-4 text-blue-600" />
              Send Bill Reminder
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <IndianRupee className="w-4 h-4 text-green-600" />
              Record Payment
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              Mark on Vacation
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <FileText className="w-4 h-4 text-gray-600" />
              View Full Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}