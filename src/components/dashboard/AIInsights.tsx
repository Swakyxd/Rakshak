import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Brain, AlertTriangle, Clock, Target } from 'lucide-react';
import { dashboardStats } from '@/data/mockData';

const AIInsights = () => {
  const predictions = [
    {
      title: 'Crime Peak Hours',
      description: 'AI predicts highest crime risk between 10 PM - 2 AM',
      confidence: 87,
      type: 'time-based',
      icon: <Clock className="w-5 h-5" />
    },
    {
      title: 'High-Risk Zone Alert',
      description: 'Downtown area may see 23% increase in incidents this week',
      confidence: 73,
      type: 'location-based',
      icon: <AlertTriangle className="w-5 h-5" />
    },
    {
      title: 'Patrol Optimization',
      description: 'Suggest 2 additional units in Business District on weekends',
      confidence: 91,
      type: 'resource-optimization',
      icon: <Target className="w-5 h-5" />
    }
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-safe';
    if (confidence >= 60) return 'text-medium-risk';
    return 'text-high-risk';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-primary/20 to-safe/20 rounded-xl">
          <Brain className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gradient">AI Insights & Predictions</h1>
          <p className="text-muted-foreground">Machine learning powered safety analytics</p>
        </div>
      </div>

      {/* AI Predictions */}
      <div className="grid md:grid-cols-3 gap-6">
        {predictions.map((prediction, index) => (
          <div key={index} className="glass-card p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg text-primary">
                {prediction.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{prediction.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{prediction.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Confidence</span>
                  <span className={`text-sm font-medium ${getConfidenceColor(prediction.confidence)}`}>
                    {prediction.confidence}%
                  </span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2 mt-1">
                  <div 
                    className={`h-2 rounded-full ${
                      prediction.confidence >= 80 ? 'bg-safe' : 
                      prediction.confidence >= 60 ? 'bg-medium-risk' : 
                      'bg-high-risk'
                    }`}
                    style={{ width: `${prediction.confidence}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Crime Trends Chart */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Crime Trends Analysis</h2>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardStats.trends.crimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Line 
                type="monotone" 
                dataKey="incidents" 
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: 'hsl(var(--primary))' }}
              />
            </LineChart>
          </ResponsiveContainer>
          
          <div className="mt-4 p-3 bg-gradient-to-r from-safe/20 to-safe/10 border border-safe/30 rounded-lg">
            <p className="text-sm text-safe font-medium">
              ↓ 15% decrease in incidents this month compared to last month
            </p>
          </div>
        </div>

        {/* Hourly Risk Distribution */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-medium-risk" />
            <h2 className="text-xl font-semibold">Risk by Time of Day</h2>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardStats.trends.hourlyRisk}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="hour" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Bar 
                dataKey="risk" 
                fill="hsl(var(--medium-risk))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="mt-4 p-3 bg-gradient-to-r from-medium-risk/20 to-medium-risk/10 border border-medium-risk/30 rounded-lg">
            <p className="text-sm text-medium-risk font-medium">
              Peak risk hours: 9 PM - 12 AM
            </p>
          </div>
        </div>

        {/* Incident Type Breakdown */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-high-risk" />
            <h2 className="text-xl font-semibold">Incident Categories</h2>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardStats.trends.incidentTypes}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {dashboardStats.trends.incidentTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            {dashboardStats.trends.incidentTypes.map((type, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: type.color }}
                ></div>
                <span className="text-muted-foreground">{type.name}</span>
                <span className="font-medium ml-auto">{type.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Model Performance */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">AI Model Performance</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Crime Prediction Accuracy</span>
                <span className="font-medium text-safe">94.2%</span>
              </div>
              <div className="w-full bg-muted/20 rounded-full h-3">
                <div className="bg-safe h-3 rounded-full" style={{ width: '94.2%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Risk Assessment Precision</span>
                <span className="font-medium text-safe">91.7%</span>
              </div>
              <div className="w-full bg-muted/20 rounded-full h-3">
                <div className="bg-safe h-3 rounded-full" style={{ width: '91.7%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Route Optimization</span>
                <span className="font-medium text-medium-risk">87.3%</span>
              </div>
              <div className="w-full bg-muted/20 rounded-full h-3">
                <div className="bg-medium-risk h-3 rounded-full" style={{ width: '87.3%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Anomaly Detection</span>
                <span className="font-medium text-safe">96.1%</span>
              </div>
              <div className="w-full bg-muted/20 rounded-full h-3">
                <div className="bg-safe h-3 rounded-full" style={{ width: '96.1%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-lg">
            <p className="text-sm text-primary font-medium">
              Models last updated: 2 hours ago
            </p>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-6">AI-Generated Recommendations</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium text-safe">Safety Improvements</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-safe/10 border border-safe/20 rounded-lg">
                <div className="w-2 h-2 bg-safe rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-sm">Install additional street lights</p>
                  <p className="text-xs text-muted-foreground">Priority: High | Impact: +12% safety score</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-safe/10 border border-safe/20 rounded-lg">
                <div className="w-2 h-2 bg-safe rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-sm">Increase patrol frequency in Zone 3</p>
                  <p className="text-xs text-muted-foreground">Priority: Medium | Impact: +8% safety score</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-medium-risk">Resource Allocation</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-medium-risk/10 border border-medium-risk/20 rounded-lg">
                <div className="w-2 h-2 bg-medium-risk rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-sm">Deploy mobile units during peak hours</p>
                  <p className="text-xs text-muted-foreground">Cost savings: 15% | Efficiency: +20%</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-medium-risk/10 border border-medium-risk/20 rounded-lg">
                <div className="w-2 h-2 bg-medium-risk rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-sm">Optimize CCTV coverage gaps</p>
                  <p className="text-xs text-muted-foreground">Coverage: +18% | ROI: High</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;