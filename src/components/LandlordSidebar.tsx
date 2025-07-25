import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Home,
  Building,
  Plus,
  CheckSquare,
  Settings,
  MessageCircle,
  LogOut,
  Menu,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigationItems = [
  { title: "Dashboard", url: "/landlord/dashboard", icon: Home },
  { title: "My Properties", url: "/landlord/properties", icon: Building },
  { title: "Add Property", url: "/landlord/properties/new", icon: Plus },
  { title: "Verification", url: "/landlord/verification", icon: CheckSquare },
  { title: "Settings", url: "/landlord/settings", icon: Settings },
  { title: "Inbox", url: "/landlord/inbox", icon: MessageCircle },
]

export function LandlordSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + "/")

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-primary text-primary-foreground transition-transform duration-300 ease-in-out",
          "md:translate-x-0",
          isCollapsed ? "-translate-x-full md:w-16" : "translate-x-0 w-64"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b border-primary-foreground/20 px-4">
            {!isCollapsed ? (
              <h1 className="text-xl font-bold">NyumbaYangu</h1>
            ) : (
              <div className="text-xl font-bold">NY</div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.title}>
                  <NavLink
                    to={item.url}
                    className={({ isActive: navIsActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        "hover:bg-primary-foreground/10 hover:text-highlight",
                        navIsActive || isActive(item.url)
                          ? "bg-highlight text-highlight-foreground"
                          : "text-primary-foreground"
                      )
                    }
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="border-t border-primary-foreground/20 p-4">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 text-primary-foreground hover:bg-primary-foreground/10 hover:text-highlight",
                isCollapsed && "justify-center"
              )}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  )
}