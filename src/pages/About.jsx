import React from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, MapPin, Award, Leaf, Globe, Users, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const values = [
  { icon: Recycle, title: "Circular Economy", desc: "Extending the life of premium equipment to reduce waste and environmental impact." },
  { icon: Award, title: "Premium Quality", desc: "Only machines from trusted European manufacturers, inspected and tested before shipment." },
  { icon: Globe, title: "Worldwide Service", desc: "Serving customers globally across pharma, cosmetics, chemical, veterinary and food sectors." },
  { icon: Users, title: "Expert Team", desc: "30+ years of hands-on experience in process and packaging machinery." },
];

const sectors = ["Pharmaceutical", "Cosmetics", "Chemical", "Veterinary", "Food"];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function About() {
  return (
    <div className="min-h-screen">
      <div className="bg-foreground text-background py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">About Us</p>
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">
              Your Address for Premium Quality<br />Used & Reconditioned Machinery
            </h1>
            <p className="text-background/50 max-w-3xl text-lg">
              Medicom Group helps manufacturers move faster and operate more sustainably by supplying premium quality used and reconditioned process and packaging machinery.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl font-display font-bold text-foreground mb-6">30+ Years Serving the Industry</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By extending the life of high-quality equipment instead of producing new machines, we support a circular industry and reduce environmental impact.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                From our facility in the Ajman Free Zone, UAE, we offer a strong inventory sourced from leading European brands, combined with practical, end-to-end support from selection and documentation to installation and commissioning.
              </p>
              <div className="flex items-start gap-3 bg-muted/50 rounded-xl p-4 mb-6">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm text-foreground">Ajman Free Zone - L1-07 - UAE</p>
                  <p className="text-xs text-muted-foreground">Strategically located for fast international shipment</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Industries Served</p>
                <div className="flex flex-wrap gap-2">
                  {sectors.map((s) => (
                    <span key={s} className="bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src="https://www.intimac.it/_next/image/?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F290336016608659%2F3008x2000%2Fa05e787648%2Fintimacmachinebottlecapper.jpg%2Fm%2F840x0%2Ffilters%3Aformat(webp)&w=1920&q=75"
                  alt="Intimac facility"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">Our Values</p>
            <h2 className="text-3xl font-display font-bold text-foreground">What Drives Us</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-background rounded-2xl border border-border p-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="bg-primary/5 border border-primary/10 rounded-3xl p-8 lg:p-14">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <Leaf className="w-10 h-10 text-primary mb-4" />
                <h2 className="text-3xl font-display font-bold text-foreground mb-4">Let's Move Towards a Lower-Carbon Industry</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Circularity is at the centre of our work. By choosing used or reconditioned equipment through Medicom, you actively contribute to a lower environmental impact.
                </p>
                <div className="space-y-3">
                  {[
                    "New machinery starts with raw stainless steel — significant energy & emissions",
                    "Pre-owned machines avoid raw material production emissions",
                    "Sell, don't scrap — keep machines in productive use",
                    "Solar panels installed on our facility roofs",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "46,997", label: "Tonnes CO₂ reduced" },
                  { value: "4.43", label: "Tonnes saved per machine" },
                  { value: "750+", label: "Machines in stock" },
                  { value: "30+", label: "Years experience" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-background rounded-2xl p-6 text-center shadow-sm">
                    <p className="text-3xl font-display font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-foreground text-background text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-display font-bold mb-4">Ready to Find Your Machine?</h2>
          <p className="text-background/50 mb-6">Browse our catalog or get in touch with our team for personalized assistance.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/catalog">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">Browse Catalog <ArrowRight className="w-4 h-4" /></Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-background/20 text-background hover:bg-background/10">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
