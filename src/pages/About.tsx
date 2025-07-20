
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const About = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
  };

  return (
    <div className="container py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">About Daily Scope</h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
          Your trusted source for the latest news and developments from around the world
        </p>
      </header>

      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              Daily Scope was founded with a simple yet powerful mission: to provide readers with accurate, timely, and comprehensive news coverage from around the globe.
            </p>
            <p className="text-muted-foreground mb-4">
              In a world saturated with information, we strive to cut through the noise and deliver news that matters, presented clearly and accessibly.
            </p>
            <p className="text-muted-foreground">
              We believe in the power of well-informed citizens and the critical role of independent journalism in maintaining a healthy democratic society.
            </p>
          </div>
          <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
            <span className="text-2xl font-bold text-muted-foreground">Daily Scope</span>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Accuracy",
              description: "We verify our facts and sources, ensuring our readers receive reliable information.",
            },
            {
              title: "Independence",
              description: "We maintain editorial independence, free from political and commercial influence.",
            },
            {
              title: "Accessibility",
              description: "We present complex topics in a clear, understandable manner for all readers.",
            },
          ].map((value) => (
            <Card key={value.title}>
              <CardHeader>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="contact" className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="Your email" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea placeholder="Your message" rows={4} required />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Get in Touch</h3>
            <p className="text-muted-foreground mb-6">
              Have questions, feedback, or news tips? We'd love to hear from you. Fill out the contact form or reach out to us directly using the information below.
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Email</h4>
                <p className="text-muted-foreground">contact@dailyscope.example</p>
              </div>
              <div>
                <h4 className="font-medium">Address</h4>
                <p className="text-muted-foreground">
                  123 News Street<br />
                  Media City, MS 12345<br />
                  United States
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="privacy" className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Privacy Policy</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4">
              Daily Scope respects your privacy and is committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website.
            </p>
            <p className="text-muted-foreground mb-4">
              We collect minimal information required to provide our services. This includes cookies to enhance your browsing experience and analytics to improve our content.
            </p>
            <p className="text-muted-foreground">
              For newsletter subscriptions, we collect your email address solely to deliver the newsletter you requested. You can unsubscribe at any time using the link provided in each newsletter.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="terms">
        <h2 className="text-2xl font-bold mb-6">Terms of Service</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4">
              By accessing Daily Scope, you agree to these Terms of Service. The content on our site is provided for general information only.
            </p>
            <p className="text-muted-foreground mb-4">
              We strive for accuracy but cannot guarantee that all content will be error-free or up-to-date. We reserve the right to modify or discontinue any aspect of our service without notice.
            </p>
            <p className="text-muted-foreground">
              All content on Daily Scope is protected by copyright. You may not reproduce, distribute, or create derivative works without our prior written consent.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default About;
