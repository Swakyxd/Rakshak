import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FileText, Download, Filter, Search, Calendar, Eye } from 'lucide-react';
import { mockIncidents } from '@/data/mockData';

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');

  const filteredIncidents = mockIncidents.filter(incident => {
    const matchesSearch = incident.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || incident.type === filterType;
    const matchesSeverity = filterSeverity === 'all' || incident.severity === filterSeverity;
    
    return matchesSearch && matchesType && matchesSeverity;
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high': return 'status-danger';
      case 'medium': return 'status-medium';
      case 'low': return 'status-safe';
      default: return 'status-safe';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved': return 'status-safe';
      case 'investigating': return 'status-medium';
      case 'open': return 'status-danger';
      default: return 'status-safe';
    }
  };

  const reportSummary = {
    totalIncidents: mockIncidents.length,
    resolvedIncidents: mockIncidents.filter(i => i.status === 'resolved').length,
    highSeverity: mockIncidents.filter(i => i.severity === 'high').length,
    avgResponseTime: '12.5 mins'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Safety Reports</h1>
          <p className="text-muted-foreground">Comprehensive incident analysis and documentation</p>
        </div>
        
        <Button className="glass-button glow-accent">
          <Download className="w-4 h-4 mr-2" />
          Export PDF Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{reportSummary.totalIncidents}</p>
              <p className="text-sm text-muted-foreground">Total Incidents</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-safe/20 rounded-lg">
              <FileText className="w-5 h-5 text-safe" />
            </div>
            <div>
              <p className="text-2xl font-bold text-safe">{reportSummary.resolvedIncidents}</p>
              <p className="text-sm text-muted-foreground">Resolved</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-high-risk/20 rounded-lg">
              <FileText className="w-5 h-5 text-high-risk" />
            </div>
            <div>
              <p className="text-2xl font-bold text-high-risk">{reportSummary.highSeverity}</p>
              <p className="text-sm text-muted-foreground">High Severity</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-medium-risk/20 rounded-lg">
              <Calendar className="w-5 h-5 text-medium-risk" />
            </div>
            <div>
              <p className="text-2xl font-bold">{reportSummary.avgResponseTime}</p>
              <p className="text-sm text-muted-foreground">Avg Response</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="glass-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-button"
              />
            </div>
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48 glass-button">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="theft">Theft</SelectItem>
              <SelectItem value="assault">Assault</SelectItem>
              <SelectItem value="vandalism">Vandalism</SelectItem>
              <SelectItem value="lighting">Lighting</SelectItem>
              <SelectItem value="cctv">CCTV</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterSeverity} onValueChange={setFilterSeverity}>
            <SelectTrigger className="w-48 glass-button">
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Incidents Table */}
      <div className="glass-card">
        <div className="p-4 border-b border-border/50">
          <h2 className="text-xl font-semibold">Incident Reports</h2>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIncidents.map((incident) => (
                <TableRow key={incident.id} className="border-border/50 hover:bg-muted/20">
                  <TableCell className="font-mono text-sm">#{incident.id}</TableCell>
                  <TableCell>
                    <span className="capitalize font-medium">{incident.type}</span>
                  </TableCell>
                  <TableCell>{incident.location}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getSeverityBadge(incident.severity)}`}>
                      {incident.severity}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusBadge(incident.status)}`}>
                      {incident.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(incident.timestamp).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="glass-button">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Predicted Hotspots */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4">AI-Predicted Hotspots</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-high-risk/20 to-high-risk/10 border border-high-risk/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-high-risk">Downtown Mall</h3>
              <span className="text-xs text-high-risk">95% Risk</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              High probability of theft incidents during evening hours
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Next 24 hours</span>
              <Button size="sm" variant="outline" className="glass-button text-xs">
                View Details
              </Button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-medium-risk/20 to-medium-risk/10 border border-medium-risk/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-medium-risk">Park Street</h3>
              <span className="text-xs text-medium-risk">72% Risk</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Lighting issues may lead to safety concerns after sunset
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Next 48 hours</span>
              <Button size="sm" variant="outline" className="glass-button text-xs">
                View Details
              </Button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-safe/20 to-safe/10 border border-safe/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-safe">Tech Park</h3>
              <span className="text-xs text-safe">28% Risk</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Improved security measures showing positive impact
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Next week</span>
              <Button size="sm" variant="outline" className="glass-button text-xs">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;