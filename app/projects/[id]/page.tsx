import { notFound } from 'next/navigation';

export default function ProjectPage() {
  // For now, since no projects are defined, return 404
  // TODO: Implement project details page
  notFound();
}

export async function generateStaticParams() {
  // Return empty array since no projects
  return [];
}