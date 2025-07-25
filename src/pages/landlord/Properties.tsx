import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Trash2, Plus, MapPin, DollarSign, Building } from "lucide-react"
import { NavLink } from "react-router-dom"

const properties = [
  {
    id: 1,
    title: "Kilimani 2BR Apartment",
    location: "Kilimani, Nairobi",
    price: "KSh 45,000",
    status: "verified",
    views: 45,
    image: "/api/placeholder/300/200",
    type: "Apartment"
  },
  {
    id: 2,
    title: "Bedsitter in Roysambu",
    location: "Roysambu, Nairobi",
    price: "KSh 15,000",
    status: "pending",
    views: 23,
    image: "/api/placeholder/300/200",
    type: "Bedsitter"
  },
  {
    id: 3,
    title: "3BR House Karen",
    location: "Karen, Nairobi",
    price: "KSh 85,000",
    status: "verified",
    views: 56,
    image: "/api/placeholder/300/200",
    type: "House"
  }
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "verified":
      return <Badge className="bg-highlight text-highlight-foreground">✅ Verified</Badge>
    case "pending":
      return <Badge variant="secondary">🕒 Pending</Badge>
    case "rejected":
      return <Badge variant="destructive">❌ Rejected</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function Properties() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">My Properties</h1>
          <p className="text-muted-foreground">Manage your rental property listings</p>
        </div>
        <Button variant="highlight" size="lg" asChild>
          <NavLink to="/landlord/properties/new">
            <Plus className="h-5 w-5" />
            Add Property
          </NavLink>
        </Button>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <div className="aspect-video relative overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                {getStatusBadge(property.status)}
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-primary">{property.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {property.location}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-lg font-bold text-primary">{property.price}</span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    {property.views} views
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-border">
                  <Button variant="accent" size="sm" className="flex-1">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State (if no properties) */}
      {properties.length === 0 && (
        <Card className="shadow-md">
          <CardContent className="p-12 text-center">
            <Building className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-2">No Properties Yet</h3>
            <p className="text-muted-foreground mb-6">Start by adding your first rental property</p>
            <Button variant="highlight" size="lg" asChild>
              <NavLink to="/landlord/properties/new">
                <Plus className="h-5 w-5" />
                Add Your First Property
              </NavLink>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}