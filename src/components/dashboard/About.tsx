import React from 'react';
import { Shield, Users, Award, Globe, Github, Linkedin, Mail } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'AI/ML Engineer',
      bio: 'Specialist in predictive analytics and machine learning algorithms for urban safety.',
      avatar: '👨‍💻'
    },
    {
      name: 'Sarah Johnson',
      role: 'Full-Stack Developer',
      bio: 'Expert in React, Node.js, and building scalable web applications.',
      avatar: '👩‍💻'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Data Scientist',
      bio: 'Focused on crime data analysis and statistical modeling for safety insights.',
      avatar: '👨‍🔬'
    },
    {
      name: 'Emily Davis',
      role: 'UX/UI Designer',
      bio: 'Creates intuitive and accessible interfaces for complex data visualization.',
      avatar: '👩‍🎨'
    }
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Real-time Safety Monitoring',
      description: 'Live tracking and analysis of urban safety incidents with instant alerts and notifications.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'AI-Powered Predictions',
      description: 'Machine learning algorithms analyze patterns to predict potential safety risks before they occur.'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Smart Route Planning',
      description: 'Optimized navigation that balances safety, efficiency, and real-time risk assessment.'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Comprehensive Analytics',
      description: 'Data-driven insights and reporting for informed decision-making by city planners and officials.'
    }
  ];

  const technologies = [
    'React & TypeScript',
    'Machine Learning (Python)',
    'Mapbox API',
    'Real-time Analytics',
    'Cloud Infrastructure',
    'Data Visualization'
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-safe/20 rounded-2xl mb-6">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-gradient mb-4">Urban Safety Heatmap</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          AI-powered insights for creating safer cities through intelligent data analysis and predictive modeling
        </p>
      </div>

      {/* Project Overview */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-semibold mb-6">Project Overview</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4 text-primary">Mission</h3>
            <p className="text-muted-foreground mb-6">
              Our mission is to leverage artificial intelligence and data analytics to create safer urban environments. 
              By analyzing crime patterns, infrastructure data, and real-time incidents, we provide city officials and 
              citizens with actionable insights to make informed safety decisions.
            </p>
            
            <h3 className="text-lg font-medium mb-4 text-primary">Vision</h3>
            <p className="text-muted-foreground">
              We envision a future where technology proactively prevents crime and enhances public safety through 
              predictive analytics, optimized resource allocation, and community-driven insights.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-primary">Impact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-safe rounded-full"></div>
                <span className="text-sm">15% reduction in response times</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-safe rounded-full"></div>
                <span className="text-sm">23% improvement in resource allocation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-safe rounded-full"></div>
                <span className="text-sm">87% accuracy in risk prediction</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-safe rounded-full"></div>
                <span className="text-sm">50+ cities considering implementation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4 p-4 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors">
              <div className="p-3 bg-gradient-to-br from-primary/20 to-safe/20 rounded-xl text-primary flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Meet Our Team</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors">
              <div className="text-4xl mb-4">{member.avatar}</div>
              <h3 className="font-semibold mb-1">{member.name}</h3>
              <p className="text-sm text-primary mb-3">{member.role}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
              
              <div className="flex justify-center gap-2 mt-4">
                <button className="p-2 glass-button rounded-lg text-muted-foreground hover:text-foreground">
                  <Github className="w-4 h-4" />
                </button>
                <button className="p-2 glass-button rounded-lg text-muted-foreground hover:text-foreground">
                  <Linkedin className="w-4 h-4" />
                </button>
                <button className="p-2 glass-button rounded-lg text-muted-foreground hover:text-foreground">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Technology Stack</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {technologies.map((tech, index) => (
              <div key={index} className="p-3 bg-muted/20 rounded-lg text-center">
                <span className="text-sm font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Hackathon Project</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Event</p>
              <p className="font-medium">Urban Innovation Hackathon 2024</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Duration</p>
              <p className="font-medium">48 Hours</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Category</p>
              <p className="font-medium">Smart Cities & Public Safety</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Achievement</p>
              <p className="font-medium text-safe">🏆 Best Innovation Award</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="glass-card p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <p className="text-muted-foreground mb-6">
          Interested in implementing this solution in your city? We'd love to hear from you.
        </p>
        
        <div className="flex justify-center gap-4">
          <button className="glass-button px-6 py-3 rounded-xl font-medium">
            Contact Us
          </button>
          <button className="glass-button px-6 py-3 rounded-xl font-medium border-primary/30 text-primary">
            View on GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;