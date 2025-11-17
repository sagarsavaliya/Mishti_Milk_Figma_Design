import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

interface AddCustomerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editData?: any;
}

export function AddCustomerModal({
  open,
  onOpenChange,
  editData,
}: AddCustomerModalProps) {
  const [formData, setFormData] = useState({
    firstName: editData?.firstName || '',
    lastName: editData?.lastName || '',
    primaryContact: editData?.contact || '',
    secondaryContact: editData?.secondaryContact || '',
    email: '',
    address: editData?.address || '',
    city: '',
    zip: editData?.zip || '',
    route: editData?.route || '',
    shift: editData?.shift || '',
    milkType: editData?.milkType || 'cow',
    remarks: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form data:', formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editData ? 'Edit Customer' : 'New Customer'}
          </DialogTitle>
          <DialogDescription>
            {editData ? 'Update customer information below.' : 'Fill in the customer details below to add a new customer.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: First Name | Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
          </div>

          {/* Row 2: Primary Contact | Secondary Contact */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryContact">
                Primary Contact <span className="text-red-500">*</span>
              </Label>
              <Input
                id="primaryContact"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.primaryContact}
                onChange={(e) =>
                  setFormData({ ...formData, primaryContact: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryContact">Secondary Contact</Label>
              <Input
                id="secondaryContact"
                type="tel"
                placeholder="+91 98765 43211"
                value={formData.secondaryContact}
                onChange={(e) =>
                  setFormData({ ...formData, secondaryContact: e.target.value })
                }
              />
            </div>
          </div>

          {/* Row 3: Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="customer@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Row 4: Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              placeholder="Enter full address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              rows={2}
            />
          </div>

          {/* Row 5: Location/City | Zip Code */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">Location/City</Label>
              <Input
                id="city"
                placeholder="e.g., Bangalore"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">Zip Code</Label>
              <Input
                id="zip"
                placeholder="560001"
                value={formData.zip}
                onChange={(e) =>
                  setFormData({ ...formData, zip: e.target.value })
                }
              />
            </div>
          </div>

          {/* Row 6: Route | Preferred Shift */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="route">
                Route <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.route}
                onValueChange={(value) =>
                  setFormData({ ...formData, route: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select route" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Route A">Route A</SelectItem>
                  <SelectItem value="Route B">Route B</SelectItem>
                  <SelectItem value="Route C">Route C</SelectItem>
                  <SelectItem value="Route D">Route D</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="shift">
                Preferred Shift <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.shift}
                onValueChange={(value) =>
                  setFormData({ ...formData, shift: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 7: Preferred Milk Type */}
          <div className="space-y-2">
            <Label>
              Preferred Milk Type <span className="text-red-500">*</span>
            </Label>
            <RadioGroup
              value={formData.milkType}
              onValueChange={(value) =>
                setFormData({ ...formData, milkType: value })
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cow" id="cow" />
                <Label htmlFor="cow" className="cursor-pointer">
                  🐄 Cow
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="buffalo" id="buffalo" />
                <Label htmlFor="buffalo" className="cursor-pointer">
                  🐃 Buffalo
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="both" />
                <Label htmlFor="both" className="cursor-pointer">
                  Both
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Row 8: Remarks/Notes */}
          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks/Notes</Label>
            <Textarea
              id="remarks"
              placeholder="Any additional notes..."
              value={formData.remarks}
              onChange={(e) =>
                setFormData({ ...formData, remarks: e.target.value })
              }
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editData ? 'Update Customer' : 'Save Customer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
