import { AppSidebar } from "@/components/app-sidebar";
import BPLogo from "@/components/BPLogo";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-sidebar">
        <header className="flex md:hidden h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-sidebar border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <BPLogo />
          </div>
        </header>

        <div className="flex flex-col flex-1 w-full gap-2 px-4 py-2 mx-auto max-w-7xl">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
