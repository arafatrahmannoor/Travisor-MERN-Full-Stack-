import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import useAuthStore from '../store/useAuthStore';
import app from '../firebase';

// Utility hook for combined authentication status
export const useAuth = () => {
  const auth = getAuth(app);
  const [firebaseUser, firebaseLoading] = useAuthState(auth);
  const { isLoggedIn, user: backendUser, role } = useAuthStore();

  // User is authenticated if either system shows they're logged in
  const isAuthenticated = isLoggedIn || !!firebaseUser;
  
  // User info from either system
  const user = backendUser || firebaseUser;
  const userName = backendUser?.name || firebaseUser?.displayName || 'User';
  const userEmail = backendUser?.email || firebaseUser?.email || '';
  
  // Check if user has admin access (only from backend)
  const isAdmin = isLoggedIn && role === 'admin';
  
  return {
    isAuthenticated,
    isLoading: firebaseLoading,
    user,
    userName,
    userEmail,
    isAdmin,
    role,
    firebaseUser,
    backendUser,
    isBackendAuth: isLoggedIn,
    isFirebaseAuth: !!firebaseUser && !isLoggedIn
  };
};

export default useAuth;
