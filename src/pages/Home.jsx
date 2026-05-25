import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import HeroSection from "../components/catalog/HeroSection";
import BrandBanner from "../components/catalog/BrandBanner";
import MachineCard from "../components/catalog/MachineCard";
import { machines, categories } from "../lib/catalogData";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function Home() {
  return (
    <div>
      <HeroSection />
      <BrandBanner />

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
            <div>
              <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">New Arrivals</p>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground">Featured Machines</h2>
            </div>
            <Link to="/catalog" className="mt-4 sm:mt-0">
              <Button variant="outline" className="gap-2">View All <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {machines.slice(0, 6).map((machine, i) => (
              <MachineCard key={machine.id} machine={machine} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">Browse by</p>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground">Equipment Categories</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  to={`/catalog?category=${encodeURIComponent(cat.name)}`}
                  className="group block p-6 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-3xl mb-3 block">{cat.icon}</span>
                  <h3 className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground">{cat.count}+ machines</p>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/categories">
              <Button variant="outline" className="gap-2">All Categories <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeUp}>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
                <Leaf className="w-3.5 h-3.5" />
                Sustainability Mission
              </div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-6">
                A Second Life for Pharma & Process Machinery
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                At Intimac, sustainability is built into the way we do business. By extending the life of high-quality process and packaging machinery, we help prevent unnecessary new production and reduce waste.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "46,997.7 tonnes CO₂ reduced total",
                  "Average 4.43 tonnes CO₂ saved per machine",
                  "Solar panels on all facility roofs",
                  "Net-zero carbon goal for direct operations",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <a href="https://www.intimac.it/en/about/mission/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">Learn More <ArrowRight className="w-4 h-4" /></Button>
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden aspect-square shadow-2xl">
                <img
                  src="https://www.intimac.it/_next/image/?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F290336016608659%2F3008x2000%2Fa05e787648%2Fintimacmachinebottlecapper.jpg%2Fm%2F0x350%2Fsmart%2Ffilters%3Aformat(webp)&w=3840&q=75"
                  alt="Intimac sustainability"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl">
                <p className="text-3xl font-bold font-display">30+</p>
                <p className="text-sm opacity-80">Years Experience</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
              Your Address for Premium Quality<br />
              <span className="text-primary">Used & Reconditioned Machinery</span>
            </h2>
            <p className="text-background/60 max-w-2xl mx-auto leading-relaxed mb-8">
              Intimac helps manufacturers move faster and operate more sustainably by supplying premium quality used and reconditioned process and packaging machinery. With 30+ years of experience, we serve customers worldwide across pharmaceutical, cosmetics, chemical, veterinary and food sectors.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/about">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  About Intimac <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-background/20 text-background hover:bg-background/10">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
