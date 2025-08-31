import { Navigate } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import useAuthStore from '../store/useAuthStore';
import Unauthorized from './Unauthorized';
import app from '../firebase';

const ProtectedRoute = ({ children, requiredRole = null, redirectTo = '/login' }) => {
  const { isLoggedIn, role } = useAuthStore();
  
  // Check Firebase auth as well
  const auth = getAuth(app);
  const [firebaseUser] = useAuthState(auth);

  // User is authenticated if either Firebase user exists OR Zustand store shows logged in
  const isAuthenticated = isLoggedIn || !!firebaseUser;
  
  // Check if user is logged in (either system)
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check if specific role is required (only applies to Zustand auth with backend)
  if (requiredRole && isLoggedIn && role !== requiredRole) {
    return <Unauthorized />;
  }
  
  // If requiredRole is specified but user is only logged in via Firebase (no backend role)
  if (requiredRole && firebaseUser && !isLoggedIn) {
    return <Unauthorized />;
  }

  return children;
};

export default ProtectedRoute;
