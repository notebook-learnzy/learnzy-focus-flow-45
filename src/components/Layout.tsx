
import { Outlet } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarProvider 
} from "@/components/ui/sidebar";
import { Calendar, BookOpen, Heart, PieChart, Settings as SettingsIcon, GraduationCap, AlertTriangle, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import ModeToggle from "./ModeToggle";
import Header from "./Header";
import FooterNavigation from "./FooterNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {!isMobile && (
          <Sidebar className="bg-learnzy-background border-r border-gray-200">
            <SidebarContent>
              <div className="pt-6 px-4 mb-6">
                <div className="flex flex-col items-center">
                  <h1 className="text-2xl font-bold text-learnzy-purple">Learnzy</h1>
                  <p className="text-sm text-gray-500">Student WebApp</p>
                </div>
              </div>
              
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link 
                      to="/academics" 
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-md",
                        location.pathname === "/academics" ? "bg-learnzy-purple text-white" : "text-gray-700 hover:bg-learnzy-purple/10"
                      )}
                    >
                      <BookOpen size={20} />
                      <span>Academics</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link 
                      to="/calendar" 
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-md",
                        location.pathname === "/calendar" ? "bg-learnzy-purple text-white" : "text-gray-700 hover:bg-learnzy-purple/10"
                      )}
                    >
                      <Calendar size={20} />
                      <span>Calendar</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link 
                      to="/dashboard" 
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-md",
                        location.pathname === "/dashboard" ? "bg-learnzy-purple text-white" : "text-gray-700 hover:bg-learnzy-purple/10"
                      )}
                    >
                      <PieChart size={20} />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link 
                      to="/wellness" 
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-md",
                        location.pathname === "/wellness" ? "bg-learnzy-purple text-white" : "text-gray-700 hover:bg-learnzy-purple/10"
                      )}
                    >
                      <Heart size={20} />
                      <span>Wellness</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link 
                      to="/mistake-notebook" 
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-md",
                        location.pathname === "/mistake-notebook" ? "bg-learnzy-purple text-white" : "text-gray-700 hover:bg-learnzy-purple/10"
                      )}
                    >
                      <AlertTriangle size={20} />
                      <span>Mistake Notebook</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link 
                      to="/social" 
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-md",
                        location.pathname === "/social" ? "bg-learnzy-purple text-white" : "text-gray-700 hover:bg-learnzy-purple/10"
                      )}
                    >
                      <Users size={20} />
                      <span>Social</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link 
                      to="/assistant" 
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-md",
                        location.pathname === "/assistant" ? "bg-learnzy-purple text-white" : "text-gray-700 hover:bg-learnzy-purple/10"
                      )}
                    >
                      <GraduationCap size={20} />
                      <span>Shiv Assistant</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link 
                      to="/settings" 
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-md",
                        location.pathname === "/settings" ? "bg-learnzy-purple text-white" : "text-gray-700 hover:bg-learnzy-purple/10"
                      )}
                    >
                      <SettingsIcon size={20} />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
        )}
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 bg-learnzy-background/30 overflow-auto pb-16">
            <Outlet />
          </main>
          {isMobile && <FooterNavigation />}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
