import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Shield, Brain, Navigation, BarChart3, Eye, Zap } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Real-time Safety",
      description: "Live monitoring of safety incidents and risk assessment across urban areas"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Predictions", 
      description: "Machine learning algorithms predict potential safety risks before they occur"
    },
    {
      icon: <Navigation className="w-8 h-8" />,
      title: "Safer Navigation",
      description: "Get optimal routes that prioritize your safety while maintaining efficiency"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Data-driven Insights",
      description: "Comprehensive analytics and reporting for informed decision making"
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-safe/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-safe/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Title */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-gradient">Urban Safety</span>
                <br />
                <span className="text-foreground">Heatmap</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                AI-Powered Insights for Safer Cities
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                size="lg" 
                className="glass-button glow-accent text-lg px-8 py-6 h-auto"
                onClick={() => navigate('/dashboard')}
              >
                <Eye className="w-6 h-6 mr-2" />
                View Dashboard
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="glass-button text-lg px-8 py-6 h-auto border-safe/30 text-safe hover:bg-safe/10"
                onClick={() => navigate('/dashboard/routes')}
              >
                <Navigation className="w-6 h-6 mr-2" />
                Plan Safer Route
              </Button>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-safe mb-2">24</div>
                <div className="text-sm text-muted-foreground">Incidents Today</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-medium-risk mb-2">7</div>
                <div className="text-sm text-muted-foreground">High Risk Zones</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">85%</div>
                <div className="text-sm text-muted-foreground">Patrol Coverage</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-safe mb-2">68</div>
                <div className="text-sm text-muted-foreground">Safety Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-muted-foreground">
            Advanced technology for comprehensive urban safety monitoring
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card p-8 text-center hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-safe/20 rounded-2xl mb-6 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="glass-card p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make Your City Safer?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of cities using AI-powered safety insights
          </p>
          <Button 
            size="lg"
            className="glass-button glow-accent text-lg px-8 py-6 h-auto"
            onClick={() => navigate('/dashboard')}
          >
            <Zap className="w-6 h-6 mr-2" />
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;