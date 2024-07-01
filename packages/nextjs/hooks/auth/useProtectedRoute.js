// hooks/useProtectedRoute.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '~~/context/AuthContext';

const useProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === null) return; // Don't do anything if still checking auth state
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);
};

export default useProtectedRoute;
