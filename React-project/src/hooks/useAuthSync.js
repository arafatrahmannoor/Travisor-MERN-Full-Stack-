import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import useAuthStore from '../store/useAuthStore';
import app from '../firebase';
import axios from 'axios';

// Hook to sync Firebase user with backend when needed
export const useAuthSync = () => {
  const auth = getAuth(app);
  const [firebaseUser] = useAuthState(auth);
  const { isLoggedIn, setAuth } = useAuthStore();

  const syncFirebaseUserWithBackend = async () => {
    if (!firebaseUser || isLoggedIn) return; // Already synced or no Firebase user

    try {
      // Try to sync the Firebase user with your backend
      const response = await axios.post('http://localhost:5000/auth/firebase-sync', {
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL
      }, { validateStatus: () => true });

      if (response.status >= 200 && response.status < 300) {
        const { token, user, role } = response.data;
        setAuth({ token, role: role || 'user', user });
      } else {
        console.log('Firebase user not found in backend, using Firebase-only auth');
      }
    } catch (error) {
      console.log('Backend sync failed, using Firebase-only auth:', error.message);
    }
  };

  return {
    firebaseUser,
    isBackendAuthenticated: isLoggedIn,
    syncFirebaseUserWithBackend
  };
};

export default useAuthSync;
