import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

const useAuthState = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authStateListener = onAuthStateChanged(
      auth,
      (userCredential) => {
        setUser(userCredential);
        setLoading(false);
      },
      (err) => {
        setUser(null);
        setLoading(false);
      }
    );

    return () => {
      authStateListener();
    };
  }, []);

  return { user, loading };
};
export default useAuthState;
