export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">404 - Page Not Found</h1>
        <p className="text-secondary">The page you're looking for doesn't exist.</p>
      </div>
    </div>
  );
}