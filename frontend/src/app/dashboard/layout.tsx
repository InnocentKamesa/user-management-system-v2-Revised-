import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="h-full w-full bg-gray-200 ">
      <AppSidebar />

      <main className="bg-white md:m-4 shadow-md overflow-scroll rounded-md h-screen w-full">

        {/* top content */}
        <div className="p-4 items-center flex flex-row">
          <SidebarTrigger className="p-2" />
          <div>
            <p className="text-sm pl-3 text-black/70">Dashboard /</p>
          </div>
          <div className="flex ml-auto flex-row items-center gap-4">
            <p className="font-semibold text-sm">Admin</p>
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