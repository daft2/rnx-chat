import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  onAuthStateChanged,
  User,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";

// Sign Up
export const signUp = async (
  email: string,
  password: string,
  name: string
): Promise<UserCredential | null> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (userCredential.user) {
      // Update user profile with displayName
      await updateProfile(userCredential.user, {
        displayName: name, // Set display name
      });

      // Store extra user data in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email,
        name,
        createdAt: new Date().toISOString(),
      });
    }

    return userCredential;
  } catch (error) {
    console.error("Sign-Up Error: ", error);
    return null;
  }
};

// Login
export const login = async (
  email: string,
  password: string
): Promise<UserCredential | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    console.error("Login Error: ", error);
    return null;
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error: ", error);
  }
};

// Listen for Auth State Changes
export const onAuthStateChangedListener = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser; // Returns the currently logged-in user
};
