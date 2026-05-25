import React from "react";
import { MapPin, Globe, ExternalLink, Leaf, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const features = [
  { icon: Globe, title: "Worldwide Export", desc: "We ship machinery to customers around the globe" },
  { icon: Clock, title: "Readily Available", desc: "All machines are ready on our premises for testing and shipment" },
  { icon: Leaf, title: "Trade-In Possible", desc: "Trade in your old equipment when purchasing from us" },
];

export default function Contact() {
  return (
    <div className="min-h-screen">
      <div className="bg-foreground text-background py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">Get in Touch</p>
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">Contact Medicom</h1>
            <p className="text-background/50 max-w-2xl">Our specialists are ready to help you find the right solution and support you throughout your project.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">Let's Connect</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Whether you're looking to buy, sell, or simply learn more about our available machinery, our experienced team is here to help.
            </p>
            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">Location</p>
                  <p className="text-sm text-muted-foreground">Ajman Free Zone - L1-07 - UAE</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">Website</p>
                  <a href="https://www.medicom-grp.com" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                    www.medicom-grp.com
                  </a>
                </div>
              </div>
            </div>
            <a href="https://www.medicom-grp.com" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-full sm:w-auto">
                Visit Medicom Website <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">Why Choose Medicom</h2>
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/20 hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-primary" />Looking to Sell?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">Turn your surplus equipment into cash. We buy process and packaging machinery from leading brands.</p>
              <a href="https://www.medicom-grp.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2">Contact Medicom <ExternalLink className="w-3.5 h-3.5" /></Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
