import { useState } from 'react';
import { Plus, Search, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { CustomerMetrics } from './CustomerMetrics';
import { CustomerTable } from './CustomerTable';
import { AddCustomerModal } from './AddCustomerModal';
import { CustomerDetailsModal } from './CustomerDetailsModal';

export function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [routeFilter, setRouteFilter] = useState('all');
  const [milkTypeFilter, setMilkTypeFilter] = useState('all');
  const [shiftFilter, setShiftFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [editCustomer, setEditCustomer] = useState<any>(null);

  const handleClearFilters = () => {
    setSearchQuery('');
    setRouteFilter('all');
    setMilkTypeFilter('all');
    setShiftFilter('all');
    setStatusFilter('all');
  };

  const handleCustomerClick = (customer: any) => {
    setSelectedCustomer(customer);
    setIsDetailsModalOpen(true);
  };

  const handleEditCustomer = (customer: any) => {
    setEditCustomer(customer);
    setIsAddModalOpen(true);
  };

  const handleEditFromDetails = () => {
    setEditCustomer(selectedCustomer);
    setIsDetailsModalOpen(false);
    setIsAddModalOpen(true);
  };

  const totalCustomers = 245;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl text-gray-900">Customers</h1>
            <Badge variant="secondary" className="text-sm">
              {totalCustomers}
            </Badge>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Manage your dairy customers
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          New Customer
        </Button>
      </div>

      {/* Search & Filter Row */}
      <div className="bg-white rounded-lg border border-gray-200 p-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar */}
          <div className="relative w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by name, contact, address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Route Filter */}
          <Select value={routeFilter} onValueChange={setRouteFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Route" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Routes</SelectItem>
              <SelectItem value="Route A">Route A</SelectItem>
              <SelectItem value="Route B">Route B</SelectItem>
              <SelectItem value="Route C">Route C</SelectItem>
              <SelectItem value="Route D">Route D</SelectItem>
            </SelectContent>
          </Select>

          {/* Milk Type Filter */}
          <Select value={milkTypeFilter} onValueChange={setMilkTypeFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Milk Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="cow">Cow</SelectItem>
              <SelectItem value="buffalo">Buffalo</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>

          {/* Shift Filter */}
          <Select value={shiftFilter} onValueChange={setShiftFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Shift" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Shifts</SelectItem>
              <SelectItem value="morning">Morning</SelectItem>
              <SelectItem value="evening">Evening</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="vacation">On Vacation</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear All Button */}
          {(searchQuery ||
            routeFilter !== 'all' ||
            milkTypeFilter !== 'all' ||
            shiftFilter !== 'all' ||
            statusFilter !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="gap-2 ml-auto"
            >
              <X className="w-4 h-4" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Analytics Tiles */}
      <CustomerMetrics />

      {/* Customers Table */}
      <CustomerTable
        searchQuery={searchQuery}
        routeFilter={routeFilter}
        shiftFilter={shiftFilter}
        milkTypeFilter={milkTypeFilter}
        statusFilter={statusFilter}
        onCustomerClick={handleCustomerClick}
        onEditCustomer={handleEditCustomer}
      />

      {/* Add/Edit Customer Modal */}
      <AddCustomerModal
        open={isAddModalOpen}
        onOpenChange={(open) => {
          setIsAddModalOpen(open);
          if (!open) setEditCustomer(null);
        }}
        editData={editCustomer}
      />

      {/* Customer Details Modal */}
      <CustomerDetailsModal
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        customer={selectedCustomer}
        onEdit={handleEditFromDetails}
      />
    </div>
  );
}
