import { ReactNode } from "react"
import { LandlordSidebar } from "./LandlordSidebar"

interface LandlordLayoutProps {
  children: ReactNode
}

export function LandlordLayout({ children }: LandlordLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <LandlordSidebar />
      <main className="md:ml-64 transition-all duration-300">
        <div className="px-6 py-8 md:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}