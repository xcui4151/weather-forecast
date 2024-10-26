// src/services/authService.ts
import { auth, storage } from "../firebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile, User } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

/**
 * Register a new user with email, password, displayName, and optional avatar
 */
export const register = async (
  email: string,
  password: string,
  displayName: string,
  avatar?: File
): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Upload avatar to Firebase Storage if provided
  let avatarUrl = "";
  if (avatar) {
    const avatarRef = ref(storage, `avatars/${user.uid}`);
    const uploadTask = uploadBytesResumable(avatarRef, avatar);

    await new Promise<void>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            avatarUrl = downloadURL;
            resolve();
          });
        }
      );
    });
  }

  // Update user profile with displayName and avatar URL
  await updateProfile(user, {
    displayName,
    photoURL: avatarUrl,
  });

  // Send email verification
  await sendEmailVerification(user);

  return user;
};

/**
 * Login function with email verification check
 */
export const login = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Check if the user's email is verified
  if (!user.emailVerified) {
    await signOut(auth);  // Immediately sign out the user if email is not verified
    throw new Error("Email not verified. Please check your inbox for the verification link.");
  }

  return user;
};

/**
 * Logout function
 */
export const logout = async (): Promise<void> => {
  await signOut(auth);
};
