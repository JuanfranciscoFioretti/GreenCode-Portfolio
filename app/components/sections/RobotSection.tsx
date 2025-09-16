

// 'use client'

// // import { MorphingText } from "@/components/magicui/morphing-text";
// import { SplineScene } from "@/components/ui/splite";

 
// export function RobotSection() {
//   return (
//     <section className="w-full h-screen relative overflow-hidden border-0 bg-transparent">
    
//       {/* Robot container - Always on the right, larger to prevent clipping */}
//       <div className="absolute right-0 top-0 w-full lg:w-3/5 xl:w-2/3 h-full z-10">
//         <SplineScene 
//           scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
//           className="w-full h-full"
//         />
//       </div>

//       {/* Text container - Responsive positioning with pointer-events control */}
//       <div className="relative z-20 h-full pointer-events-none">
//         <div className="flex flex-col justify-center h-full p-6 md:p-8 lg:p-12">
//           {/* On small screens: text at top, on large screens: text on left */}
//           <div className="max-w-lg lg:max-w-xl pointer-events-auto">
//             {/* <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[color:var(--text-dark)] mb-4 lg:mb-6">
//               Interactive 3D
//             </h1> */}
//             <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold dark:text-white">
//                 The Ultimate <br /> Development Studio
//             </h1>
//             {/* <MorphingText texts={['Learn how', 'We Create', 'Your Next', 'Innovative', 'Secure', '& User-friendly', 'Digital Solution', 'Together', 'We can Achieve', 'Your Goals' ]} /> */}
//             {/* <p className="text-[color:var(--text-dark)] opacity-80 text-lg md:text-xl lg:text-2xl leading-relaxed">
//               Bring your UI to life with beautiful 3D scenes. Create immersive experiences 
//               that capture attention and enhance your design.
//             </p> */}
//             <p className="max-w-2xl text-lg md:text-2xl mt-8 dark:text-neutral-200">
//                 We build beautiful products with the latest technologies and frameworks.
//                 We are a team of passionate developers and designers that love to build
//                 amazing products.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

'use client'

// import { MorphingText } from "@/components/magicui/morphing-text";
import { SplineScene } from "@/components/ui/splite";

 
export function RobotSection() {
  return (
    <section className="w-full h-screen relative overflow-hidden border-0 bg-transparent  ">
    
      {/* Robot container - Always on the right, larger to prevent clipping */}
      <div className="absolute right-0 top-0 w-full lg:w-3/5 xl:w-2/3 h-full z-10">
        <SplineScene 
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
        
      </div>
      

      {/* Bottom gradient to soften robot legs cutoff */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none"></div> */}

      {/* Text container - Responsive positioning with pointer-events control */}
      <div className="relative z-20 h-full pointer-events-none">
        <div className="flex flex-col justify-end pb-20 lg:justify-center h-full p-6 md:p-8 lg:p-12">
          {/* On small screens: text at bottom, on large screens: text on left */}
          <div className="max-w-lg lg:max-w-2xl pointer-events-auto">
            {/* <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[color:var(--text-dark)] mb-4 lg:mb-6">
              Interactive 3D
            </h1> */}
            <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold text-[color:var(--text-dark)] opacity-90">
                Innovate, Transform<br /> & Succeed Digitally
            </h1>
            {/* <MorphingText texts={['Learn how', 'We Create', 'Your Next', 'Innovative', 'Secure', '& User-friendly', 'Digital Solution', 'Together', 'We can Achieve', 'Your Goals' ]} /> */}
            {/* <p className="text-[color:var(--text-dark)] opacity-80 text-lg md:text-xl lg:text-2xl leading-relaxed">
              Bring your UI to life with beautiful 3D scenes. Create immersive experiences 
              that capture attention and enhance your design.
            </p> */}
            <p className="max-w-2xl text-lg md:text-2xl mt-8 text-[color:var(--text-dark)] opacity-85">
                In Greencode we transform ideas into reality with custom web, mobile, and automation solutions, delivering innovative technology to power your business forward.
            </p>
          </div>
        </div>
        {/* <div className="h-[40rem] w-full bg-trasparent flex flex-col items-center justify-center overflow-hidden rounded-md"> */}
      
      <div className="w-full h-40 relative">
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[3px] w-3/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-3/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-3/4" />

        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    {/* </div> */}
      </div>
    </section>
  )
}