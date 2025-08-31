import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockRoutes } from '@/data/mockData';
import type { LatLngExpression } from 'leaflet';
import { AlertTriangle, Clock, MapPin, Navigation, Route, Star } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { MapContainer, Marker, Polyline, TileLayer, useMapEvents } from 'react-leaflet';

const ORS_KEY = import.meta.env.VITE_ORS_API_KEY as string | undefined;

type Pt = { lat: number; lng: number };

function ClickSetter({
  onSet,
}: {
  onSet: (pt: Pt) => void;
}) {
  useMapEvents({
    click(e) {
      onSet({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

export default function RoutePlanner() {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [showRoutes, setShowRoutes] = useState(false);
  const [origin, setOrigin] = useState<Pt | null>(null);
  const [destination, setDestination] = useState<Pt | null>(null);
  const [routeCoords, setRouteCoords] = useState<LatLngExpression[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlanRoute = () => {
    if (startLocation && endLocation) {
      setShowRoutes(true);
    }
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'safe':
        return 'status-safe';
      case 'medium':
        return 'status-medium';
      case 'high':
        return 'status-danger';
      default:
        return 'status-safe';
    }
  };

  const clear = useCallback(() => {
    setOrigin(null);
    setDestination(null);
    setRouteCoords(null);
    setError(null);
  }, []);

  const fetchRoute = useCallback(async (o: Pt, d: Pt) => {
    setError(null);
    if (!ORS_KEY) {
      setError('ORS API key missing — add VITE_ORS_API_KEY to .env.local');
      return;
    }

    setLoading(true);
    try {
      const url = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';
      const body = {
        coordinates: [
          [o.lng, o.lat],
          [d.lng, d.lat],
        ],
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': ORS_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`ORS error: ${res.status} ${text}`);
      }

      const data = await res.json();
      // ORS returns GeoJSON feature with geometry.coordinates as [lng,lat] pairs
      const coords = (data.features?.[0]?.geometry?.coordinates || []) as [number, number][];
      const latlngs: LatLngExpression[] = coords.map(([lng, lat]) => [lat, lng]);
      setRouteCoords(latlngs);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to fetch route');
      setRouteCoords(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // when both are present, fetch the route
  React.useEffect(() => {
    if (origin && destination) {
      fetchRoute(origin, destination);
    }
  }, [origin, destination, fetchRoute]);

  const center: LatLngExpression = origin ? [origin.lat, origin.lng] : [51.5074, -0.1278]; // default London

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gradient mb-2">Smart Route Planner</h1>
        <p className="text-muted-foreground">Find the safest path to your destination</p>
      </div>

      {/* Route Input Form */}
      <div className="glass-card p-6">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Enter starting location"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                className="pl-10 glass-button"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">To</label>
            <div className="relative">
              <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Enter destination"
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
                className="pl-10 glass-button"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={handlePlanRoute}
            className="glass-button glow-accent"
            disabled={!startLocation || !endLocation}
          >
            <Route className="w-4 h-4 mr-2" />
            Find Safe Routes
          </Button>
          
          <Button variant="outline" className="glass-button">
            <Clock className="w-4 h-4 mr-2" />
            Fastest Route
          </Button>
        </div>
      </div>

      {/* Route Results */}
      {showRoutes && (
        <div className="grid lg:grid-cols-2 gap-6">
          {mockRoutes.map((route, index) => (
            <div key={route.id} className="glass-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{route.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Route className="w-4 h-4" />
                      {route.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {route.duration}
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-semibold">{route.safetyScore}/100</span>
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getRiskBadge(route.riskLevel)}`}>
                    {route.riskLevel.charAt(0).toUpperCase() + route.riskLevel.slice(1)} Risk
                  </span>
                </div>
              </div>

              {/* Safety Score Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Safety Score</span>
                  <span>{route.safetyScore}/100</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      route.safetyScore >= 80 ? 'bg-safe' : 
                      route.safetyScore >= 50 ? 'bg-medium-risk' : 
                      'bg-high-risk'
                    }`}
                    style={{ width: `${route.safetyScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Route Warnings */}
              {route.warnings.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2 text-medium-risk">Safety Warnings:</h4>
                  <div className="space-y-2">
                    {route.warnings.map((warning, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <AlertTriangle className="w-4 h-4 text-medium-risk flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{warning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Route Features */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Route Features:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-safe rounded-full"></div>
                    <span>Well-lit streets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>CCTV coverage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-safe rounded-full"></div>
                    <span>Regular patrols</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-medium-risk rounded-full"></div>
                    <span>Busy area</span>
                  </div>
                </div>
              </div>

              <Button 
                className={`w-full ${
                  route.riskLevel === 'safe' 
                    ? 'glass-button bg-safe/10 border-safe/30 text-safe hover:bg-safe/20' 
                    : 'glass-button border-medium-risk/30 text-medium-risk hover:bg-medium-risk/10'
                }`}
              >
                Select This Route
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Safety Recommendations */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4">Safety Recommendations</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-safe/20 to-safe/10 border border-safe/30">
            <h3 className="font-medium text-safe mb-2">Optimal Travel Times</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Morning: 6:00 AM - 10:00 AM</li>
              <li>• Afternoon: 2:00 PM - 6:00 PM</li>
              <li>• Avoid: 10:00 PM - 5:00 AM</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30">
            <h3 className="font-medium text-primary mb-2">Safety Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Stay on main roads</li>
              <li>• Travel in groups when possible</li>
              <li>• Keep emergency contacts ready</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-medium-risk/20 to-medium-risk/10 border border-medium-risk/30">
            <h3 className="font-medium text-medium-risk mb-2">Emergency Info</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Police: 911</li>
              <li>• Medical: 911</li>
              <li>• Safety Hotline: 311</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="h-[600px] w-full">
        <div className="mb-2">
          <button onClick={clear} className="btn">Clear</button>
          <span style={{ marginLeft: 12 }}>
            {loading ? 'Routing...' : error ? `Error: ${error}` : origin && destination ? 'Route ready' : 'Click map to set origin then destination'}
          </span>
        </div>

        <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            // using OpenStreetMap tiles; ORS also provides map tiles if you prefer (see README)
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          <ClickSetter onSet={(pt) => {
            if (!origin) setOrigin(pt);
            else if (!destination) setDestination(pt);
            else {
              // if both set, replace origin with new click and clear route
              setOrigin(pt);
              setDestination(null);
              setRouteCoords(null);
            }
          }} />

          {origin && <Marker position={[origin.lat, origin.lng]} />}
          {destination && <Marker position={[destination.lat, destination.lng]} />}
          {routeCoords && <Polyline positions={routeCoords} color="blue" weight={5} />}
        </MapContainer>
      </div>
    </div>
  );
};