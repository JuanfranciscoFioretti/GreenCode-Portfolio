"use client";
import React, { useMemo, useState, useEffect, memo } from "react";
import Image from "next/image";
import {
  m,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

const ProductCard = memo(({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <m.div
      style={{
        x: translate,
        boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
        willChange: 'transform'
      }}
      whileHover={{
        y: -10,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative shrink-0 rounded-2xl overflow-hidden"
    >
      <a
        href={product.link}
        target="_blank"
        className="block group-hover/product:shadow-2xl w-full h-full"
      >
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="480px"
          className="object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
          quality={100}
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRiYAAABXRUJQVlA4IBIAAAAwAQCdASoBAAEAAQAcJYAOiEA/g==/AQAA"
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-30 bg-black pointer-events-none rounded-2xl"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </m.div>
  );
});

ProductCard.displayName = 'ProductCard';

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const firstRow = useMemo(() => products.slice(0, 5), [products]);
  const secondRow = useMemo(() => products.slice(5, 10), [products]);
  const thirdRow = useMemo(() => products.slice(10, 15), [products]);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Optimized spring config - lighter on mobile
  const springConfig = useMemo(() => ({
    stiffness: isMobile ? 160 : 300,
    damping: isMobile ? 20 : 30,
    bounce: 0,
    mass: 0.5
  }), [isMobile]);

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[300lvh] py-20 overflow-hidden mt-10 antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
      style={{ willChange: 'transform' }}
    >
      <Header />
      <m.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
          willChange: 'transform, opacity'
        }}
        className=""
      >
        <m.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </m.div>
        <m.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </m.div>
        <m.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </m.div>
      </m.div>
    </div>
  );
};

export const Header = memo(() => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
      <div className="flex justify-end">
        <div className="text-right">
          <m.h1 
            className="text-5xl md:text-7xl font-bold dark:text-white"
            initial={{ opacity: 0, transform: 'translateY(50px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 0.2 
            }}
            style={{ willChange: 'transform, opacity' }}
          >
            The Ultimate <br /> Development Studio
          </m.h1>
          <m.p 
            className="max-w-2xl text-lg md:text-2xl mt-8 dark:text-neutral-200 ml-auto"
            initial={{ opacity: 0, transform: 'translateY(30px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 0.6 
            }}
            style={{ willChange: 'transform, opacity' }}
          >
            We build high-performance web & mobile apps with modern frameworks.
Our expert team of full-stack developers and UX designers delivers custom software solutions that drive growth.
            </m.p>
        </div>
      </div>
    </div>
  );
});

Header.displayName = 'Header';
