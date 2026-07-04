import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="h-full w-full bg-gray-200">
      <AppSidebar />

      <main className="bg-white md:m-4 shadow-md rounded-md h-screen w-full">

        {/* top content */}
        <div className="p-4 flex flex-row">
          <SidebarTrigger className="p-2" />
          <div className="flex ml-auto flex-row">
            <Avatar className="">
               <AvatarImage src="https://github.com/shadcn.png" />
               <AvatarFallback>IK</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="p-4">
        {children}
        </div>
      </main>
    </SidebarProvider>
  )
}