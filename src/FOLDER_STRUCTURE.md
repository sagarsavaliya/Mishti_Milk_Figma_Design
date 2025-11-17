# Misti Milk - 360 Project Structure

## 📁 Organized Component Architecture

```
/components
├── 📂 layout/                    # Shared layout components
│   ├── Navbar.tsx               # Top navigation bar with shift toggle
│   ├── Sidebar.tsx              # Left sidebar navigation
│   └── index.ts                 # Export barrel file
│
├── 📂 dashboard/                 # Dashboard page and components
│   ├── DashboardPage.tsx        # Main dashboard page
│   ├── StatCards.tsx            # Dashboard statistics cards
│   ├── DeliveryTables.tsx       # Current deliveries & routes tables
│   ├── SubscriptionTables.tsx   # Subscription & pending dues tables
│   └── index.ts                 # Export barrel file
│
├── 📂 customers/                 # Customers page and related components
│   ├── CustomersPage.tsx        # Main customers page
│   ├── CustomerMetrics.tsx      # Customer analytics tiles
│   ├── CustomerTable.tsx        # Customers data table
│   ├── AddCustomerModal.tsx     # Add/Edit customer modal
│   ├── CustomerDetailsModal.tsx # View customer details modal
│   └── index.ts                 # Export barrel file
│
├── 📂 subscriptions/             # Subscriptions page and components
│   ├── SubscriptionsPage.tsx    # Main subscriptions page
│   ├── SubscriptionMetrics.tsx  # Subscription analytics tiles
│   ├── SubscriptionList.tsx     # List view of subscriptions
│   ├── SubscriptionGrid.tsx     # Grid view of subscriptions
│   ├── AddSubscriptionModal.tsx # Add subscription modal
│   ├── SubscriptionFilters.tsx  # Filter components
│   └── index.ts                 # Export barrel file
│
├── 📂 daily-orders/              # Daily orders page and components
│   ├── DailyOrdersPage.tsx      # Main daily orders page
│   ├── StatsGrid.tsx            # Order statistics grid
│   ├── FilterBar.tsx            # Order filters bar
│   ├── OrdersTable.tsx          # Orders data table
│   ├── CreateDeliveryLogModal.tsx # Create delivery log modal
│   └── index.ts                 # Export barrel file
│
├── 📂 ui/                        # Shadcn UI components
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── table.tsx
│   └── ... (other UI components)
│
└── 📂 figma/                     # Figma integration components
    └── ImageWithFallback.tsx

/styles
└── globals.css                   # Global styles and Tailwind config

/App.tsx                          # Main application entry point
```

## 🎯 Key Features of This Structure

### ✅ **Feature-Based Organization**
- Each major feature (dashboard, customers, subscriptions, daily-orders) has its own folder
- All related components are grouped together
- Easy to locate and maintain feature-specific code

### ✅ **Shared Components**
- `layout/` - Contains Navbar and Sidebar used across all pages
- `ui/` - Reusable Shadcn UI components
- `figma/` - Protected Figma integration components

### ✅ **Clean Imports**
- Each feature folder has an `index.ts` barrel file
- Enables clean imports like: `import { DashboardPage } from './components/dashboard'`
- Reduces import statement clutter

### ✅ **Scalability**
- Easy to add new features by creating new feature folders
- Clear separation of concerns
- Follows industry best practices

### ✅ **Maintainability**
- Related files are co-located
- Easy to understand project structure at a glance
- Clear naming conventions

## 📦 Import Examples

```typescript
// Clean imports using barrel files
import { Navbar, Sidebar } from './components/layout';
import { DashboardPage } from './components/dashboard';
import { CustomersPage } from './components/customers';
import { SubscriptionsPage } from './components/subscriptions';
import { DailyOrdersPage } from './components/daily-orders';

// UI components
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
```

## 🚀 Pages Structure

1. **Dashboard** - Overview with stats, deliveries, and subscriptions
2. **Customers** - Customer management with search, filters, and modals
3. **Subscriptions** - Subscription management with list/grid views
4. **Daily Orders** - Order logging with dynamic customer selection

## 📝 Notes

- All page components are located in their respective feature folders
- UI components from Shadcn are in the `ui/` folder
- Layout components (Navbar, Sidebar) are shared across all pages
- Each feature is self-contained and independent
