import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth';
import type { User } from '@/types/auth';

interface HeaderProps {
  user: User | null;
}

export function Header({ user }: HeaderProps) {
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 
              onClick={() => navigate('/')} 
              className="text-xl font-semibold cursor-pointer hover:text-blue-600"
            >
              Survey Designer
            </h1>
            <span className="text-gray-500">
              Welcome, {user.name || 'User'}
            </span>
          </div>
          <Button variant="outline" onClick={signOut}>Sign Out</Button>
        </div>
      </div>
    </header>
  );
}