"use client";
import React from "react";
import { HeroParallax } from "../../../components/ui/hero-parallax";

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}
export const products = [
  {
    title: "Live Walkie Talkie App",
    link: "https://walkie-talkie-chi.vercel.app/",
    thumbnail: "/images/projects/project12.webp",
  },
  {
    title: "Studio Sobra Landing Page",
    link: "https://studio-sobra.vercel.app/",
    thumbnail: "/images/projects/project2.webp",
  },
  {
    title: "Invoice + Customers Dashboard",
    link: "https://nextjs-dashboard-theta-two-93.vercel.app/",
    thumbnail: "/images/projects/project3.webp",
  },

  {
    title: "Modern Financial Calculator",
    link: "https://financial-calculator-sandy.vercel.app/",
    thumbnail: "/images/projects/project11.webp",
  },
  {
    title: "Restaruant Landing Page",
    link: "https://richards-restaurant.netlify.app/",
    thumbnail: "/images/projects/project4.webp",
  },
  {
    title: "Café Website",
    link: "https://gorilla-cafe.netlify.app/",
    thumbnail: "/images/projects/project6.webp",
  },
  {
    title: "Kayak Rental Service",
    link: "https://del-nautico-kayaks-tandil.vercel.app/",
    thumbnail: "/images/projects/project7.webp",
  },
  {
    title: "Modern Bank App",
    link: "https://bank-modern-app-two.vercel.app/",
    thumbnail: "/images/projects/project10.webp",
  },
  {
    title: "Sostentia Desk",
    link: "https://sostentia-desk.vercel.app/en",
    thumbnail: "/images/projects/Sostentia-desk-new.webp",
  },
  {
    title: "Photography Web Portfolio",
    link: "https://learn-about-photography.netlify.app/",
    thumbnail: "/images/projects/project5.webp",
  }
];
