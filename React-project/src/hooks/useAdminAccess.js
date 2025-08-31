import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import useAuthStore from '../store/useAuthStore';
import app from '../firebase';

export const useAdminAccess = () => {
    const { isLoggedIn, role } = useAuthStore();
    
    // Check Firebase auth as well
    const auth = getAuth(app);
    const [firebaseUser] = useAuthState(auth);
    
    // User is authenticated if either Firebase user exists OR Zustand store shows logged in
    const isAuthenticated = isLoggedIn || !!firebaseUser;

    const isAdmin = isLoggedIn && role === 'admin';
    const hasAccess = (requiredRole) => {
        if (!requiredRole) return isAuthenticated;
        return isLoggedIn && role === requiredRole;
    };

    return {
        isAdmin,
        hasAccess,
        isLoggedIn: isAuthenticated,
        role,
        firebaseUser
    };
};

export default useAdminAccess;
