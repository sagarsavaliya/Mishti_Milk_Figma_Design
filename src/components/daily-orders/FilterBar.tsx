import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search } from 'lucide-react';

interface FilterBarProps {
  filters: {
    search: string;
    shift: string;
    milkType: string;
    deliveryBoy: string;
    route: string;
  };
  setFilters: (filters: any) => void;
}

export function FilterBar({ filters, setFilters }: FilterBarProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by customer name..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="pl-10"
          />
        </div>

        {/* Shift Filter */}
        <Select value={filters.shift} onValueChange={(value) => setFilters({ ...filters, shift: value })}>
          <SelectTrigger className="w-full lg:w-[160px]">
            <SelectValue placeholder="Shift" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Shifts</SelectItem>
            <SelectItem value="Morning">Morning</SelectItem>
            <SelectItem value="Evening">Evening</SelectItem>
          </SelectContent>
        </Select>

        {/* Milk Type Filter */}
        <Select value={filters.milkType} onValueChange={(value) => setFilters({ ...filters, milkType: value })}>
          <SelectTrigger className="w-full lg:w-[160px]">
            <SelectValue placeholder="Milk Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Cow">Cow</SelectItem>
            <SelectItem value="Buffalo">Buffalo</SelectItem>
          </SelectContent>
        </Select>

        {/* Delivery Boy Filter */}
        <Select value={filters.deliveryBoy} onValueChange={(value) => setFilters({ ...filters, deliveryBoy: value })}>
          <SelectTrigger className="w-full lg:w-[160px]">
            <SelectValue placeholder="Delivery Boy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Delivery Boys</SelectItem>
            <SelectItem value="Amit Singh">Amit Singh</SelectItem>
            <SelectItem value="Vikram Rao">Vikram Rao</SelectItem>
            <SelectItem value="Rahul Verma">Rahul Verma</SelectItem>
          </SelectContent>
        </Select>

        {/* Route Filter */}
        <Select value={filters.route} onValueChange={(value) => setFilters({ ...filters, route: value })}>
          <SelectTrigger className="w-full lg:w-[160px]">
            <SelectValue placeholder="Route" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Routes</SelectItem>
            <SelectItem value="Route A">Route A</SelectItem>
            <SelectItem value="Route B">Route B</SelectItem>
            <SelectItem value="Route C">Route C</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
