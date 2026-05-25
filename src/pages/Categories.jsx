import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Package } from "lucide-react";
import { categories, machines } from "../lib/catalogData";
import { motion } from "framer-motion";

function CategoryImage({ categoryName }) {
  const [errored, setErrored] = useState(false);
  const machine = machines.find((m) => m.category === categoryName && m.image);

  if (!machine || errored) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
        <Package className="w-10 h-10 text-muted-foreground/20" />
      </div>
    );
  }

  return (
    <img
      src={machine.image}
      alt={categoryName}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      onError={() => setErrored(true)}
    />
  );
}

export default function Categories() {
  return (
    <div className="min-h-screen">
      <div className="bg-foreground text-background py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">Equipment</p>
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">Categories</h1>
            <p className="text-background/50 max-w-2xl">
              Explore our comprehensive range of used and reconditioned machinery organized by equipment type.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="space-y-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="group"
            >
              <Link
                to={`/catalog?category=${encodeURIComponent(cat.name)}`}
                className="flex flex-col sm:flex-row bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-lg transition-all duration-300"
              >
                {/* Machine photo thumbnail */}
                <div className="sm:w-44 h-40 sm:h-auto shrink-0 overflow-hidden bg-muted">
                  <CategoryImage categoryName={cat.name} />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                  <div className="flex items-center gap-4 lg:w-64 shrink-0">
                    <span className="text-3xl">{cat.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-primary font-medium">{cat.count}+ machines</p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-3">{cat.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {cat.subcategories.map((sub) => (
                        <span
                          key={sub}
                          className="inline-block bg-muted text-muted-foreground text-xs px-3 py-1.5 rounded-full"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity self-center">
                    Browse <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
