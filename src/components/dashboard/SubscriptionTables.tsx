import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Play, Pause, Edit, Bell } from 'lucide-react';

const subscriptions = [
  { id: 1, name: 'Rajesh Kumar', cow: '2L', buffalo: '1L', rate: '₹120', coupon: 'SAVE10', status: 'active', isPaused: false },
  { id: 2, name: 'Priya Sharma', cow: '1L', buffalo: '2L', rate: '₹150', coupon: '-', status: 'active', isPaused: false },
  { id: 3, name: 'Amit Patel', cow: '1.5L', buffalo: '0.5L', rate: '₹95', coupon: 'FRESH5', status: 'off', isPaused: true },
  { id: 4, name: 'Sneha Verma', cow: '1L', buffalo: '1L', rate: '₹110', coupon: '-', status: 'active', isPaused: false },
  { id: 5, name: 'Rahul Singh', cow: '2L', buffalo: '0L', rate: '₹80', coupon: 'LOYALTY', status: 'inactive', isPaused: false },
];

const pendingDues = [
  { id: 1, name: 'Deepak Mehta', dueSince: 'Oct 15, 2024', amount: '₹3,240', overdue: 22 },
  { id: 2, name: 'Kavita Joshi', dueSince: 'Sep 28, 2024', amount: '₹5,680', overdue: 39 },
  { id: 3, name: 'Sunil Rao', dueSince: 'Oct 20, 2024', amount: '₹2,120', overdue: 17 },
  { id: 4, name: 'Meena Desai', dueSince: 'Sep 10, 2024', amount: '₹8,940', overdue: 57 },
  { id: 5, name: 'Vikram Gupta', dueSince: 'Oct 25, 2024', amount: '₹1,850', overdue: 12 },
];

export function SubscriptionTables() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Subscriptions */}
      <Card className="bg-white border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg text-gray-900">Subscriptions</h2>
          <p className="text-sm text-gray-500">Manage customer subscriptions</p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Cow</TableHead>
                <TableHead>Buffalo</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Coupon</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>{sub.name}</TableCell>
                  <TableCell>{sub.cow}</TableCell>
                  <TableCell>{sub.buffalo}</TableCell>
                  <TableCell>{sub.rate}</TableCell>
                  <TableCell>
                    {sub.coupon !== '-' ? (
                      <Badge variant="secondary" className="text-xs">{sub.coupon}</Badge>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        sub.status === 'active' ? 'default' : 
                        sub.status === 'off' ? 'secondary' : 
                        'destructive'
                      }
                      className="text-xs"
                    >
                      {sub.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="h-8 w-8 p-0"
                      >
                        {sub.isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Switch checked={sub.status === 'active'} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Pending Dues */}
      <Card className="bg-white border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg text-gray-900">Pending Dues</h2>
          <p className="text-sm text-gray-500">Customers with outstanding payments</p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Due Since</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingDues.map((due) => (
                <TableRow key={due.id}>
                  <TableCell>{due.name}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{due.dueSince}</p>
                      <p className="text-xs text-red-600">{due.overdue} days overdue</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-red-600">{due.amount}</TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="gap-2"
                    >
                      <Bell className="w-4 h-4" />
                      Remind
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
