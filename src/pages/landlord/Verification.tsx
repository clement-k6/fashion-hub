import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react"

const idVerification = {
  status: "verified",
  uploadedDate: "2024-01-15",
  documentType: "National ID"
}

const propertyVerifications = [
  {
    id: 1,
    propertyName: "Kilimani 2BR Apartment",
    status: "verified",
    documents: ["Ownership deed", "Utility bill"],
    submittedDate: "2024-01-10",
    verifiedDate: "2024-01-12"
  },
  {
    id: 2,
    propertyName: "Bedsitter in Roysambu",
    status: "pending",
    documents: ["Ownership deed", "Utility bill"],
    submittedDate: "2024-01-18",
    verifiedDate: null
  },
  {
    id: 3,
    propertyName: "3BR House Karen",
    status: "verified",
    documents: ["Ownership deed", "Utility bill", "Lease agreement"],
    submittedDate: "2024-01-05",
    verifiedDate: "2024-01-07"
  }
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "verified":
      return <CheckCircle className="h-5 w-5 text-green-600" />
    case "pending":
      return <Clock className="h-5 w-5 text-orange-500" />
    case "rejected":
      return <AlertCircle className="h-5 w-5 text-red-600" />
    default:
      return <FileText className="h-5 w-5 text-gray-400" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "verified":
      return <Badge className="bg-green-100 text-green-800 border-green-200">✅ Verified</Badge>
    case "pending":
      return <Badge className="bg-orange-100 text-orange-800 border-orange-200">🕒 Pending</Badge>
    case "rejected":
      return <Badge variant="destructive">❌ Rejected</Badge>
    default:
      return <Badge variant="outline">Not Submitted</Badge>
  }
}

export default function Verification() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Verification Center</h1>
        <p className="text-muted-foreground">Manage your ID and property verification status</p>
      </div>

      {/* ID Verification */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            {getStatusIcon(idVerification.status)}
            ID Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-medium">Identity Document</h3>
                {getStatusBadge(idVerification.status)}
              </div>
              <p className="text-sm text-muted-foreground">
                {idVerification.status === "verified" 
                  ? `${idVerification.documentType} verified on ${new Date(idVerification.uploadedDate).toLocaleDateString()}`
                  : "Upload your ID to verify your identity"
                }
              </p>
            </div>
            {idVerification.status !== "verified" && (
              <Button variant="accent">
                <Upload className="h-4 w-4 mr-2" />
                Upload ID
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Property Verifications */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-primary">Property Verification Status</CardTitle>
          <p className="text-sm text-muted-foreground">
            Each property requires verification before it can go live
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {propertyVerifications.map((property) => (
              <div key={property.id} className="border border-border rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(property.status)}
                      <h3 className="font-medium text-primary">{property.propertyName}</h3>
                      {getStatusBadge(property.status)}
                    </div>
                    
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Documents: {property.documents.join(", ")}</p>
                      <p>Submitted: {new Date(property.submittedDate).toLocaleDateString()}</p>
                      {property.verifiedDate && (
                        <p>Verified: {new Date(property.verifiedDate).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                  
                  {property.status === "pending" && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Status
                      </Button>
                      <Button variant="accent" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Add Docs
                      </Button>
                    </div>
                  )}
                  
                  {property.status === "rejected" && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Feedback
                      </Button>
                      <Button variant="accent" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Resubmit
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Verification Guidelines */}
      <Card className="shadow-md bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Verification Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-blue-800">
            <div>
              <h4 className="font-medium mb-2">Required Documents for ID Verification:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Valid National ID or Passport</li>
                <li>Clear, high-resolution photo</li>
                <li>All details must be clearly visible</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Required Documents for Property Verification:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Property ownership documents (Title deed, Sale agreement)</li>
                <li>Recent utility bill (KPLC, Water, etc.)</li>
                <li>Lease agreement (if applicable)</li>
                <li>Local authority permits (if required)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Verification Process:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Documents are reviewed within 24-48 hours</li>
                <li>You'll be notified via email about the status</li>
                <li>Rejected submissions include feedback for resubmission</li>
                <li>Verified properties go live immediately</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}