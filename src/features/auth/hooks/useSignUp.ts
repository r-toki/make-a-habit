import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signOut,
} from 'firebase/auth';

import { usersCollection } from '@/fire/app';
import { UserDoc } from '@/fire/docs/user';

export const useSignUp = () => {
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
    await UserDoc.create(usersCollection, authUser.uid, { name }).save();

    await signOut(getAuth());
    await sendEmailVerification(authUser, {
      url: import.meta.env.PROD
        ? 'https://a-habit.web.app/auth/log-in'
        : 'http://localhost:3000/auth/log-in',
      handleCodeInApp: true,
    });
  };
  return { signUp };
};
