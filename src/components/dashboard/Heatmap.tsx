import { Button } from '@/components/ui/button';
import { mockSafetyZones } from '@/data/mockData';
import { Eye, EyeOff, Filter, Info } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Polygon, Popup, TileLayer } from 'react-leaflet';

/* ErrorBoundary to prevent whole page from crashing when Leaflet/react-leaflet throws */
class ErrorBoundary extends React.Component<{ children: React.ReactNode; onReset?: () => void }, { hasError: boolean; message?: string }> {
  constructor(props: any) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError(error: any) { return { hasError: true, message: String(error) }; }
  componentDidCatch(error: any, info: any) { console.error('Heatmap ErrorBoundary caught', error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 text-red-700 rounded">
          <div className="font-semibold mb-2">Map failed to render</div>
          <div className="text-sm mb-3">{this.state.message}</div>
          <div className="flex gap-2">
            <Button onClick={() => { this.setState({ hasError: false, message: undefined }); this.props.onReset?.(); }}>Try again</Button>
          </div>
        </div>
      );
    }
    return this.props.children as any;
  }
}

/* helpers: validate/normalize coords to [lat, lng] numeric pairs */
const isLat = (n: number) => Number.isFinite(n) && n >= -90 && n <= 90;
const isLng = (n: number) => Number.isFinite(n) && n >= -180 && n <= 180;

const normalizeCoords = (coords: any): [number, number][] => {
  if (!Array.isArray(coords)) return [];
  const out: [number, number][] = [];
  for (const pt of coords) {
    if (!Array.isArray(pt) || pt.length < 2) continue;
    let a = Number(pt[0]), b = Number(pt[1]);
    if (!Number.isFinite(a) || !Number.isFinite(b)) continue;
    // if first number is outside lat range but second is valid lat, assume order is [lng,lat] -> swap
    if (!isLat(a) && isLat(b) && isLng(a)) [a, b] = [b, a];
    if (isLat(a) && isLng(b)) out.push([a, b]);
  }
  return out;
};

