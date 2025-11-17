import { useState } from 'react';
import { Plus, Search, LayoutGrid, List } from 'lucide-react';
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
import { SubscriptionMetrics } from './SubscriptionMetrics';
import { SubscriptionList } from './SubscriptionList';
import { SubscriptionGrid } from './SubscriptionGrid';
import { AddSubscriptionModal } from './AddSubscriptionModal';

export type ViewMode = 'list' | 'grid';
export type StatusFilter = 'all' | 'active' | 'paused' | 'inactive';
export type ShiftFilter = 'all' | 'morning' | 'evening' | 'both';
export type MilkTypeFilter = 'all' | 'cow' | 'buffalo' | 'both';

export function SubscriptionsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [shiftFilter, setShiftFilter] = useState<ShiftFilter>('all');
  const [milkTypeFilter, setMilkTypeFilter] = useState<MilkTypeFilter>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<number[]>([]);

  const totalSubscriptions = 255;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl text-gray-900">Subscriptions</h1>
            <Badge variant="secondary" className="text-sm">
              {totalSubscriptions}
            </Badge>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Manage customer milk delivery subscriptions
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Subscription
        </Button>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar */}
          <div className="relative w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by customer name, contact..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={(v: StatusFilter) => setStatusFilter(v)}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          {/* Shift Filter */}
          <Select value={shiftFilter} onValueChange={(v: ShiftFilter) => setShiftFilter(v)}>
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

          {/* Milk Type Filter */}
          <Select value={milkTypeFilter} onValueChange={(v: MilkTypeFilter) => setMilkTypeFilter(v)}>
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

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg ml-auto">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="gap-2"
            >
              <List className="w-4 h-4" />
              List
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="gap-2"
            >
              <LayoutGrid className="w-4 h-4" />
              Grid
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Metrics */}
      <SubscriptionMetrics />

      {/* Bulk Actions Bar */}
      {selectedSubscriptions.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
          <p className="text-sm text-blue-900">
            {selectedSubscriptions.length} subscription(s) selected
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Pause Selected
            </Button>
            <Button variant="outline" size="sm">
              Resume Selected
            </Button>
            <Button variant="outline" size="sm">
              Export CSV
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedSubscriptions([])}
            >
              Clear
            </Button>
          </div>
        </div>
      )}

      {/* Subscription List/Grid */}
      {viewMode === 'list' ? (
        <SubscriptionList
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          shiftFilter={shiftFilter}
          milkTypeFilter={milkTypeFilter}
          selectedIds={selectedSubscriptions}
          onSelectionChange={setSelectedSubscriptions}
        />
      ) : (
        <SubscriptionGrid
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          shiftFilter={shiftFilter}
          milkTypeFilter={milkTypeFilter}
          selectedIds={selectedSubscriptions}
          onSelectionChange={setSelectedSubscriptions}
        />
      )}

      {/* Add Subscription Modal */}
      <AddSubscriptionModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
      />
    </div>
  );
}
