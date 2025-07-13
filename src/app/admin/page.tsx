import { getDatabase } from '@/lib/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SevaBooking {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  selected_pooja_ids: string;
  pan_number?: string;
  donation_amount: number;
  total_pooja_price: number;
  created_at: string;
}

interface MembershipApplication {
  id: number;
  first_name: string;
  middle_name?: string;
  surname: string;
  gender: string;
  postal_address: string;
  pin_code: string;
  mobile_no: string;
  email: string;
  date_of_birth: string;
  occupation: string;
  qualification: string;
  marital_status: string;
  num_children?: number;
  gotra: string;
  kuladevata: string;
  math: string;
  native_place: string;
  other_gsb_institutions?: string;
  membership_type: string;
  introducer_name?: string;
  declaration: number;
  created_at: string;
}

async function getSevaBookings(): Promise<SevaBooking[]> {
  try {
    const db = await getDatabase();
    const rows = await db.all('SELECT * FROM seva_bookings ORDER BY created_at DESC');
    return rows as SevaBooking[];
  } catch (error) {
    console.error('Error fetching seva bookings:', error);
    return [];
  }
}

async function getMembershipApplications(): Promise<MembershipApplication[]> {
  try {
    const db = await getDatabase();
    const rows = await db.all('SELECT * FROM membership_applications ORDER BY created_at DESC');
    return rows as MembershipApplication[];
  } catch (error) {
    console.error('Error fetching membership applications:', error);
    return [];
  }
}

export default async function AdminPage() {
  const sevaBookings = await getSevaBookings();
  const membershipApplications = await getMembershipApplications();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid gap-8">
        {/* Seva Bookings Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Seva Bookings ({sevaBookings.length})</h2>
          <div className="grid gap-4">
            {sevaBookings.length > 0 ? (
              sevaBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {booking.first_name} {booking.last_name}
                    </CardTitle>
                    <CardDescription>
                      Submitted on: {new Date(booking.created_at).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Email:</strong> {booking.email}
                      </div>
                      <div>
                        <strong>Phone:</strong> {booking.phone}
                      </div>
                      <div className="md:col-span-2">
                        <strong>Address:</strong> {booking.address}
                      </div>
                      <div>
                        <strong>Selected Poojas:</strong> {booking.selected_pooja_ids}
                      </div>
                      <div>
                        <strong>PAN:</strong> {booking.pan_number || 'Not provided'}
                      </div>
                      <div>
                        <strong>Donation:</strong> ₹{booking.donation_amount}
                      </div>
                      <div>
                        <strong>Total Price:</strong> ₹{booking.total_pooja_price}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground">No seva bookings submitted yet.</p>
            )}
          </div>
        </div>

        {/* Membership Applications Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Membership Applications ({membershipApplications.length})</h2>
          <div className="grid gap-4">
            {membershipApplications.length > 0 ? (
              membershipApplications.map((application) => (
                <Card key={application.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {application.first_name} {application.middle_name} {application.surname}
                    </CardTitle>
                    <CardDescription>
                      Submitted on: {new Date(application.created_at).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <strong>Gender:</strong> {application.gender}
                      </div>
                      <div>
                        <strong>Email:</strong> {application.email}
                      </div>
                      <div>
                        <strong>Mobile:</strong> {application.mobile_no}
                      </div>
                      <div>
                        <strong>DOB:</strong> {application.date_of_birth}
                      </div>
                      <div>
                        <strong>Occupation:</strong> {application.occupation}
                      </div>
                      <div>
                        <strong>Qualification:</strong> {application.qualification}
                      </div>
                      <div>
                        <strong>Marital Status:</strong> {application.marital_status}
                      </div>
                      <div>
                        <strong>Children:</strong> {application.num_children || 'N/A'}
                      </div>
                      <div>
                        <strong>Gotra:</strong> {application.gotra}
                      </div>
                      <div>
                        <strong>Kuladevata:</strong> {application.kuladevata}
                      </div>
                      <div>
                        <strong>Math:</strong> {application.math}
                      </div>
                      <div>
                        <strong>Native Place:</strong> {application.native_place}
                      </div>
                      <div className="md:col-span-2 lg:col-span-3">
                        <strong>Address:</strong> {application.postal_address}, {application.pin_code}
                      </div>
                      <div className="flex items-center gap-2">
                        <strong>Membership Type:</strong> 
                        <Badge variant={application.membership_type === 'Life' ? 'default' : 'secondary'}>
                          {application.membership_type}
                        </Badge>
                      </div>
                      {application.introducer_name && (
                        <div>
                          <strong>Introducer:</strong> {application.introducer_name}
                        </div>
                      )}
                      {application.other_gsb_institutions && (
                        <div className="md:col-span-2 lg:col-span-3">
                          <strong>Other GSB Institutions:</strong> {application.other_gsb_institutions}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground">No membership applications submitted yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}