const createZoneIcon = (color: string) =>
  L.divIcon({
    className: 'zone-div-icon',
    html: `<div style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:${color};box-shadow:0 1px 4px rgba(0,0,0,0.25);">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
               <path d="M12 2C8.686 2 6 4.686 6 8c0 5 6 12 6 12s6-7 6-12c0-3.314-2.686-6-6-6z"/>
               <circle cx="12" cy="8" r="2" fill="white"/>
             </svg>
           </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36]
  });

const Heatmap = () => {
  const [activeFilters, setActiveFilters] = useState({ crime: true, lighting: true, cctv: true, accidents: true });
  const [showZoneInfo, setShowZoneInfo] = useState<string | null>(null);
  const [activeZoneId, setActiveZoneId] = useState<string | null>(mockSafetyZones?.[0]?.id ?? null);
  const [mapErrorKey, setMapErrorKey] = useState(0); // increment to force re-mount boundary
  const mapRef = useRef<any>(null);

  useEffect(() => { console.debug('mockSafetyZones', mockSafetyZones); }, []);

  const filters = [
    { key: 'crime', label: 'Crime', color: 'high-risk' },
    { key: 'lighting', label: 'Lighting', color: 'medium-risk' },
    { key: 'cctv', label: 'CCTV', color: 'safe' },
    { key: 'accidents', label: 'Accidents', color: 'safety-accent' }
  ];
  const toggleFilter = (filterKey: string) => setActiveFilters(prev => ({ ...prev, [filterKey]: !prev[filterKey as keyof typeof prev] }));

  const colorFor = (level: string) => {
    if (level === 'safe') return '#10b981';
    if (level === 'medium') return '#f59e0b';
    if (level === 'high') return '#ef4444';
    return '#6b7280';
  };

  const normalizedZones = useMemo(() => {
    return (mockSafetyZones || []).map((z: any) => {
      const coords = normalizeCoords(z.coords);
      const center = Array.isArray(z.center) && z.center.length >= 2 ? [Number(z.center[0]), Number(z.center[1])] : (coords[0] ?? null);
      return { ...z, coords, center };
    });
  }, []);

  const initialCenter = useMemo(() => {
    const z = normalizedZones[0];
    if (!z) return [0, 0] as [number, number];
    return z.center ?? [0, 0];
  }, [normalizedZones]);

  const safeActivateZone = (zoneId: string) => {
    setShowZoneInfo(prev => (prev === zoneId ? null : zoneId));
    setActiveZoneId(zoneId);
  };

  const centerZoneOnMap = (zoneId: string | null) => {
    try {
      const map = mapRef.current;
      if (!map || !zoneId) return;
      const z = normalizedZones.find((s: any) => s.id === zoneId);
      if (!z) return;
      if (Array.isArray(z.coords) && z.coords.length) {
        map.fitBounds(z.coords as any, { padding: [40, 40] });
      } else if (Array.isArray(z.center) && Number.isFinite(z.center[0])) {
        map.setView(z.center as any, 15);
      }
    } catch (err) {
      console.warn('centerZoneOnMap error', err);
    }
  };

  useEffect(() => { centerZoneOnMap(activeZoneId); }, [activeZoneId]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Interactive Safety Heatmap</h1>
          <p className="text-muted-foreground">Real-time visualization of urban safety zones</p>
        </div>
        <Button className="glass-button"><Eye className="w-4 h-4 mr-2" />Full Screen</Button>
      </div>

      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>

          {filters.map((filter) => (
            <Button
              key={filter.key}
              variant="outline"
              size="sm"
              className={`glass-button transition-all ${activeFilters[filter.key as keyof typeof activeFilters] ? `border-${filter.color}/50 text-${filter.color} bg-${filter.color}/10` : 'border-muted/30 text-muted-foreground'}`}
              onClick={() => toggleFilter(filter.key)}
            >
              {activeFilters[filter.key as keyof typeof activeFilters] ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="glass-card p-6 h-[600px] relative">
            <ErrorBoundary onReset={() => setMapErrorKey(k => k + 1)} key={mapErrorKey}>
              <MapContainer
                center={initialCenter as any}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                whenCreated={(mapInstance) => { mapRef.current = mapInstance; if (activeZoneId) centerZoneOnMap(activeZoneId); }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />

                {normalizedZones.map((zone: any) => {
                  const color = colorFor(zone.riskLevel);
                  const isActive = showZoneInfo === zone.id || activeZoneId === zone.id;
                  return (
                    <React.Fragment key={zone.id}>
                      {Array.isArray(zone.coords) && zone.coords.length > 2 && (
                        <Polygon
                          positions={zone.coords as any}
                          pathOptions={{ color, fillColor: color, fillOpacity: isActive ? 0.45 : 0.25, weight: isActive ? 3 : 2, dashArray: isActive ? undefined : '4' }}
                          eventHandlers={{ click: () => safeActivateZone(zone.id) }}
                        />
                      )}

                      {(zone.center || (zone.coords && zone.coords[0])) && (
                        <Marker
                          position={(zone.center ?? zone.coords?.[0]) as any}
                          icon={createZoneIcon(color)}
                          eventHandlers={{ click: () => safeActivateZone(zone.id) }}
                        >
                          <Popup minWidth={220} onClose={() => setShowZoneInfo(null)}>
                            <div className="p-1">
                              <div className="flex items-center gap-2 mb-2">
                                <div style={{ width: 10, height: 10, borderRadius: 6, background: color }} />
                                <h3 className="font-semibold">{zone.name}</h3>
                              </div>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <p>Safety Score: <span className="font-medium text-foreground">{zone.safetyScore}/100</span></p>
                                <p>Incidents: <span className="font-medium text-foreground">{zone.incidents}</span></p>
                                <p>Risk Level: <span className="font-medium">{String(zone.riskLevel ?? '').charAt(0).toUpperCase() + String(zone.riskLevel ?? '').slice(1)}</span></p>
                              </div>
                            </div>
                          </Popup>
                        </Marker>
                      )}
                    </React.Fragment>
                  );
                })}
              </MapContainer>
            </ErrorBoundary>

            <div className="absolute bottom-4 left-4 glass-card p-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4" />
                <span className="font-medium">Click zones for details</span>
              </div>
            </div>
          </div>
        </div>

        {/* right panels unchanged: keep existing legend/statistics/recent updates JSX */}
        <div className="space-y-6">
          {/* Risk Level Legend */}
          <div className="glass-card p-4">
            <h3 className="font-semibold mb-4">Risk Levels</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-safe rounded-full"></div>
                <div>
                  <p className="font-medium text-safe">Safe</p>
                  <p className="text-xs text-muted-foreground">Score: 80-100</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-medium-risk rounded-full"></div>
                <div>
                  <p className="font-medium text-medium-risk">Medium Risk</p>
                  <p className="text-xs text-muted-foreground">Score: 40-79</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-high-risk rounded-full"></div>
                <div>
                  <p className="font-medium text-high-risk">High Risk</p>
                  <p className="text-xs text-muted-foreground">Score: 0-39</p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Statistics */}
          <div className="glass-card p-4">
            <h3 className="font-semibold mb-4">Live Statistics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Safe Zones</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <div className="bg-safe h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Medium Risk</span>
                  <span className="font-medium">6</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <div className="bg-medium-risk h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>High Risk</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <div className="bg-high-risk h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Updates */}
          <div className="glass-card p-4">
            <h3 className="font-semibold mb-4">Recent Updates</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-safe rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium">New safe zone identified</p>
                  <p className="text-muted-foreground text-xs">Tech Park area - 2 min ago</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-medium-risk rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium">Risk level updated</p>
                  <p className="text-muted-foreground text-xs">Downtown - 5 min ago</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-high-risk rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium">Incident reported</p>
                  <p className="text-muted-foreground text-xs">Old City - 8 min ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;