import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, ImagePlus, FileText, X, MapPin, Loader2, LocateFixed } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"
import { Badge } from "@/components/ui/badge"
import { StandaloneSearchBox } from "@react-google-maps/api"

const amenities = [
  "WiFi", "Water", "Parking", "Security", "Garden", "Pool", 
  "Gym", "Balcony", "Air Conditioning", "Furnished", "Pet Friendly", "Laundry"
]

export default function AddProperty() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([])
  const [mapOpen, setMapOpen] = useState(false)
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [coordsTouched, setCoordsTouched] = useState(false)
  const [coordsError, setCoordsError] = useState<string | null>(null)
  const [searchBox, setSearchBox] = useState<any>(null)
  const [searchValue, setSearchValue] = useState("")
  const [mapRef, setMapRef] = useState<any>(null)
  const [isLocating, setIsLocating] = useState(false)

  // Google Maps setup
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY_HERE", // TODO: Replace with real key
  })
  const defaultCenter = { lat: -1.2921, lng: 36.8219 } // Nairobi

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenity])
    } else {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCoords) {
      setCoordsError("Please drop a pin on the map to select the precise property location.")
      setCoordsTouched(true)
      return
    }
    setCoordsError(null)
    toast({
      title: "Property Submitted!",
      description: "Your property has been submitted for verification.",
    })
    navigate("/landlord/properties")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Add New Property</h1>
        <p className="text-muted-foreground">List your rental property for potential tenants</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-primary">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Property Title</Label>
                <Input 
                  id="title" 
                  placeholder="e.g., Modern 2BR Apartment in Kilimani"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Property Type</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="bedsitter">Bedsitter</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex gap-2 items-center">
                  <Input 
                    id="location" 
                    placeholder="e.g., Kilimani, Nairobi"
                    required
                  />
                  <Button type="button" variant="outline" onClick={() => setMapOpen(true)} title="Pick on Map">
                    <MapPin className="h-5 w-5" />
                  </Button>
                </div>
                {selectedCoords && (
                  <div className="mt-2">
                    <Badge variant="default" className="text-xs px-3 py-1 rounded-full">
                      Pin dropped: Lat {selectedCoords.lat.toFixed(5)}, Lng {selectedCoords.lng.toFixed(5)}
                    </Badge>
                  </div>
                )}
                {coordsError && (
                  <div className="text-xs text-destructive mt-1">{coordsError}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="rent">Monthly Rent (KSh)</Label>
                <Input 
                  id="rent" 
                  type="number"
                  placeholder="e.g., 45000"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                placeholder="Describe your property, including features, nearby amenities, etc."
                rows={4}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Photos */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-primary">Property Photos</CardTitle>
            <p className="text-sm text-muted-foreground">Upload 3-5 high-quality photos of your property</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <ImagePlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Drag and drop photos here, or click to browse</p>
              <Button type="button" variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Choose Photos
              </Button>
            </div>
            
            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={image} 
                      alt={`Property photo ${index + 1}`}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Amenities */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-primary">Amenities</CardTitle>
            <p className="text-sm text-muted-foreground">Select all amenities available in your property</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {amenities.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox 
                    id={amenity}
                    checked={selectedAmenities.includes(amenity)}
                    onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                  />
                  <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Verification Documents */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-primary">Verification Documents</CardTitle>
            <p className="text-sm text-muted-foreground">Upload required documents for property verification</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Required Documents:</h4>
                  <ul className="text-sm text-blue-700 mt-1 space-y-1">
                    <li>• Valid ID or Passport</li>
                    <li>• Property ownership documents</li>
                    <li>• Recent utility bill</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Upload verification documents</p>
              <Button type="button" variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Choose Documents
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button 
            type="button" 
            variant="outline" 
            className="flex-1 sm:flex-none"
            onClick={() => navigate("/landlord/properties")}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="highlight" 
            size="lg" 
            className="flex-1"
          >
            Submit for Review
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            🛈 Your listing will be reviewed and verified before going live
          </p>
        </div>
      </form>
      {/* Google Maps Modal */}
      <Dialog open={mapOpen} onOpenChange={setMapOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Pick Property Location</DialogTitle>
          </DialogHeader>
          {isLoaded ? (
            <div className="h-96 w-full rounded-lg overflow-hidden relative">
              {/* Search bar and location button */}
              <div className="absolute top-4 left-4 right-4 z-10 flex gap-2">
                <StandaloneSearchBox
                  onLoad={ref => setSearchBox(ref)}
                  onPlacesChanged={() => {
                    if (!searchBox) return
                    const places = searchBox.getPlaces()
                    if (places && places[0] && places[0].geometry && places[0].geometry.location) {
                      const loc = places[0].geometry.location
                      const lat = loc.lat()
                      const lng = loc.lng()
                      setSelectedCoords({ lat, lng })
                      setCoordsTouched(true)
                      setCoordsError(null)
                      if (mapRef) mapRef.panTo({ lat, lng })
                    }
                  }}
                >
                  <Input
                    className="w-full bg-white/90 shadow rounded-md"
                    placeholder="Search for a place or address..."
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    autoFocus
                  />
                </StandaloneSearchBox>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="bg-white/90 shadow"
                  title="Use my location"
                  onClick={async () => {
                    setIsLocating(true)
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        pos => {
                          setIsLocating(false)
                          setSelectedCoords({
                            lat: pos.coords.latitude,
                            lng: pos.coords.longitude,
                          })
                          setCoordsTouched(true)
                          setCoordsError(null)
                          if (mapRef) mapRef.panTo({
                            lat: pos.coords.latitude,
                            lng: pos.coords.longitude,
                          })
                        },
                        () => setIsLocating(false),
                        { enableHighAccuracy: true }
                      )
                    } else {
                      setIsLocating(false)
                    }
                  }}
                >
                  {isLocating ? <Loader2 className="animate-spin h-5 w-5" /> : <LocateFixed className="h-5 w-5" />}
                </Button>
              </div>
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={selectedCoords || defaultCenter}
                zoom={14}
                onClick={e => {
                  if (e.latLng) {
                    setSelectedCoords({
                      lat: e.latLng.lat(),
                      lng: e.latLng.lng(),
                    })
                    setCoordsTouched(true)
                    setCoordsError(null)
                  }
                }}
                onLoad={ref => setMapRef(ref)}
              >
                {selectedCoords && <Marker position={selectedCoords} />}
              </GoogleMap>
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center">Loading map...</div>
          )}
          <div className="flex justify-end gap-2 pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" variant="highlight" disabled={!selectedCoords}>Use Location</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}