'use client'

import { Suspense, lazy, useState, useEffect, useRef } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Delay initial load slightly to prioritize critical content
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setShouldLoad(true)
            observer.disconnect()
          }
        },
        { rootMargin: '200px' } // Start loading when 200px away
      )

      if (containerRef.current) {
        observer.observe(containerRef.current)
      }

      return () => observer.disconnect()
    }, 500) // Wait 500ms before even checking visibility

    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad ? (
        <Suspense fallback={<div className="w-full h-full bg-transparent"></div>}>
          <Spline
            scene={scene}
            className="w-full h-full"
          />
        </Suspense>
      ) : (
        <div className="w-full h-full bg-transparent"></div>
      )}
    </div>
  )
}