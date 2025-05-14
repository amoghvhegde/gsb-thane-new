import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const committeeMembers = [
  { name: "Shri. Anant Pai", role: "President", initials: "AP", imageHint: "formal portrait" },
  { name: "Smt. Lakshmi Kamath", role: "Vice President", initials: "LK", imageHint: "professional headshot" },
  { name: "Shri. Vinayak Shenoy", role: "Secretary", initials: "VS", imageHint: "smiling person" },
  { name: "Smt. Geeta Prabhu", role: "Treasurer", initials: "GP", imageHint: "community leader" },
  { name: "Shri. Mohan Nayak", role: "Member", initials: "MN", imageHint: "volunteer photo" },
  { name: "Smt. Rekha Bhat", role: "Member", initials: "RB", imageHint: "member portrait" },
];

export default function CommitteeMembersPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Our Committee Members</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">
            Meet the dedicated team working tirelessly to serve the GSB Mandal Thane community. Our committee members are volunteers who dedicate their time and effort to organize events, manage operations, and ensure the smooth functioning of the Mandal.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {committeeMembers.map((member) => (
              <Card key={member.name} className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
                    <AvatarImage src={`https://placehold.co/100x100.png`} alt={member.name} data-ai-hint={member.imageHint} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold text-primary">{member.name}</h3>
                  <p className="text-accent font-medium">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-8 text-muted-foreground">
            Our committee is elected periodically as per the Mandal's constitution. We encourage active participation from all members in the Mandal's activities and governance. If you are interested in contributing or have any suggestions, please feel free to reach out to any of the committee members or contact us through the official channels.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
