
'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface PoojaOption {
  id: number;
  name: string;
  price: number;
}

const poojaOptions: PoojaOption[] = [
  { id: 1, name: 'Archana', price: 101 },
  { id: 2, name: 'Abhishekam', price: 501 },
  { id: 3, name: 'Homam', price: 1001 },
  { id: 4, name: 'Satyanarayana Pooja', price: 1501 },
];

export default function SevaBookingPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedPoojaIds, setSelectedPoojaIds] = useState<number[]>([]);
  const [panNumber, setPanNumber] = useState('');
  const [donationAmount, setDonationAmount] = useState('');


  const handlePoojaSelection = (poojaId: number) => {
    if (selectedPoojaIds.includes(poojaId)) {
      setSelectedPoojaIds(selectedPoojaIds.filter((id) => id !== poojaId));
    } else {
      setSelectedPoojaIds([...selectedPoojaIds, poojaId]);
    }
  };

  const totalPoojaPrice = selectedPoojaIds.reduce((total, poojaId) => {
    const pooja = poojaOptions.find((option) => option.id === poojaId);
    return total + (pooja ? pooja.price : 0);
  }, 0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      firstName,
      lastName,
      email,
      phone,
      address,
      selectedPoojaIds,
      panNumber,
      donationAmount,
      totalPoojaPrice,
    });
    // Placeholder for actual submission
    alert('Booking submitted (this is a placeholder). Check console for data.');
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Seva / Pooja Booking & Donations</CardTitle>
          <CardDescription>
            Book various sevas and poojas offered by the Mandal or make a general donation. 
            Please fill in your details carefully. For any assistance, contact the Mandal office.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName" className="font-medium">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  placeholder="Enter your first name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="font-medium">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  placeholder="Enter your last name"
                  className="mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email" className="font-medium">Email ID</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="font-medium">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="e.g., 9876543210"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="address" className="font-medium">Full Address</Label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Enter your complete postal address"
                rows={3}
                className="mt-1"
              />
            </div>

            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Select Pooja/Seva</CardTitle>
                <CardDescription>Choose one or more sevas you wish to book.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {poojaOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent/10 transition-colors">
                      <Checkbox
                        id={`pooja-${option.id}`}
                        checked={selectedPoojaIds.includes(option.id)}
                        onCheckedChange={() => handlePoojaSelection(option.id)}
                        className="h-5 w-5"
                      />
                      <Label htmlFor={`pooja-${option.id}`} className="text-sm font-normal flex-grow cursor-pointer">
                        {option.name} - <span className="font-medium text-primary">₹{option.price.toFixed(2)}</span>
                      </Label>
                    </div>
                  ))}
                </div>
                {selectedPoojaIds.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <Label className="text-lg font-semibold text-primary">Total Pooja Amount: ₹{totalPoojaPrice.toFixed(2)}</Label>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-xl text-primary">General Donation (Optional)</CardTitle>
                <CardDescription>If you wish to make a general donation, please enter the amount below.</CardDescription>
              </CardHeader>
              <CardContent>
                <Label htmlFor="donationAmount" className="font-medium">Donation Amount (₹)</Label>
                <Input
                  id="donationAmount"
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  placeholder="e.g., 501"
                  className="mt-1"
                  min="0"
                />
              </CardContent>
            </Card>
            
            <div>
              <Label htmlFor="panNumber" className="font-medium">PAN Card Number (Required for donations above ₹2000 for 80G benefits)</Label>
              <Input
                id="panNumber"
                type="text"
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value)}
                placeholder="Enter your PAN number"
                className="mt-1"
                pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                title="Please enter a valid PAN number (e.g., ABCDE1234F)"
              />
               <p className="text-xs text-muted-foreground mt-1">
                Please provide your PAN for donations to avail tax benefits under section 80G of the Income Tax Act.
              </p>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Proceed to Payment (Placeholder)
            </Button>
            
            <CardFooter className="text-sm text-muted-foreground pt-6">
              <p>
                <strong>Note:</strong> After submission, you will be guided to the payment gateway. This is a placeholder form, and no actual payment will be processed. 
                All contributions are greatly appreciated and will be used for Mandal activities and community welfare. 
                For official receipts and 80G certificate (if applicable), please ensure your contact details and PAN are correct.
              </p>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
