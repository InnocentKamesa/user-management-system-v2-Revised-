"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Settings, User, ChevronDown, HelpCircle, LifeBuoy } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader>
        <div className="px-4 py-2 font-semibold text-lg text-muted-foreground">
          Kamesa User manager
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        
        {/* Navigation Group 1: Standard Links */}
        <SidebarGroup>
          <SidebarGroupLabel>Links</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              
              {/* Link 1: Home */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                  <Link href="/dashboard">
                    <Home className="h-4 w-4 shrink-0" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* User management */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/user"}>

                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* User Profile */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/profile"}>
                
                <Link href="/dashboard/profile">
                <User className="h-4 w-4 shrink-0"/>
                <span>Profile</span>
                </Link>

                </SidebarMenuButton>
              </SidebarMenuItem>



              {/* Link 2: Settings */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/settings"}>
                  <Link href="/settings">
                    <Settings className="h-4 w-4 shrink-0" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Navigation Group 2: Working Collapsible Menu */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            {/* Fix 1: Properly nested CollapsibleTrigger */}
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between font-semibold hover:text-foreground">
                <span>Help & Support</span>
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            
            <CollapsibleContent>
              <SidebarGroupContent className="pt-2">
                <SidebarMenu>
                  
                  {/* Fix 2: Filled out actual nested links so it's not empty */}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/docs"}>
                      <Link href="/docs">
                        <HelpCircle className="h-4 w-4 shrink-0" />
                        <span>Documentation</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/support"}>
                      <Link href="/support">
                        <LifeBuoy className="h-4 w-4 shrink-0" />
                        <span>Support Ticket</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <div className="p-4 text-xs text-muted-foreground border-t border-sidebar-border">
          v1.0.0
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}