import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { useAuth } from '@/hooks/useAuth';

export function Layout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}