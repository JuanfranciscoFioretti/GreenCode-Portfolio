"use client";
import React from "react";
import { HeroParallax } from "../../../components/ui/hero-parallax";

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}
export const products = [
  {
    title: "Altuvia App Platform",
    link: "https://www.altuvia.net/",
    thumbnail: "/images/projects/project9.webp",
  },
  {
    title: "Studio Sobra Landing Page",
    link: "https://studio-sobra.vercel.app/",
    thumbnail: "/images/projects/project2.webp",
  },
  {
    title: "Original Dashboard Remake",
    link: "https://nextjs-dashboard-theta-two-93.vercel.app/",
    thumbnail: "/images/projects/project3.webp",
  },

  {
    title: "Modern Financial Calculator",
    link: "https://financial-calculator-sandy.vercel.app/",
    thumbnail: "/images/projects/project11.webp",
  },
  {
    title: "Photography Portfolio",
    link: "https://learn-about-photography.netlify.app/",
    thumbnail: "/images/projects/project5.webp",
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
    title: "Restaruant Landing Page",
    link: "https://richards-restaurant.netlify.app/",
    thumbnail: "/images/projects/project4.webp",
  },
  {
    title: "Café Landing Page",
    link: "https://cafeteria-saltos.netlify.app/",
    thumbnail: "/images/projects/project8.webp",
  },
];
