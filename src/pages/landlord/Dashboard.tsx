import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Eye, CheckCircle, Clock, Plus, HelpCircle, Users } from "lucide-react"
import { NavLink } from "react-router-dom"

const stats = [
  {
    title: "Properties Posted",
    value: 3,
    icon: <Building className="h-6 w-6 text-[#A8DADC]" />,
  },
  {
    title: "Total Views",
    value: 124,
    icon: <Eye className="h-6 w-6 text-[#E9C46A]" />,
  },
  {
    title: "Verified Listings",
    value: 2,
    icon: <CheckCircle className="h-6 w-6 text-[#1D3557]" />,
  },
  {
    title: "Pending Approval",
    value: 1,
    icon: <Clock className="h-6 w-6 text-[#E9C46A]" />,
  }
]

const recentActivity = [
  {
    property: "Kilimani 2BR Apartment",
    status: "verified",
    date: "2 days ago",
    location: "Kilimani, Nairobi"
  },
  {
    property: "Bedsitter in Roysambu",
    status: "pending",
    date: "5 days ago",
    location: "Roysambu, Nairobi"
  },
  {
    property: "3BR House Karen",
    status: "verified",
    date: "1 week ago",
    location: "Karen, Nairobi"
  }
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "verified":
      return <Badge className="bg-[#E9C46A] text-[#1D3557] rounded-full px-3 py-1 font-semibold">✅ Verified</Badge>
    case "pending":
      return <Badge className="bg-[#A8DADC] text-[#1D3557] rounded-full px-3 py-1 font-semibold">🕒 Pending</Badge>
    case "rejected":
      return <Badge className="bg-red-200 text-red-700 rounded-full px-3 py-1 font-semibold">❌ Rejected</Badge>
    default:
      return <Badge className="bg-[#F1FAEE] text-[#1D3557] rounded-full px-3 py-1 font-semibold">{status}</Badge>
  }
}

export default function Dashboard() {
  const profileProgress = 70
  return (
    <div className="space-y-12 min-h-screen pb-24 bg-gradient-to-br from-[#F1FAEE] via-[#A8DADC]/10 to-[#F1FAEE] relative">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 mt-8 mb-2">
        <div className="flex items-center gap-4">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User Avatar" className="w-16 h-16 rounded-full border-4 border-[#A8DADC] shadow" />
          <div>
            <h2 className="text-2xl font-bold text-[#1D3557] flex items-center gap-2"><Users className="h-6 w-6 text-[#A8DADC]" />Welcome back, John!</h2>
            <p className="text-[#457B9D]">Let’s make renting easier for everyone today.</p>
            <div className="w-48 mt-2">
              <div className="h-2 bg-[#A8DADC]/30 rounded-full">
                <div className="h-2 bg-[#A8DADC] rounded-full" style={{width: `${profileProgress}%`}}></div>
              </div>
              <span className="text-xs text-[#457B9D]">Profile {profileProgress}% complete</span>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-[#E9C46A] text-[#1D3557] font-bold rounded-full px-6 py-3 shadow-lg hover:bg-[#A8DADC] hover:text-[#1D3557] transition-all flex gap-2 items-center" size="lg" asChild>
            <NavLink to="/landlord/properties/new">
              <Plus className="h-5 w-5" />
              Post New Property
            </NavLink>
          </Button>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center"
            tabIndex={0}
            aria-label={stat.title}
          >
            <div className="mb-2">{stat.icon}</div>
            <span className="text-3xl font-bold text-[#1D3557]">{stat.value}</span>
            <div className="text-[#457B9D] font-medium">{stat.title}</div>
          </div>
        ))}
      </div>
      {/* Recent Activity */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1D3557]">Recent Activity</h2>
        </div>
        {recentActivity.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <img src="https://illustrations.popsy.co/gray/empty-state.svg" alt="No activity" className="w-40 mb-4" />
            <p className="text-[#457B9D] text-lg">No recent activity yet. Start by posting a property!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-[#A8DADC] last:border-0">
                <div className="flex-1">
                  <h4 className="font-medium text-[#1D3557]">{activity.property}</h4>
                  <p className="text-sm text-[#457B9D]">{activity.location}</p>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(activity.status)}
                  <span className="text-sm text-[#457B9D]">{activity.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <NavLink to="/landlord/properties" className="group bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer outline-none focus:ring-2 focus:ring-[#A8DADC]">
          <CardContent className="p-6">
            <div className="text-center">
              <Building className="h-12 w-12 text-[#A8DADC] mx-auto mb-3" />
              <h3 className="font-semibold text-[#1D3557] mb-2">Manage Properties</h3>
              <p className="text-sm text-[#457B9D]">View and edit your property listings</p>
            </div>
          </CardContent>
        </NavLink>
        <NavLink to="/landlord/verification" className="group bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer outline-none focus:ring-2 focus:ring-[#A8DADC]">
          <CardContent className="p-6">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-[#1D3557] mx-auto mb-3" />
              <h3 className="font-semibold text-[#1D3557] mb-2">Verification Status</h3>
              <p className="text-sm text-[#457B9D]">Check your verification progress</p>
            </div>
          </CardContent>
        </NavLink>
        <NavLink to="/landlord/properties/new" className="group bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer outline-none focus:ring-2 focus:ring-[#A8DADC]">
          <CardContent className="p-6">
            <div className="text-center">
              <Plus className="h-12 w-12 text-[#E9C46A] mx-auto mb-3" />
              <h3 className="font-semibold text-[#1D3557] mb-2">Add New Property</h3>
              <p className="text-sm text-[#457B9D]">List a new rental property</p>
            </div>
          </CardContent>
        </NavLink>
        {/* Get Help Card */}
        <a href="#" className="group bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer outline-none focus:ring-2 focus:ring-[#A8DADC] flex flex-col justify-center" tabIndex={0} aria-label="Get Help">
          <CardContent className="p-6">
            <div className="text-center">
              <HelpCircle className="h-12 w-12 text-[#A8DADC] mx-auto mb-3" />
              <h3 className="font-semibold text-[#1D3557] mb-2">Get Help</h3>
              <p className="text-sm text-[#457B9D]">Need assistance? Contact our support team.</p>
            </div>
          </CardContent>
        </a>
      </div>
      <div className="text-center text-[#A8DADC] mt-12 text-sm">Powered by NyumbaYangu</div>
    </div>
  )
}