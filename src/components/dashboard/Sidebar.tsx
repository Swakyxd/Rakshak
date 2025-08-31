import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';
import { 
  MapPin, 
  Route, 
  Brain, 
  FileText, 
  Info,
  BarChart3,
  Shield
} from 'lucide-react';

const navigationItems = [
  { title: 'Overview', url: '/dashboard', icon: BarChart3 },
  { title: 'Heatmap', url: '/dashboard/heatmap', icon: MapPin },
  { title: 'Route Planner', url: '/dashboard/routes', icon: Route },
  { title: 'AI Insights', url: '/dashboard/insights', icon: Brain },
  { title: 'Reports', url: '/dashboard/reports', icon: FileText },
  { title: 'About', url: '/dashboard/about', icon: Info }
];

export function Sidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <SidebarComponent
      className={`${collapsed ? 'w-14' : 'w-64'} border-r border-border/50 glass-card`}
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        {/* Logo */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-safe rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg">SafetyAI</h2>
              <p className="text-xs text-muted-foreground">Urban Dashboard</p>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
            Navigation
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      end={item.url === '/dashboard'}
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                          isActive 
                            ? 'bg-gradient-to-r from-primary/20 to-safe/10 text-primary border border-primary/20 glow-accent' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Stats Card */}
        {!collapsed && (
          <div className="mt-auto pt-6">
            <div className="glass-card p-4 border border-safe/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-safe rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-safe">System Status</span>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>AI Models</span>
                  <span className="text-safe">Online</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Sync</span>
                  <span className="text-safe">Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Update</span>
                  <span>2 min ago</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </SidebarComponent>
  );
}