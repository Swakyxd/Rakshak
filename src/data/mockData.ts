// Mock data for the Urban Safety Dashboard

export interface IncidentData {
  id: string;
  type: 'theft' | 'assault' | 'vandalism' | 'accident' | 'lighting' | 'cctv';
  location: string;
  coordinates: [number, number];
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  description: string;
  status: 'open' | 'investigating' | 'resolved';
}

export interface SafetyZone {
  id: string;
  name: string;
  coordinates: [number, number];
  radius: number;
  riskLevel: 'safe' | 'medium' | 'high';
  incidents: number;
  lastIncident: string;
  safetyScore: number;
}

export interface RouteData {
  id: string;
  name: string;
  start: string;
  end: string;
  distance: string;
  duration: string;
  safetyScore: number;
  riskLevel: 'safe' | 'medium' | 'high';
  warnings: string[];
}

// Mock incidents data
export const mockIncidents: IncidentData[] = [
  {
    id: '1',
    type: 'theft',
    location: 'Downtown Mall Area',
    coordinates: [77.5946, 12.9716],
    severity: 'medium',
    timestamp: '2024-01-20T14:30:00Z',
    description: 'Reported theft in parking area',
    status: 'investigating'
  },
  {
    id: '2',
    type: 'lighting',
    location: 'Park Street',
    coordinates: [77.6031, 12.9698],
    severity: 'low',
    timestamp: '2024-01-20T20:15:00Z',
    description: 'Poor lighting reported by citizens',
    status: 'open'
  },
  {
    id: '3',
    type: 'assault',
    location: 'Business District',
    coordinates: [77.5946, 12.9716],
    severity: 'high',
    timestamp: '2024-01-19T22:45:00Z',
    description: 'Assault reported near metro station',
    status: 'resolved'
  }
];

// Mock safety zones
export const mockSafetyZones: SafetyZone[] = [
  {
    id: 'zone1',
    name: 'Tech Park Area',
    coordinates: [77.5946, 12.9716],
    radius: 500,
    riskLevel: 'safe',
    incidents: 2,
    lastIncident: '2024-01-15T10:30:00Z',
    safetyScore: 85
  },
  {
    id: 'zone2',
    name: 'Commercial Street',
    coordinates: [77.6031, 12.9698],
    radius: 300,
    riskLevel: 'medium',
    incidents: 8,
    lastIncident: '2024-01-20T18:20:00Z',
    safetyScore: 62
  },
  {
    id: 'zone3',
    name: 'Old City',
    coordinates: [77.5762, 12.9634],
    radius: 400,
    riskLevel: 'high',
    incidents: 15,
    lastIncident: '2024-01-20T23:10:00Z',
    safetyScore: 35
  }
];

// Mock route data
export const mockRoutes: RouteData[] = [
  {
    id: 'route1',
    name: 'Safe Route',
    start: 'Tech Park',
    end: 'City Center',
    distance: '8.2 km',
    duration: '25 mins',
    safetyScore: 82,
    riskLevel: 'safe',
    warnings: []
  },
  {
    id: 'route2',
    name: 'Fastest Route',
    start: 'Tech Park',
    end: 'City Center',
    distance: '6.8 km',
    duration: '18 mins',
    safetyScore: 45,
    riskLevel: 'high',
    warnings: ['Poor lighting on 40% of route', 'High crime area detected', 'Avoid after 8 PM']
  }
];

// Dashboard stats
export const dashboardStats = {
  incidentsToday: 24,
  highRiskZones: 7,
  patrolCoverage: 85,
  averageRiskScore: 68,
  trends: {
    crimeData: [
      { month: 'Jan', incidents: 45 },
      { month: 'Feb', incidents: 38 },
      { month: 'Mar', incidents: 52 },
      { month: 'Apr', incidents: 41 },
      { month: 'May', incidents: 35 },
      { month: 'Jun', incidents: 28 }
    ],
    hourlyRisk: [
      { hour: '6AM', risk: 15 },
      { hour: '9AM', risk: 25 },
      { hour: '12PM', risk: 35 },
      { hour: '3PM', risk: 45 },
      { hour: '6PM', risk: 65 },
      { hour: '9PM', risk: 85 },
      { hour: '12AM', risk: 95 },
      { hour: '3AM', risk: 75 }
    ],
    incidentTypes: [
      { name: 'Theft', value: 35, color: '#FF9800' },
      { name: 'Vandalism', value: 25, color: '#F44336' },
      { name: 'Assault', value: 20, color: '#E91E63' },
      { name: 'Traffic', value: 15, color: '#9C27B0' },
      { name: 'Other', value: 5, color: '#673AB7' }
    ]
  }
};

// Cities data
export const cities = [
  'New York',
  'San Francisco',
  'London',
  'Tokyo',
  'Delhi',
  'Mumbai',
  'Bangalore',
  'Singapore'
];