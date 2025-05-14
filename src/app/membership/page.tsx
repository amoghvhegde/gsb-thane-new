
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

const membershipBenefits = [
  "Active participation in religious and cultural events.",
  "Access to community resources and support networks.",
  "Voting rights in Mandal elections and decision-making processes (as per Mandal rules).",
  "Discounts on paid events and activities, where applicable.",
  "Opportunities to volunteer and contribute to community service.",
  "Regular updates and newsletters about Mandal activities."
];

const requiredParticularsCol1 = [
  "First Name",
  "Middle Name",
  "Surname",
  "Gender (Male/Female)",
  "Postal Address",
  "Pin Code",
  "Mobile No.",
  "Email (ALL CAPS)",
  "Date of Birth (dd-mm-yyyy)",
];

const requiredParticularsCol2 = [
  "Occupation & Qualification",
  "Marital Status (Married/Unmarried)",
  "Number of children (if married)",
  "Gotra",
  "Kuladevata",
  "Math (Kashi/Gokarn/Kavale)",
  "Native Place",
  "Name(s) of other GSB institutions you are a member of (if any)",
  "Introducer's Name",
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
            As per the current application guidelines, we offer the following membership types:
          </p>
          <ul className="my-4">
            <li><strong>Life Membership:</strong> ₹202/-</li>
            <li><strong>Patron Membership:</strong> ₹502/-</li>
          </ul>
          <p>
            For detailed information on current membership fees, any other categories, and the application process, please contact our office or refer to the latest membership circular.
          </p>

          <h2 className="text-2xl font-semibold text-primary mt-6 mb-3">How to Apply</h2>
          <p>
            Becoming a member involves the following steps:
          </p>
          <ol className="space-y-2">
            <li>Download the membership application form (if available online through official channels) or collect a physical copy from the Mandal office.</li>
            <li>
              Fill out the form completely with accurate details. The application form will typically require the following particulars:
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 text-sm my-4 not-prose">
                <ul className="list-disc pl-5 space-y-1">
                  {requiredParticularsCol1.map(item => <li key={item}>{item}</li>)}
                </ul>
                <ul className="list-disc pl-5 space-y-1">
                  {requiredParticularsCol2.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
              The application also requires you to specify the class of membership you are applying for (Life or Patron), details about the mode of payment (Cheque or Online - after application is provisionally approved), your signature, and the date of application.
            </li>
            <li>Submit the completed application form to the Mandal office or designated committee members.</li>
            <li>The mode of payment for the membership fee will be communicated after your application is provisionally approved.</li>
            <li>Your application will be reviewed by the Managing Committee. Upon approval and payment of fees, your membership will be confirmed.</li>
          </ol>
          
          <h3 className="text-xl font-semibold text-primary mt-8 mb-2">Important Declaration by Applicant</h3>
          <blockquote className="border-l-4 border-accent pl-4 italic my-4 bg-muted/30 p-3 rounded-r-md">
            "I declare that the above information is true to the best of my knowledge & belief. I agree to pay the required membership fee, if my application is accepted. I declare that I am a G.S.B. & have completed 18 years of age. I agree to abide by the Rules & Regulations of the Mandal."
          </blockquote>

          <Card className="my-6 bg-primary/5 border-primary/20">
            <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-lg text-primary">Please Note</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
                <p className="text-sm font-medium text-primary/90">
                    Membership shall be considered as confirmed, only after the payment receipt is issued by the Mandal.
                </p>
            </CardContent>
          </Card>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center not-prose">
            <Button size="lg" asChild>
              <Link href="/contact-us">Contact Us for Membership Form</Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              (For the most current form and process, please contact the Mandal office.)
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
