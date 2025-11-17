import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface Order {
  id: number;
  customerName: string;
  milkType: string;
  quantity: number;
  shift: string;
  routeName: string;
  deliveryBoy: string;
  orderAmount: number;
  paymentCollected: boolean;
  paymentAmount: number;
  notes: string;
}

interface OrdersTableProps {
  orders: Order[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Milk Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Shift</TableHead>
              <TableHead>Route Name</TableHead>
              <TableHead>Delivery Boy</TableHead>
              <TableHead>Order Amount</TableHead>
              <TableHead>Payment Collected?</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center text-gray-500 py-8">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="text-gray-900">{order.customerName}</TableCell>
                  <TableCell>
                    <Badge variant={order.milkType === 'Cow' ? 'secondary' : 'outline'}>
                      {order.milkType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-700">{order.quantity} Ltr</TableCell>
                  <TableCell>
                    <Badge variant={order.shift === 'Morning' ? 'default' : 'secondary'}>
                      {order.shift}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-700">{order.routeName}</TableCell>
                  <TableCell className="text-gray-700">{order.deliveryBoy}</TableCell>
                  <TableCell className="text-gray-900">₹{order.orderAmount}</TableCell>
                  <TableCell>
                    {order.paymentCollected ? (
                      <div className="space-y-1">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          Yes
                        </Badge>
                        <div className="text-sm text-gray-600">₹{order.paymentAmount}</div>
                      </div>
                    ) : (
                      <Badge variant="destructive">No</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {order.notes || '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
