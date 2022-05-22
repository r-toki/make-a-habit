import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

import { UserDoc } from '../../../lib/fire/docs/user';
import { usersCollection } from '../../../lib/fire/root-collections';

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
    const {
      user: { uid },
    } = await createUserWithEmailAndPassword(getAuth(), email, password);
    const user = UserDoc.create(usersCollection, uid, { name });
    await user.save();
  };
  return { signUp };
};
