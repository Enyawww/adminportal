"use client";
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode; // Define the type for children as ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.push('/');
    }
  }, [router]);

  return <>{children}</>; // Render the child components if authenticated
};

export default ProtectedRoute;


