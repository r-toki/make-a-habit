import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { UserDoc } from '@/fire/docs/user';
import { useCollections } from '@/providers/collections';

export const useSignUp = () => {
  const { usersCollection } = useCollections();

  const signUp = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const { user: authUser } = await createUserWithEmailAndPassword(getAuth(), email, password);
    await updateProfile(authUser, { displayName: name });
    await UserDoc.create(usersCollection, authUser.uid, { name }).save();

    if (authUser.email?.endsWith('@example.com')) return true;

    await signOut(getAuth());
    await sendEmailVerification(authUser);
    return false;
  };

  return { signUp };
};
