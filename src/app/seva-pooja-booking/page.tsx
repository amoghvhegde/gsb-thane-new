'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface PoojaOption {
  id: number;
  name: string;
  price: number;
}

const poojaOptions: PoojaOption[] = [
  { id: 1, name: 'Archana', price: 10 },
  { id: 2, name: 'Abhishekam', price: 50 },
  { id: 3, name: 'Homam', price: 100 },
  { id: 4, name: 'Satyanarayana Pooja', price: 150 },
];

export default function SevaBookingPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedPoojaIds, setSelectedPoojaIds] = useState<number[]>([]);
  const [panNumber, setPanNumber] = useState('');

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
    });
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Seva/Pooja Booking</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="email">Email ID</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="poojaOptions">Select Pooja/Seva</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {poojaOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`pooja-${option.id}`}
                  checked={selectedPoojaIds.includes(option.id)}
                  onCheckedChange={() => handlePoojaSelection(option.id)}
                />
                <label htmlFor={`pooja-${option.id}`}>
                  {option.name} - ${option.price.toFixed(2)}
                </label>
              </div>
            ))}
          </div>
          {selectedPoojaIds.length > 0 && (
            <div className="mt-4 text-lg font-semibold">
              Total Price: ${totalPoojaPrice.toFixed(2)}
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="panNumber">PAN Card Number</Label>
          <Input
            id="panNumber"
            type="text"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value)}
          />
        </div>

        <Button type="submit">Book Seva/Pooja</Button>
      </form>
    </div>
  );
}