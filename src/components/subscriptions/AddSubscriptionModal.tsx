import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Badge } from '../ui/badge';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
import {
  Sun,
  Moon,
  Calendar as CalendarIcon,
  Repeat,
  Plus,
  Minus,
  User,
  Phone,
  MapPin,
  CreditCard,
} from 'lucide-react';
import { format } from 'date-fns';

interface AddSubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockCustomers = [
  {
    id: 'CUST001',
    name: 'Rajesh Kumar',
    contact: '+91 98765 43210',
    address: 'House No. 45, Sector 12, Gandhi Nagar, Delhi',
    activeSubscriptions: 1,
  },
  {
    id: 'CUST002',
    name: 'Priya Sharma',
    contact: '+91 98765 43211',
    address: 'Flat 301, Tower B, Sunrise Apartments, Mumbai',
    activeSubscriptions: 0,
  },
  {
    id: 'CUST003',
    name: 'Amit Patel',
    contact: '+91 98765 43212',
    address: 'Bungalow 12, Green Valley Society, Ahmedabad',
    activeSubscriptions: 1,
  },
];

export function AddSubscriptionModal({
  open,
  onOpenChange,
}: AddSubscriptionModalProps) {
  const [step, setStep] = useState<'customer' | 'delivery' | 'milk' | 'summary'>(
    'customer'
  );
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [shift, setShift] = useState<'morning' | 'evening'>('morning');
  const [frequency, setFrequency] = useState<'daily' | 'alternate'>('daily');
  const [cowMilk, setCowMilk] = useState(true);
  const [buffaloMilk, setBuffaloMilk] = useState(false);
  const [cowQty, setCowQty] = useState(1);
  const [buffaloQty, setBuffaloQty] = useState(0);
  const [cowRate, setCowRate] = useState(60);
  const [buffaloRate, setBuffaloRate] = useState(80);
  const [altCowQty, setAltCowQty] = useState(1);
  const [altBuffaloQty, setAltBuffaloQty] = useState(0);
  const [cowCoupon, setCowCoupon] = useState('');
  const [buffaloCoupon, setBuffaloCoupon] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [noEndDate, setNoEndDate] = useState(true);
  const [sendSMS, setSendSMS] = useState(true);
  const [sendWhatsApp, setSendWhatsApp] = useState(true);

  const customer = mockCustomers.find((c) => c.id === selectedCustomer);

  const calculateDaily = () => {
    let total = 0;
    if (cowMilk) total += cowQty * cowRate;
    if (buffaloMilk) total += buffaloQty * buffaloRate;
    return total;
  };

  const calculateMonthly = () => {
    return calculateDaily() * 30;
  };

  const handleNext = () => {
    if (step === 'customer') setStep('delivery');
    else if (step === 'delivery') setStep('milk');
    else if (step === 'milk') setStep('summary');
  };

  const handleBack = () => {
    if (step === 'delivery') setStep('customer');
    else if (step === 'milk') setStep('delivery');
    else if (step === 'summary') setStep('milk');
  };

  const handleSubmit = () => {
    // Handle form submission
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Subscription</DialogTitle>
          <DialogDescription>
            Create a new milk delivery subscription for your customer
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          {['customer', 'delivery', 'milk', 'summary'].map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step === s
                    ? 'bg-blue-600 text-white'
                    : i <
                      ['customer', 'delivery', 'milk', 'summary'].indexOf(step)
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i + 1}
              </div>
              {i < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    i <
                    ['customer', 'delivery', 'milk', 'summary'].indexOf(step)
                      ? 'bg-green-600'
                      : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Customer Selection */}
        {step === 'customer' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="customer">Select Customer</Label>
              <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                <SelectTrigger id="customer">
                  <SelectValue placeholder="Search or select a customer" />
                </SelectTrigger>
                <SelectContent>
                  {mockCustomers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>
                          {customer.name} - {customer.contact}
                        </span>
                        {customer.activeSubscriptions > 0 && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {customer.activeSubscriptions} active
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="link" className="mt-2 p-0 h-auto text-xs">
                <Plus className="w-3 h-3 mr-1" />
                Add New Customer
              </Button>
            </div>

            {customer && (
              <Card className="p-4 bg-gray-50 border border-gray-200">
                <h4 className="text-sm mb-3 text-gray-700">Customer Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{customer.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {customer.id}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{customer.contact}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{customer.address}</span>
                  </div>
                  {customer.activeSubscriptions > 0 && (
                    <div className="pt-2 border-t border-gray-200">
                      <span className="text-xs text-orange-600">
                        ⚠️ Customer has {customer.activeSubscriptions} active
                        subscription(s)
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Step 2: Delivery Details */}
        {step === 'delivery' && (
          <div className="space-y-6">
            <div>
              <Label className="mb-3 block">Shift Selection</Label>
              <RadioGroup value={shift} onValueChange={(v: any) => setShift(v)}>
                <div className="grid grid-cols-2 gap-3">
                  <Card
                    className={`p-4 cursor-pointer transition-all ${
                      shift === 'morning'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                    onClick={() => setShift('morning')}
                  >
                    <RadioGroupItem value="morning" id="morning" className="sr-only" />
                    <div className="flex items-center gap-2 mb-2">
                      <Sun className="w-5 h-5 text-orange-500" />
                      <span className="text-gray-900">Morning</span>
                    </div>
                    <p className="text-xs text-gray-500">6:00 AM - 8:00 AM</p>
                  </Card>
                  <Card
                    className={`p-4 cursor-pointer transition-all ${
                      shift === 'evening'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                    onClick={() => setShift('evening')}
                  >
                    <RadioGroupItem value="evening" id="evening" className="sr-only" />
                    <div className="flex items-center gap-2 mb-2">
                      <Moon className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-900">Evening</span>
                    </div>
                    <p className="text-xs text-gray-500">5:00 PM - 7:00 PM</p>
                  </Card>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="mb-3 block">Frequency</Label>
              <RadioGroup
                value={frequency}
                onValueChange={(v: any) => setFrequency(v)}
              >
                <div className="grid grid-cols-2 gap-3">
                  <Card
                    className={`p-4 cursor-pointer transition-all ${
                      frequency === 'daily'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                    onClick={() => setFrequency('daily')}
                  >
                    <RadioGroupItem value="daily" id="daily" className="sr-only" />
                    <div className="flex items-center gap-2 mb-2">
                      <CalendarIcon className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-900">Daily</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Delivery every day
                    </p>
                  </Card>
                  <Card
                    className={`p-4 cursor-pointer transition-all ${
                      frequency === 'alternate'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                    onClick={() => setFrequency('alternate')}
                  >
                    <RadioGroupItem
                      value="alternate"
                      id="alternate"
                      className="sr-only"
                    />
                    <div className="flex items-center gap-2 mb-2">
                      <Repeat className="w-5 h-5 text-purple-500" />
                      <span className="text-gray-900">Alternate Days</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Every other day
                    </p>
                  </Card>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {/* Step 3: Milk Configuration */}
        {step === 'milk' && (
          <div className="space-y-6">
            <div>
              <Label className="mb-3 block">Milk Type Selection</Label>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="cow"
                    checked={cowMilk}
                    onCheckedChange={(checked) => setCowMilk(checked as boolean)}
                  />
                  <label htmlFor="cow" className="text-sm cursor-pointer">
                    🐄 Cow Milk
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="buffalo"
                    checked={buffaloMilk}
                    onCheckedChange={(checked) =>
                      setBuffaloMilk(checked as boolean)
                    }
                  />
                  <label htmlFor="buffalo" className="text-sm cursor-pointer">
                    🐃 Buffalo Milk
                  </label>
                </div>
              </div>
            </div>

            {cowMilk && (
              <Card className="p-4 border-blue-100 bg-blue-50">
                <h4 className="text-sm mb-3 text-gray-900">🐄 Cow Milk Details</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cowQty">Quantity (Liters)</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setCowQty(Math.max(0, cowQty - 0.5))}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <Input
                        id="cowQty"
                        type="number"
                        value={cowQty}
                        onChange={(e) => setCowQty(parseFloat(e.target.value))}
                        className="text-center"
                        step="0.5"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setCowQty(cowQty + 0.5)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {[0.5, 1, 2, 3].map((qty) => (
                        <Button
                          key={qty}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setCowQty(qty)}
                        >
                          {qty}L
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cowRate">Rate per Liter (₹)</Label>
                    <Input
                      id="cowRate"
                      type="number"
                      value={cowRate}
                      onChange={(e) => setCowRate(parseFloat(e.target.value))}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Default: ₹60/L</p>
                  </div>

                  <div>
                    <Label htmlFor="cowCoupon">Coupon Code (Optional)</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="cowCoupon"
                        value={cowCoupon}
                        onChange={(e) => setCowCoupon(e.target.value)}
                        placeholder="Enter coupon"
                      />
                      <Button type="button" variant="outline">
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {buffaloMilk && (
              <Card className="p-4 border-purple-100 bg-purple-50">
                <h4 className="text-sm mb-3 text-gray-900">
                  🐃 Buffalo Milk Details
                </h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="buffaloQty">Quantity (Liters)</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setBuffaloQty(Math.max(0, buffaloQty - 0.5))}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <Input
                        id="buffaloQty"
                        type="number"
                        value={buffaloQty}
                        onChange={(e) => setBuffaloQty(parseFloat(e.target.value))}
                        className="text-center"
                        step="0.5"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setBuffaloQty(buffaloQty + 0.5)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {[0.5, 1, 2, 3].map((qty) => (
                        <Button
                          key={qty}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setBuffaloQty(qty)}
                        >
                          {qty}L
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="buffaloRate">Rate per Liter (₹)</Label>
                    <Input
                      id="buffaloRate"
                      type="number"
                      value={buffaloRate}
                      onChange={(e) => setBuffaloRate(parseFloat(e.target.value))}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Default: ₹80/L</p>
                  </div>

                  <div>
                    <Label htmlFor="buffaloCoupon">Coupon Code (Optional)</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="buffaloCoupon"
                        value={buffaloCoupon}
                        onChange={(e) => setBuffaloCoupon(e.target.value)}
                        placeholder="Enter coupon"
                      />
                      <Button type="button" variant="outline">
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {frequency === 'alternate' && (
              <Card className="p-4 border-gray-200 bg-gray-50">
                <h4 className="text-sm mb-3 text-gray-900">
                  Alternate Day Quantities
                </h4>
                <p className="text-xs text-gray-500 mb-3">
                  Specify quantities for alternate delivery days
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {cowMilk && (
                    <div>
                      <Label htmlFor="altCowQty">Alt. Cow Milk (L)</Label>
                      <Input
                        id="altCowQty"
                        type="number"
                        value={altCowQty}
                        onChange={(e) => setAltCowQty(parseFloat(e.target.value))}
                        className="mt-1"
                        step="0.5"
                      />
                    </div>
                  )}
                  {buffaloMilk && (
                    <div>
                      <Label htmlFor="altBuffaloQty">Alt. Buffalo Milk (L)</Label>
                      <Input
                        id="altBuffaloQty"
                        type="number"
                        value={altBuffaloQty}
                        onChange={(e) =>
                          setAltBuffaloQty(parseFloat(e.target.value))
                        }
                        className="mt-1"
                        step="0.5"
                      />
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Step 4: Summary */}
        {step === 'summary' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Subscription Period</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label htmlFor="startDate" className="text-xs text-gray-500">
                      Start Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? (
                            format(startDate, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="endDate" className="text-xs text-gray-500">
                      End Date (Optional)
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left"
                          disabled={noEndDate}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? (
                            format(endDate, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <div className="flex items-center space-x-2 mt-2">
                      <Checkbox
                        id="noEndDate"
                        checked={noEndDate}
                        onCheckedChange={(checked) =>
                          setNoEndDate(checked as boolean)
                        }
                      />
                      <label htmlFor="noEndDate" className="text-xs cursor-pointer">
                        No end date
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <h4 className="text-sm text-gray-900">Cost Breakdown</h4>
                </div>
                <div className="space-y-2">
                  {cowMilk && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Cow Milk: {cowQty}L × ₹{cowRate}
                      </span>
                      <span className="text-gray-900">
                        ₹{cowQty * cowRate}
                      </span>
                    </div>
                  )}
                  {buffaloMilk && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Buffalo Milk: {buffaloQty}L × ₹{buffaloRate}
                      </span>
                      <span className="text-gray-900">
                        ₹{buffaloQty * buffaloRate}
                      </span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-gray-700">Daily Total</span>
                    <span className="text-lg text-gray-900">
                      ₹{calculateDaily()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">
                      Monthly Estimate (30 days)
                    </span>
                    <span className="text-sm text-gray-700">
                      ₹{calculateMonthly()}
                    </span>
                  </div>
                </div>
              </Card>

              <div className="space-y-2">
                <Label className="text-sm">Additional Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sendSMS"
                      checked={sendSMS}
                      onCheckedChange={(checked) => setSendSMS(checked as boolean)}
                    />
                    <label htmlFor="sendSMS" className="text-sm cursor-pointer">
                      Send confirmation SMS to customer
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sendWhatsApp"
                      checked={sendWhatsApp}
                      onCheckedChange={(checked) =>
                        setSendWhatsApp(checked as boolean)
                      }
                    />
                    <label htmlFor="sendWhatsApp" className="text-sm cursor-pointer">
                      Send confirmation WhatsApp message
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <div className="flex justify-between w-full">
            <div>
              {step !== 'customer' && (
                <Button type="button" variant="outline" onClick={handleBack}>
                  Back
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              {step === 'summary' ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSubmit}
                  >
                    Save as Draft
                  </Button>
                  <Button type="button" onClick={handleSubmit}>
                    Create Subscription
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={step === 'customer' && !selectedCustomer}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
