import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight, Package, ShoppingCart, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useQuote } from "@/context/QuoteContext";

function ImageWithFallback({ src, alt, className }) {
  const [errored, setErrored] = useState(false);

  if (errored || !src) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-muted to-muted/60 gap-3">
        <Package className="w-12 h-12 text-muted-foreground/30" />
        <span className="text-xs text-muted-foreground/50 font-medium px-4 text-center">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}

export default function MachineCard({ machine, index = 0 }) {
  const { addItem, removeItem, isInQuote } = useQuote();
  const inQuote = isInQuote(machine.id);

  const handleQuoteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inQuote) {
      removeItem(machine.id);
    } else {
      addItem(machine);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.2) }}
    >
      <Link
        to={`/catalog/${machine.id}`}
        className="group block bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-500"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <ImageWithFallback
            src={machine.image}
            alt={`${machine.brand} ${machine.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {machine.badge && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-semibold">
              {machine.badge}
            </Badge>
          )}

          {/* Quote toggle button */}
          <button
            onClick={handleQuoteClick}
            title={inQuote ? "Remove from quote" : "Add to quote"}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 ${
              inQuote
                ? "bg-green-600 text-white opacity-100 hover:bg-red-500 hover:scale-110"
                : "bg-white/90 backdrop-blur text-primary opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-white hover:scale-110"
            }`}
          >
            {inQuote ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <ShoppingCart className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        <div className="p-5">
          <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">{machine.brand}</p>
          <h3 className="font-semibold text-foreground text-sm leading-tight mb-1 group-hover:text-primary transition-colors">{machine.model}</h3>
          <p className="text-muted-foreground text-xs mb-3">{machine.type}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />{machine.location}
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Details <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
