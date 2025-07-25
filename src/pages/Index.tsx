import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building, CheckCircle, Shield, Users } from "lucide-react"
import { NavLink } from "react-router-dom"

const features = [
  {
    icon: <Building className="h-12 w-12 text-accent" />,
    title: "Property Management",
    description: "Easily list and manage all your rental properties in one place"
  },
  {
    icon: <Shield className="h-12 w-12 text-green-600" />,
    title: "Verified Listings",
    description: "Build trust with verified property documentation and landlord credentials"
  },
  {
    icon: <Users className="h-12 w-12 text-highlight" />,
    title: "Direct Tenant Contact",
    description: "Connect directly with potential tenants through our messaging system"
  },
  {
    icon: <CheckCircle className="h-12 w-12 text-primary" />,
    title: "Easy Verification",
    description: "Quick and simple property verification process to get your listings live"
  }
]

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">NyumbaYangu</h1>
            <Button variant="highlight" asChild>
              <NavLink to="/landlord/dashboard">
                Access Dashboard
              </NavLink>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-primary mb-6">
            Manage Your Rental Properties with Ease
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            NyumbaYangu is the trusted platform for landlords to post, track, and verify their rental listings. 
            Built for landlords who want full control with ease and trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="highlight" size="xl" asChild>
              <NavLink to="/landlord/dashboard">
                Get Started
              </NavLink>
            </Button>
            <Button variant="outline" size="xl">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Everything You Need to Manage Rentals
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools you need to successfully manage your rental properties and connect with quality tenants.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow text-center">
                <CardContent className="p-8">
                  <div className="mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="bg-primary text-primary-foreground rounded-2xl py-16 px-8">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Managing Your Properties?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join hundreds of landlords who trust NyumbaYangu for their rental property management.
            </p>
            <Button variant="highlight" size="xl" asChild>
              <NavLink to="/landlord/dashboard">
                Access Landlord Dashboard
              </NavLink>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 NyumbaYangu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
