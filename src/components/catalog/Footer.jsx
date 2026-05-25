import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Globe, Zap } from "lucide-react";

function MedicomLogo({ className }) {
  return (
    <img src="/medicom-logo.png" alt="Medicom Group" className={className} />
  );
}

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <MedicomLogo className="h-10 mb-4 rounded-sm bg-white px-2 py-0.5" />
            <p className="text-sm opacity-70 leading-relaxed mb-4">
              Premium quality used & reconditioned process and packaging machinery for the pharmaceutical, chemical and cosmetic industry.
            </p>
            <div className="flex items-center gap-2 text-primary text-sm font-semibold tracking-wider uppercase">
              <Zap className="w-4 h-4" />Tailored · Flexible · Fast
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-50">Quick Links</h4>
            <div className="space-y-3">
              <Link to="/catalog" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">Full Catalog</Link>
              <Link to="/categories" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">Categories</Link>
              <Link to="/about" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">About Intimac</Link>
              <Link to="/contact" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-50">Top Categories</h4>
            <div className="space-y-3">
              <Link to="/categories" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">Packaging Machines</Link>
              <Link to="/categories" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">Sterilization / Cleaning</Link>
              <Link to="/categories" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">Laboratory Equipment</Link>
              <Link to="/categories" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">Presses</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-50">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm opacity-70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Ajman Free Zone - L1-07 - UAE</span>
              </div>
              <a href="https://www.medicom-grp.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity">
                <Globe className="w-4 h-4 shrink-0" />
                <span>www.medicom-grp.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs opacity-40">© {new Date().getFullYear()} Medicom Group. All rights reserved.</p>
          <p className="text-xs opacity-40">Catalog built for informational purposes</p>
        </div>
      </div>
    </footer>
  );
}
