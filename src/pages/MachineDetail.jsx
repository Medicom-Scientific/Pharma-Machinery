import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Tag, Check, ChevronLeft, ChevronRight, Leaf, Package, ShoppingCart, CheckCircle2, Trash2 } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";

function ImageWithFallback({ src, alt, className }) {
  const [errored, setErrored] = useState(false);
  if (errored || !src) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-muted to-muted/60 gap-3">
        <Package className="w-16 h-16 text-muted-foreground/30" />
        <span className="text-sm text-muted-foreground/50 font-medium px-6 text-center">{alt}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setErrored(true)} />;
}
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getMachineById, machines } from "../lib/catalogData";
import MachineCard from "../components/catalog/MachineCard";
import { motion, AnimatePresence } from "framer-motion";

export default function MachineDetail() {
  const { id } = useParams();
  const machine = getMachineById(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem, removeItem, isInQuote, openDrawer } = useQuote();
  const inQuote = machine ? isInQuote(machine.id) : false;

  if (!machine) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">⚠️</p>
          <h2 className="text-xl font-semibold mb-2">Machine Not Found</h2>
          <Link to="/catalog">
            <Button variant="outline" className="gap-2"><ArrowLeft className="w-4 h-4" /> Back to Catalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const related = machines.filter((m) => m.id !== machine.id && m.category === machine.category).slice(0, 3);
  const nextImage = () => setSelectedImage((prev) => (prev + 1) % machine.images.length);
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + machine.images.length) % machine.images.length);

  return (
    <div className="min-h-screen">
      <div className="bg-muted/50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/catalog" className="hover:text-foreground transition-colors">Catalog</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{machine.brand} {machine.model}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[4/3] mb-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <ImageWithFallback
                    src={machine.images[selectedImage]}
                    alt={`${machine.brand} ${machine.model}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              {machine.badge && (
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">{machine.badge}</Badge>
              )}
              {machine.images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            {machine.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {machine.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${i === selectedImage ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}
                  >
                    <ImageWithFallback src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="text-xs">{machine.category}</Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />{machine.location}
              </div>
            </div>
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-1">{machine.brand}</p>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-2">{machine.model}</h1>
            <p className="text-lg text-muted-foreground mb-6">{machine.type}</p>
            <div className="flex items-center gap-2 mb-6 text-xs text-muted-foreground">
              <Tag className="w-3 h-3" />SKU: {machine.sku}
            </div>
            <Separator className="mb-6" />
            <p className="text-sm text-foreground leading-relaxed mb-6">{machine.description}</p>

            <div className="bg-muted/50 rounded-xl p-5 mb-6">
              <h3 className="font-semibold text-sm text-foreground mb-3">Specifications</h3>
              <div className="space-y-2">
                {Object.entries(machine.specs).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{key}</span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold text-sm text-foreground mb-3">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {machine.features.map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-primary" />
                    </div>
                    <span className="text-xs text-foreground">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {inQuote ? (
                <div className="flex-1 flex gap-2">
                  <Button
                    onClick={openDrawer}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    In Your Quote
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => removeItem(machine.id)}
                    className="border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 gap-1.5 px-3"
                    title="Remove from quote"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => { addItem(machine); openDrawer(); }}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Quote
                </Button>
              )}
              <Link to="/catalog" className="flex-1">
                <Button variant="outline" className="w-full gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back to Catalog
                </Button>
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-3 bg-primary/5 border border-primary/10 rounded-xl p-4">
              <Leaf className="w-8 h-8 text-primary shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">Join Our Circular Mission</p>
                <p className="text-xs text-muted-foreground">Save on average 4.43 tonnes CO₂ per machine purchase</p>
              </div>
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">Related Machines</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((m, i) => <MachineCard key={m.id} machine={m} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
