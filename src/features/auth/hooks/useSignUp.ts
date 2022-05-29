import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';

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

    await sendEmailVerification(authUser, {
      url: import.meta.env.PROD
        ? 'https://a-habit.web.app/app/habits'
        : 'http://localhost:3000/app/habits',
      handleCodeInApp: true,
    });
  };
  return { signUp };
};
