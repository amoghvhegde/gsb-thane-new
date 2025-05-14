import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

const membershipBenefits = [
  "Active participation in religious and cultural events.",
  "Access to community resources and support networks.",
  "Voting rights in Mandal elections and decision-making processes.",
  "Discounts on paid events and activities.",
  "Opportunities to volunteer and contribute to community service.",
  "Regular updates and newsletters about Mandal activities."
];

export default function MembershipPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Become a Member</CardTitle>
          <CardDescription>Join the GSB Mandal Thane family and be a part of our vibrant community.</CardDescription>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <p>
            Membership in GSB Mandal Thane is open to all Goud Saraswat Brahmin individuals and families residing in Thane and its surrounding areas who wish to connect with their roots, participate in cultural and religious activities, and contribute to the community's growth.
          </p>
          
          <h2 className="text-2xl font-semibold text-primary mt-6 mb-3">Why Become a Member?</h2>
          <p>
            By becoming a member, you gain access to a wide range of benefits and opportunities:
          </p>
          <ul className="space-y-2 my-4">
            {membershipBenefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-accent mr-2 mt-1 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold text-primary mt-6 mb-3">Membership Types & Fees</h2>
          <p>
            We offer various membership types to suit different needs:
          </p>
          <ul>
            <li><strong>Life Membership:</strong> A one-time fee for lifelong association with the Mandal.</li>
            <li><strong>Annual Membership:</strong> A yearly renewable membership.</li>
            <li><strong>Family Membership:</strong> Covers the entire family under a single membership.</li>
          </ul>
          <p>
            For detailed information on current membership fees and categories, please contact our office or refer to the latest membership circular.
          </p>

          <h2 className="text-2xl font-semibold text-primary mt-6 mb-3">How to Apply</h2>
          <p>
            Becoming a member is simple:
          </p>
          <ol>
            <li>Download the membership application form from our website (link below, if available) or collect it from the Mandal office.</li>
            <li>Fill out the form completely with accurate details.</li>
            <li>Submit the completed form along with the applicable membership fee to the Mandal office or designated committee members.</li>
            <li>Your application will be reviewed, and upon approval, you will receive your membership confirmation.</li>
          </ol>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
            <Button size="lg" asChild>
              <Link href="/contact-us">Contact Us for Membership Form</Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              (Currently, online applications are not available. Please contact us for the form.)
            </p>
          </div>

          <p className="mt-8">
            We eagerly welcome new members and look forward to your active participation in making GSB Mandal Thane a thriving hub for our community.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
