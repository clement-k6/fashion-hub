import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageCircle, User, Clock } from "lucide-react"

const messages = [
  {
    id: 1,
    sender: "Sarah Johnson",
    property: "Kilimani 2BR Apartment",
    message: "Hi, I'm interested in viewing this property. When would be a good time?",
    time: "2 hours ago",
    unread: true
  },
  {
    id: 2,
    sender: "Michael Chen",
    property: "3BR House Karen",
    message: "Is the property still available? I'd like to schedule a viewing.",
    time: "1 day ago",
    unread: true
  },
  {
    id: 3,
    sender: "Grace Wanjiku",
    property: "Bedsitter in Roysambu",
    message: "Thank you for the tour. I'm very interested and would like to proceed with the application.",
    time: "3 days ago",
    unread: false
  }
]

export default function Inbox() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Inbox</h1>
        <p className="text-muted-foreground">Messages from potential tenants</p>
      </div>

      {/* Messages */}
      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message.id} className={`shadow-md cursor-pointer hover:shadow-lg transition-shadow ${message.unread ? 'border-accent' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-muted p-2">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-primary">{message.sender}</h3>
                    <div className="flex items-center gap-2">
                      {message.unread && <Badge variant="secondary">New</Badge>}
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {message.time}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Re: {message.property}
                  </p>
                  
                  <p className="text-foreground">{message.message}</p>
                  
                  <div className="flex gap-2 pt-2">
                    <Button variant="accent" size="sm">
                      Reply
                    </Button>
                    <Button variant="outline" size="sm">
                      Mark as Read
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {messages.length === 0 && (
        <Card className="shadow-md">
          <CardContent className="p-12 text-center">
            <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-2">No Messages Yet</h3>
            <p className="text-muted-foreground">You'll see messages from interested tenants here</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}