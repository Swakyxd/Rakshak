import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './dashboard/Sidebar';
import { TopBar } from './dashboard/TopBar';
import { SidebarProvider } from '@/components/ui/sidebar';

const Dashboard = () => {
  const location = useLocation();
  const [selectedCity, setSelectedCity] = useState('New York');

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background">
        <TopBar selectedCity={selectedCity} onCityChange={setSelectedCity} />
        
        <div className="flex w-full">
          <Sidebar />
          
          <main className="flex-1 p-6">
            <Outlet context={{ selectedCity }} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;