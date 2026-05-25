import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MachineCard from "../components/catalog/MachineCard";
import { machines, categories } from "../lib/catalogData";
import { motion } from "framer-motion";

const allCategories = categories.map((c) => c.name);

const allBrands = [...new Set(machines.map((m) => m.brand))].sort();

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(() => {
    const cat = searchParams.get("category");
    return cat && allCategories.includes(cat) ? cat : "all";
  });
  const [brand, setBrand] = useState("all");

  // Sync category state when URL param changes (e.g. navigating from home/categories while already on catalog)
  useEffect(() => {
    const cat = searchParams.get("category");
    const resolved = cat && allCategories.includes(cat) ? cat : "all";
    setCategory(resolved);
  }, [searchParams]);

  const filtered = useMemo(() => {
    return machines.filter((m) => {
      const matchSearch = !search ||
        m.model.toLowerCase().includes(search.toLowerCase()) ||
        m.brand.toLowerCase().includes(search.toLowerCase()) ||
        m.type.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "all" || m.category === category;
      const matchBrand = brand === "all" || m.brand === brand;
      return matchSearch && matchCat && matchBrand;
    });
  }, [search, category, brand]);

  const clearFilters = () => { setSearch(""); setCategory("all"); setBrand("all"); };
  const hasFilters = search || category !== "all" || brand !== "all";

  return (
    <div className="min-h-screen">
      <div className="bg-foreground text-background py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">Full Inventory</p>
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">Machine Catalog</h1>
            <p className="text-background/50 max-w-2xl">
              Browse our extensive inventory of 750+ used and reconditioned machines from Europe's leading manufacturers.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="sticky top-16 lg:top-20 z-40 bg-card/95 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search machines, brands, types..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {allCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={brand} onValueChange={setBrand}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {allBrands.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
              </SelectContent>
            </Select>
            {hasFilters && (
              <Button variant="ghost" onClick={clearFilters} className="text-muted-foreground text-sm">Clear</Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span> machines found
          </p>
          {hasFilters && (
            <div className="flex gap-2 flex-wrap">
              {category !== "all" && <Badge variant="secondary" className="text-xs">{category}</Badge>}
              {brand !== "all" && <Badge variant="secondary" className="text-xs">{brand}</Badge>}
            </div>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((machine, i) => (
              <MachineCard key={machine.id} machine={machine} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <h3 className="text-lg font-semibold text-foreground mb-2">No machines found</h3>
            <p className="text-sm text-muted-foreground mb-4">Try adjusting your search or filters</p>
            <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}
