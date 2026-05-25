import React from "react";

const brands = [
  { name: "Mettler Toledo", img: "https://www.intimac.it/_next/image/?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F290336016608659%2F489x128%2Ff16e7cafcb%2Fmettler-toledo.png%2Fm%2F0x57&w=256&q=75" },
  { name: "Uhlmann", img: "https://www.intimac.it/_next/image/?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F290336016608659%2F1024x294%2F7379568c9c%2Fuhlmann.png%2Fm%2F0x57&w=256&q=75" },
  { name: "Bosch", img: "https://www.intimac.it/_next/image/?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F290336016608659%2F3840x2160%2Febbd03d717%2Fbosch.png%2Fm%2F0x57&w=256&q=75" },
  { name: "IMA Italy", img: "https://www.intimac.it/_next/image/?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F290336016608659%2F300x118%2Fa3cb74f45f%2Fima-italy.png%2Fm%2F0x57&w=256&q=75" },
  { name: "Marchesini Group", img: "https://www.intimac.it/_next/image/?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F290336016608659%2F640x640%2F2c010fcb89%2Fmarchesini.png%2Fm%2F0x57&w=256&q=75" },
  { name: "Bausch Ströbel", img: "https://www.intimac.it/_next/image/?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F290336016608659%2F600x400%2F1fd204597a%2Fbausch-strobel.png%2Fm%2F0x57&w=256&q=75" },
  { name: "Groninger", img: "https://www.intimac.it/_next/image/?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F290336016608659%2F1495x342%2Fd3c9120539%2Fgroninger.png%2Fm%2F0x57&w=256&q=75" },
  { name: "Rovema", img: "https://www.intimac.it/_next/image/?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F290336016608659%2F737x360%2F12e4afaa6a%2Frovema.png%2Fm%2F0x57&w=256&q=75" },
];

export default function BrandBanner() {
  return (
    <section className="py-12 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-8">
          Premium brands from leading European manufacturers
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {brands.map((brand) => (
            <img
              key={brand.name}
              src={brand.img}
              alt={brand.name}
              className="h-8 lg:h-10 object-contain opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
