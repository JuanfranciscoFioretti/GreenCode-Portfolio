import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

// Datos de proyectos (puedes mover a un archivo separado)
const projects = [
  {
    id: 'project1',
    title: 'Modern Bank App',
    description: 'A sleek and secure banking application with modern UI/UX design.',
    image: '/images/projects/project1.webp',
    link: 'https://bank-modern-app-two.vercel.app/',
    technologies: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    id: 'project2',
    title: 'Studio Sobra Landing Page',
    description: 'Elegant landing page for a creative studio with smooth animations.',
    image: '/images/projects/project2.webp',
    link: 'https://studio-sobra.vercel.app/',
    technologies: ['React', 'Framer Motion', 'CSS'],
  },
  {
    id: 'project3',
    title: 'Original Dashboard Remake',
    description: 'Redesigned dashboard with improved functionality and user experience.',
    image: '/images/projects/project3.webp',
    link: 'https://nextjs-dashboard-theta-two-93.vercel.app/',
    technologies: ['Next.js', 'Chart.js', 'Tailwind'],
  },
  {
    id: 'project4',
    title: 'Restaruant Landing Page',
    description: 'Beautiful landing page for a restaurant with reservation system.',
    image: '/images/projects/project4.webp',
    link: 'https://richards-restaurant.netlify.app/',
    technologies: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'project5',
    title: 'Photography Portfolio',
    description: 'Portfolio website showcasing photography work with gallery.',
    image: '/images/projects/project5.webp',
    link: 'https://learn-about-photography.netlify.app/',
    technologies: ['React', 'CSS', 'Gallery'],
  },
  {
    id: 'project6',
    title: 'Café Website',
    description: 'Complete website for a café with menu and contact information.',
    image: '/images/projects/project6.webp',
    link: 'https://gorilla-cafe.netlify.app/',
    technologies: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'project7',
    title: 'Kayak Rental Service',
    description: 'Service website for kayak rentals with booking system.',
    image: '/images/projects/project7.webp',
    link: 'https://gorilla-cafe.netlify.app/',
    technologies: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 'project8',
    title: 'Café Landing Page',
    description: 'Modern landing page for a café with online ordering.',
    image: '/images/projects/project8.webp',
    link: 'https://cafeteria-saltos.netlify.app/',
    technologies: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'project9',
    title: 'Altuvia App Platform',
    description: 'Platform for Altuvia app with advanced features.',
    image: '/images/projects/project9.webp',
    link: 'https://www.altuvia.net/',
    technologies: ['React Native', 'Firebase', 'API'],
  },
  {
    id: 'project10',
    title: 'Modern Landing Page',
    description: 'Versatile modern landing page template.',
    image: '/images/projects/project10.webp',
    link: 'https://bank-modern-app-two.vercel.app/',
    technologies: ['Next.js', 'Tailwind', 'Framer Motion'],
  },
];

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = projects.find(p => p.id === params.id);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} - Sostentia Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
    alternates: {
      canonical: `https://sostentia.com/projects/${params.id}`,
    },
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find(p => p.id === params.id);

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Link href="/" className="text-blue-500 hover:underline mb-8 inline-block">
          ← Back to Portfolio
        </Link>

        <article className="bg-card rounded-lg p-8 shadow-lg">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-lg text-muted-foreground">{project.description}</p>
          </header>

          <div className="mb-8">
            <Image
              src={project.image}
              alt={project.title}
              width={800}
              height={600}
              className="w-full rounded-lg"
              priority
            />
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <footer className="border-t pt-8">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              View Live Project →
            </a>
          </footer>
        </article>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://sostentia.com/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Projects",
                  "item": "https://sostentia.com/#projects"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": project.title,
                  "item": `https://sostentia.com/projects/${params.id}`
                }
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "name": project.title,
              "description": project.description,
              "url": `https://sostentia.com/projects/${params.id}`,
              "image": `https://sostentia.com${project.image}`,
              "creator": {
                "@type": "Organization",
                "name": "Sostentia"
              },
              "keywords": project.technologies.join(", "),
              "sameAs": project.link
            })
          }}
        />
      </div>
    </main>
  );
}