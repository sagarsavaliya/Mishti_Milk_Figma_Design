import { Card } from '../ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

const deliveries = [
  { id: 1, name: 'Rajesh Kumar', cow: '2L', buffalo: '1L' },
  { id: 2, name: 'Priya Sharma', cow: '1L', buffalo: '2L' },
  { id: 3, name: 'Amit Patel', cow: '1.5L', buffalo: '0.5L' },
  { id: 4, name: 'Sneha Verma', cow: '1L', buffalo: '1L' },
  { id: 5, name: 'Rahul Singh', cow: '2L', buffalo: '0L' },
];

const routes = [
  { id: 1, name: 'Route A - North Zone', customers: 45, assignedTo: 'Mohan' },
  { id: 2, name: 'Route B - South Zone', customers: 38, assignedTo: 'Ramesh' },
  { id: 3, name: 'Route C - East Zone', customers: 52, assignedTo: 'Suresh' },
  { id: 4, name: 'Route D - West Zone', customers: 41, assignedTo: 'Dinesh' },
  { id: 5, name: 'Route E - Central Zone', customers: 35, assignedTo: 'Mahesh' },
];

export function DeliveryTables() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Current Deliveries */}
      <Card className="bg-white border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg text-gray-900">Current Deliveries</h2>
          <p className="text-sm text-gray-500">Today's active deliveries</p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Cow Qty</TableHead>
                <TableHead>Buffalo Qty</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell>{delivery.name}</TableCell>
                  <TableCell>{delivery.cow}</TableCell>
                  <TableCell>{delivery.buffalo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Routes Info */}
      <Card className="bg-white border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg text-gray-900">Routes Info</h2>
          <p className="text-sm text-gray-500">Delivery route assignments</p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Customers</TableHead>
                <TableHead>Assigned To</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {routes.map((route) => (
                <TableRow key={route.id}>
                  <TableCell>{route.name}</TableCell>
                  <TableCell>{route.customers}</TableCell>
                  <TableCell>{route.assignedTo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
