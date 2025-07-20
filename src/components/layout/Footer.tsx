
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd connect this to a newsletter service like Mailchimp
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setEmail("");
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="font-bold text-xl mb-4 inline-block text-primary">
              Daily Scope
            </Link>
            <p className="text-muted-foreground mb-6">
              Stay informed with our comprehensive news coverage across politics,
              technology, sports, world events and more.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <h3 className="font-semibold">Subscribe to our newsletter</h3>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit">Subscribe</Button>
              </div>
            </form>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/politics" className="text-muted-foreground hover:text-primary transition-colors">
                  Politics
                </Link>
              </li>
              <li>
                <Link to="/category/technology" className="text-muted-foreground hover:text-primary transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/category/sport" className="text-muted-foreground hover:text-primary transition-colors">
                  Sports
                </Link>
              </li>
              <li>
                <Link to="/category/world" className="text-muted-foreground hover:text-primary transition-colors">
                  World
                </Link>
              </li>
              <li>
                <Link to="/category/business" className="text-muted-foreground hover:text-primary transition-colors">
                  Business
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/about#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/about#privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/about#terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t text-center text-muted-foreground text-sm">
          <p>&copy; {currentYear} Daily Scope News. All rights reserved. Created by Code Cadence.</p>
          <p className="mt-2">
            Powered by The Guardian API. This site is not affiliated with The Guardian.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
