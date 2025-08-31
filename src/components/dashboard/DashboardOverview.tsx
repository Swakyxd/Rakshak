import React from 'react';
import { BarChart3, Shield, AlertTriangle, MapPin, TrendingUp } from 'lucide-react';
import { dashboardStats } from '@/data/mockData';

const DashboardOverview = () => {
  const stats = [
    {
      title: 'Incidents Today',
      value: dashboardStats.incidentsToday,
      change: '+12%',
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'medium-risk'
    },
    {
      title: 'High-Risk Zones',
      value: dashboardStats.highRiskZones,
      change: '-3%',
      icon: <MapPin className="w-6 h-6" />,
      color: 'high-risk'
    },
    {
      title: 'Patrol Coverage',
      value: `${dashboardStats.patrolCoverage}%`,
      change: '+5%',
      icon: <Shield className="w-6 h-6" />,
      color: 'safe'
    },
    {
      title: 'Average Risk Score',
      value: dashboardStats.averageRiskScore,
      change: '-8%',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'safety-accent'
    }
  ];

  const recentIncidents = [
    { id: 1, type: 'Theft', location: 'Downtown Mall', time: '2 hrs ago', severity: 'medium' },
    { id: 2, type: 'Vandalism', location: 'Park Street', time: '4 hrs ago', severity: 'low' },
    { id: 3, type: 'Assault', location: 'Business District', time: '6 hrs ago', severity: 'high' },
    { id: 4, type: 'Lighting Issue', location: 'Residential Area', time: '8 hrs ago', severity: 'low' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'status-danger';
      case 'medium': return 'status-medium';
      case 'low': return 'status-safe';
      default: return 'status-safe';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gradient mb-2">Safety Dashboard</h1>
        <p className="text-muted-foreground">Real-time overview of urban safety metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="glass-card p-6 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-3xl font-bold mb-2">{stat.value}</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-safe" />
                  <span className="text-sm text-safe font-medium">{stat.change}</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br from-${stat.color}/20 to-${stat.color}/10 text-${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Incidents */}
        <div className="lg:col-span-2">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Incidents</h2>
              <button className="text-primary hover:text-primary/80 text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentIncidents.map((incident) => (
                <div 
                  key={incident.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(incident.severity)}`}></div>
                    <div>
                      <p className="font-medium">{incident.type}</p>
                      <p className="text-sm text-muted-foreground">{incident.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{incident.time}</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                      {incident.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Safety Alerts */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Safety Alerts</h2>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-high-risk/20 to-high-risk/10 border border-high-risk/30">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-high-risk flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-high-risk">High Crime Area</p>
                    <p className="text-sm text-muted-foreground">Increased activity reported in Downtown area</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-gradient-to-r from-medium-risk/20 to-medium-risk/10 border border-medium-risk/30">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-medium-risk flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-medium-risk">Patrol Update</p>
                    <p className="text-sm text-muted-foreground">Additional units deployed to high-risk zones</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-safe/20 to-safe/10 border border-safe/30">
                <div className="flex items-start gap-3">
                  <BarChart3 className="w-5 h-5 text-safe flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-safe">Safety Improvement</p>
                    <p className="text-sm text-muted-foreground">Crime rate decreased by 15% this month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            
            <div className="space-y-3">
              <button className="w-full p-3 text-left rounded-xl bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 hover:from-primary/30 hover:to-primary/20 transition-all">
                <p className="font-medium text-primary">Generate Report</p>
                <p className="text-sm text-muted-foreground">Create safety analysis report</p>
              </button>
              
              <button className="w-full p-3 text-left rounded-xl bg-gradient-to-r from-safe/20 to-safe/10 border border-safe/30 hover:from-safe/30 hover:to-safe/20 transition-all">
                <p className="font-medium text-safe">Plan Safe Route</p>
                <p className="text-sm text-muted-foreground">Get optimized safe navigation</p>
              </button>
              
              <button className="w-full p-3 text-left rounded-xl bg-gradient-to-r from-medium-risk/20 to-medium-risk/10 border border-medium-risk/30 hover:from-medium-risk/30 hover:to-medium-risk/20 transition-all">
                <p className="font-medium text-medium-risk">View Heatmap</p>
                <p className="text-sm text-muted-foreground">Explore interactive safety map</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;