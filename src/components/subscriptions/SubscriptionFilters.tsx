import { Button } from '../ui/button';
import { Sun, Moon, Sunrise } from 'lucide-react';
import type { StatusFilter, ShiftFilter, MilkTypeFilter } from '../SubscriptionsPage';

interface SubscriptionFiltersProps {
  statusFilter: StatusFilter;
  shiftFilter: ShiftFilter;
  milkTypeFilter: MilkTypeFilter;
  onStatusChange: (filter: StatusFilter) => void;
  onShiftChange: (filter: ShiftFilter) => void;
  onMilkTypeChange: (filter: MilkTypeFilter) => void;
}

export function SubscriptionFilters({
  statusFilter,
  shiftFilter,
  milkTypeFilter,
  onStatusChange,
  onShiftChange,
  onMilkTypeChange,
}: SubscriptionFiltersProps) {
  return (
    <div className="mt-4 space-y-3">
      {/* Status Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-gray-500 uppercase tracking-wide">Status:</span>
        <Button
          variant={statusFilter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onStatusChange('all')}
        >
          All
        </Button>
        <Button
          variant={statusFilter === 'active' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onStatusChange('active')}
          className={statusFilter === 'active' ? 'bg-green-600 hover:bg-green-700' : ''}
        >
          Active
        </Button>
        <Button
          variant={statusFilter === 'paused' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onStatusChange('paused')}
          className={statusFilter === 'paused' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
        >
          Paused
        </Button>
        <Button
          variant={statusFilter === 'inactive' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onStatusChange('inactive')}
          className={statusFilter === 'inactive' ? 'bg-gray-600 hover:bg-gray-700' : ''}
        >
          Inactive
        </Button>
      </div>

      {/* Shift & Milk Type Filters */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Shift Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Shift:</span>
          <div className="flex gap-1">
            <Button
              variant={shiftFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onShiftChange('all')}
            >
              All
            </Button>
            <Button
              variant={shiftFilter === 'morning' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onShiftChange('morning')}
              className="gap-1"
            >
              <Sun className="w-3 h-3" />
              Morning
            </Button>
            <Button
              variant={shiftFilter === 'evening' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onShiftChange('evening')}
              className="gap-1"
            >
              <Moon className="w-3 h-3" />
              Evening
            </Button>
            <Button
              variant={shiftFilter === 'both' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onShiftChange('both')}
              className="gap-1"
            >
              <Sunrise className="w-3 h-3" />
              Both
            </Button>
          </div>
        </div>

        {/* Milk Type Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Milk Type:</span>
          <div className="flex gap-1">
            <Button
              variant={milkTypeFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onMilkTypeChange('all')}
            >
              All
            </Button>
            <Button
              variant={milkTypeFilter === 'cow' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onMilkTypeChange('cow')}
            >
              🐄 Cow
            </Button>
            <Button
              variant={milkTypeFilter === 'buffalo' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onMilkTypeChange('buffalo')}
            >
              🐃 Buffalo
            </Button>
            <Button
              variant={milkTypeFilter === 'both' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onMilkTypeChange('both')}
            >
              Both
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
