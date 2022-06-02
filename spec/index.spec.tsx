import { initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { render, screen } from '@testing-library/react';
import { collection, doc, getDoc, Timestamp } from 'firebase/firestore';
import fs from 'fs';

import { UsersCollection } from '@/fire/collections';
import { UserDoc } from '@/fire/docs';

// TODO:
// 1. render async component and test connect firestore
// 2. di collection for test ( to create context of root collections )

const testEnv = await initializeTestEnvironment({
  projectId: 'make-a-habit-fd3f5',
  firestore: {
    host: 'localhost',
    port: 8080,
    rules: fs.readFileSync('firestore.rules', 'utf8'),
  },
});

const userId = '1';

const authCtx = testEnv.authenticatedContext(userId);
const clientDb = authCtx.firestore();

const usersCollection = new UsersCollection(collection(clientDb, 'users'));

beforeAll(async () => {
  testEnv.clearFirestore();
});

afterAll(async () => {
  testEnv.clearFirestore();
});

it('trivial', async () => {
  const user = new UserDoc({
    id: userId,
    ref: doc(usersCollection.ref, userId),
    data: () => ({
      name: 'EIZO',
      createdAt: Timestamp.fromDate(new Date('2000-01-01')),
      updatedAt: Timestamp.fromDate(new Date('2000-01-01')),
    }),
  });
  await user.save();

  await testEnv.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore();
    const gotUser = await getDoc(doc(db, 'users', '1'));

    expect(gotUser.data()).toStrictEqual({
      name: 'EIZO',
      createdAt: Timestamp.fromDate(new Date('2000-01-01')),
      updatedAt: Timestamp.fromDate(new Date('2000-01-01')),
    });
  });
});

// const App = () => {
//   return <div>TITLE</div>;
// };

// it('component', async () => {
//   render(<App />);

//   expect(screen.getByText('TITLE')).toBeInTheDocument();
// });

const HelloWorld = () => <h1>Hello World</h1>;
const { debug } = render(<HelloWorld />);
debug();
