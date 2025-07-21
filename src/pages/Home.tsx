import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LeadForm } from "@/components/LeadForm";
import { 
  Zap, 
  Target, 
  BarChart3, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Star,
  TrendingUp
} from "lucide-react";
import { NavLink } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: Target,
    title: "Smart Lead Capture",
    description: "Beautiful, converting forms that integrate seamlessly with your website"
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Track performance, conversion rates, and lead quality in real-time"
  },
  {
    icon: Zap,
    title: "CRM Integration",
    description: "Connect with HubSpot, Salesforce, Pipedrive, and 20+ other CRMs"
  },
  {
    icon: Users,
    title: "Lead Management",
    description: "Organize, score, and nurture leads with intelligent automation"
  }
];

const benefits = [
  "Increase conversion rates by up to 40%",
  "Reduce manual data entry by 90%",
  "Scale your lead generation effortlessly",
  "Get insights that drive better decisions"
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    content: "LeadGen Pro transformed our lead generation. We've seen a 3x increase in qualified leads.",
    rating: 5
  },
  {
    name: "Mike Chen",
    role: "Sales Manager", 
    company: "GrowthCo",
    content: "The CRM integration is seamless. Our sales team loves the automated lead scoring.",
    rating: 5
  }
];

export const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-card/95 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">LeadGen Pro</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="text-sm hover:text-primary transition-colors">Pricing</a>
            <a href="#testimonials" className="text-sm hover:text-primary transition-colors">Reviews</a>
          </nav>

          <div className="flex items-center gap-3">
            <NavLink to="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </NavLink>
            <Button variant="gradient">Start Free Trial</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 bg-gradient-secondary overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(240, 242, 247, 0.9), rgba(240, 242, 247, 0.8)), url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Generate More
                  <span className="block bg-gradient-primary bg-clip-text text-transparent">
                    Quality Leads
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  The all-in-one lead generation platform that captures, qualifies, and converts 
                  prospects into customers. Connect with any CRM in minutes.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="gradient" size="lg" className="flex-1 sm:flex-none">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>40% higher conversions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>10,000+ users</span>
                </div>
              </div>
            </div>

            <div className="lg:pl-8">
              <LeadForm compact onLeadSubmit={(lead) => console.log("Lead captured:", lead)} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Everything You Need to Generate Leads</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to capture, qualify, and convert more leads
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Loved by Marketing Teams</h2>
            <p className="text-xl text-muted-foreground">
              See why thousands of businesses trust LeadGen Pro
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="border-0 shadow-md">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <blockquote className="text-lg italic">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-4xl font-bold">Ready to Generate More Leads?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of businesses already using LeadGen Pro to capture and convert more leads
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Contact Sales
            </Button>
          </div>
          <p className="text-sm opacity-75">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-primary rounded flex items-center justify-center">
                  <Zap className="w-3 h-3 text-primary-foreground" />
                </div>
                <span className="font-bold">LeadGen Pro</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The modern lead generation platform for growing businesses.
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Product</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Features</div>
                <div>Integrations</div>
                <div>Pricing</div>
                <div>API</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>About</div>
                <div>Blog</div>
                <div>Careers</div>
                <div>Contact</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Help Center</div>
                <div>Documentation</div>
                <div>Community</div>
                <div>Status</div>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 LeadGen Pro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};