import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Search, Bell, Clock, Wifi } from 'lucide-react';
import { cities } from '@/data/mockData';

interface TopBarProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export function TopBar({ selectedCity, onCityChange }: TopBarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 border-b border-border/50 glass-card sticky top-0 z-50">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="glass-button p-2" />
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-safe rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-safe">Live Monitoring</span>
          </div>
        </div>

        {/* Center Section */}
        <div className="flex items-center gap-4">
          {/* City Selector */}
          <Select value={selectedCity} onValueChange={onCityChange}>
            <SelectTrigger className="w-48 glass-button border-primary/20">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search locations..." 
              className="pl-10 w-64 glass-button border-muted/20"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Live Clock */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="font-mono">
              {currentTime.toLocaleTimeString()}
            </span>
          </div>

          {/* Connection Status */}
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-safe" />
            <span className="text-xs text-safe font-medium">Connected</span>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="glass-button relative">
            <Bell className="w-4 h-4" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-high-risk rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}