import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Globe, Award, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const stats = [
  { icon: Globe, label: "Worldwide Export", value: "Global" },
  { icon: Award, label: "Premium Tested", value: "750+" },
  { icon: Zap, label: "CO₂ Saved", value: "46,997t" },
  { icon: Truck, label: "Readily Available", value: "Fast" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-semibold mb-6 tracking-wider uppercase">
              <Zap className="w-3.5 h-3.5" />Tailored · Flexible · Fast
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-background leading-tight mb-6">
              Premium Pharma<span className="block text-primary">Machinery</span>Catalog
            </h1>
            <p className="text-background/60 text-lg leading-relaxed mb-8 max-w-lg">
              Production and packaging machinery for the pharmaceutical, chemical and cosmetic industry. Used & reconditioned equipment from Europe's leading brands.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/catalog">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-full sm:w-auto">
                  Browse Catalog <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/categories">
                <Button size="lg" variant="outline" className="border-background/20 text-background hover:bg-background/10 w-full sm:w-auto">
                  View Categories
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
              <img
                src="https://www.intimac.it/_next/image/?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F290336016608659%2F3008x2000%2Fa05e787648%2Fintimacmachinebottlecapper.jpg%2Fm%2F840x0%2Ffilters%3Aformat(webp)&w=1920&q=75"
                alt="Intimac machinery"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-background/80 text-sm font-medium">A Foeth Company</p>
                <p className="text-background text-lg font-semibold">30+ Years of Excellence</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-background/5 backdrop-blur-sm border border-background/10 rounded-xl p-5 text-center">
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-background">{stat.value}</p>
              <p className="text-background/50 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
