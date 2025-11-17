import { Edit, MoreVertical, MessageSquare } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  contact: string;
  hasWhatsApp: boolean;
  secondaryContact?: string;
  address: string;
  zip: string;
  route: string;
  shift: 'morning' | 'evening' | 'both';
  milkType: 'cow' | 'buffalo' | 'both';
  status: 'active' | 'inactive' | 'vacation';
}

const mockCustomers: Customer[] = [
  {
    id: 1,
    firstName: 'Rajesh',
    lastName: 'Kumar',
    contact: '+91 98765 43210',
    hasWhatsApp: true,
    secondaryContact: '+91 98765 43211',
    address: '123 MG Road, Koramangala',
    zip: '560034',
    route: 'Route A',
    shift: 'morning',
    milkType: 'cow',
    status: 'active',
  },
  {
    id: 2,
    firstName: 'Priya',
    lastName: 'Sharma',
    contact: '+91 98765 43220',
    hasWhatsApp: true,
    address: '456 HSR Layout, Sector 2',
    zip: '560102',
    route: 'Route B',
    shift: 'evening',
    milkType: 'buffalo',
    status: 'active',
  },
  {
    id: 3,
    firstName: 'Amit',
    lastName: 'Patel',
    contact: '+91 98765 43230',
    hasWhatsApp: false,
    secondaryContact: '+91 98765 43231',
    address: '789 Whitefield, EPIP Zone',
    zip: '560066',
    route: 'Route C',
    shift: 'both',
    milkType: 'both',
    status: 'vacation',
  },
  {
    id: 4,
    firstName: 'Sunita',
    lastName: 'Reddy',
    contact: '+91 98765 43240',
    hasWhatsApp: true,
    address: '321 Indiranagar, 100 Feet Road',
    zip: '560038',
    route: 'Route A',
    shift: 'morning',
    milkType: 'cow',
    status: 'active',
  },
  {
    id: 5,
    firstName: 'Vikram',
    lastName: 'Singh',
    contact: '+91 98765 43250',
    hasWhatsApp: true,
    secondaryContact: '+91 98765 43251',
    address: '654 Jayanagar, 4th Block',
    zip: '560011',
    route: 'Route B',
    shift: 'evening',
    milkType: 'both',
    status: 'inactive',
  },
];

interface CustomerTableProps {
  searchQuery: string;
  routeFilter: string;
  shiftFilter: string;
  milkTypeFilter: string;
  statusFilter: string;
  onCustomerClick: (customer: Customer) => void;
  onEditCustomer: (customer: Customer) => void;
}

export function CustomerTable({
  searchQuery,
  routeFilter,
  shiftFilter,
  milkTypeFilter,
  statusFilter,
  onCustomerClick,
  onEditCustomer,
}: CustomerTableProps) {
  const filteredCustomers = mockCustomers.filter((customer) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !customer.firstName.toLowerCase().includes(query) &&
        !customer.lastName.toLowerCase().includes(query) &&
        !customer.contact.includes(query) &&
        !customer.address.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    if (routeFilter !== 'all' && customer.route !== routeFilter) {
      return false;
    }

    if (shiftFilter !== 'all' && customer.shift !== shiftFilter) {
      return false;
    }

    if (milkTypeFilter !== 'all' && customer.milkType !== milkTypeFilter) {
      return false;
    }

    if (statusFilter !== 'all' && customer.status !== statusFilter) {
      return false;
    }

    return true;
  });

  const getShiftBadge = (shift: string) => {
    if (shift === 'morning') {
      return (
        <Badge variant="outline" className="text-xs">
          ☀️ Morning
        </Badge>
      );
    }
    if (shift === 'evening') {
      return (
        <Badge variant="outline" className="text-xs">
          🌙 Evening
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="text-xs">
        ⏰ Both
      </Badge>
    );
  };

  const getMilkTypeBadge = (milkType: string) => {
    if (milkType === 'cow') {
      return (
        <Badge variant="secondary" className="text-xs">
          🐄 Cow
        </Badge>
      );
    }
    if (milkType === 'buffalo') {
      return (
        <Badge variant="secondary" className="text-xs">
          🐃 Buffalo
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="text-xs">
        🐄🐃 Both
      </Badge>
    );
  };

  return (
    <Card className="bg-white border border-gray-200">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Secondary</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Zip</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Shift</TableHead>
              <TableHead>Milk Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow
                key={customer.id}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <TableCell
                  onClick={() => onCustomerClick(customer)}
                  className="font-medium"
                >
                  {customer.firstName}
                </TableCell>
                <TableCell onClick={() => onCustomerClick(customer)}>
                  {customer.lastName}
                </TableCell>
                <TableCell onClick={() => onCustomerClick(customer)}>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">{customer.contact}</span>
                    {customer.hasWhatsApp && (
                      <MessageSquare className="w-3 h-3 text-green-600" />
                    )}
                  </div>
                </TableCell>
                <TableCell onClick={() => onCustomerClick(customer)}>
                  <span className="text-sm text-gray-500">
                    {customer.secondaryContact || '—'}
                  </span>
                </TableCell>
                <TableCell onClick={() => onCustomerClick(customer)}>
                  <span className="text-sm truncate max-w-xs block">
                    {customer.address}
                  </span>
                </TableCell>
                <TableCell onClick={() => onCustomerClick(customer)}>
                  {customer.zip}
                </TableCell>
                <TableCell onClick={() => onCustomerClick(customer)}>
                  <Badge variant="outline" className="text-xs">
                    {customer.route}
                  </Badge>
                </TableCell>
                <TableCell onClick={() => onCustomerClick(customer)}>
                  {getShiftBadge(customer.shift)}
                </TableCell>
                <TableCell onClick={() => onCustomerClick(customer)}>
                  {getMilkTypeBadge(customer.milkType)}
                </TableCell>
                <TableCell>
                  {customer.status === 'vacation' ? (
                    <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700">
                      On Vacation
                    </Badge>
                  ) : (
                    <Switch
                      checked={customer.status === 'active'}
                      className="scale-75"
                    />
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0"
                      onClick={() => onEditCustomer(customer)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                          <MoreVertical className="w-3 h-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => onCustomerClick(customer)}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onEditCustomer(customer)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                        <DropdownMenuItem>View Bills</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Mark as Vacation</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Deactivate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Showing {filteredCustomers.length > 0 ? 1 : 0}-{filteredCustomers.length} of {filteredCustomers.length} customers
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}
