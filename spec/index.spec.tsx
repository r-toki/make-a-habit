import { initializeTestEnvironment, RulesTestContext } from '@firebase/rules-unit-testing';
import { fireEvent, render } from '@testing-library/react';
import { collection, doc, getDoc, Timestamp } from 'firebase/firestore';
import fs from 'fs';
import { useState } from 'react';
import { afterAll, beforeAll, expect, it } from 'vitest';

import { UsersCollection } from '@/fire/collections';
import { UserDoc } from '@/fire/docs';

// NOTE: refs
//       1. setup -> https://www.eternaldev.com/blog/testing-a-react-application-with-vitest/
//       2. how to use getBy, queryBy and findBy -> https://qiita.com/nazeudon/items/28731673dad537c06d72

// UTIL
const ts = (iso: string) => Timestamp.fromDate(new Date(iso));

// TEST
const testEnv = await initializeTestEnvironment({
  projectId: 'make-a-habit-fd3f5',
  firestore: {
    host: 'localhost',
    port: 8080,
    rules: fs.readFileSync('firestore.rules', 'utf8'),
  },
});

const sudo = (cb: ({ db }: { db: ReturnType<RulesTestContext['firestore']> }) => Promise<void>) => {
  return testEnv.withSecurityRulesDisabled((ctx) =>
    cb({
      db: ctx.firestore(),
    })
  );
};

const authCtx = testEnv.authenticatedContext('0');
const authDb = authCtx.firestore();

const usersCollection = new UsersCollection(collection(authDb, 'users'));

beforeAll(async () => {
  await testEnv.clearFirestore();
});

afterAll(async () => {
  await testEnv.clearFirestore();
  await testEnv.cleanup();
});

it('create user', async () => {
  const user = UserDoc.create(usersCollection, '0', { name: 'EIZO' });
  await user.save();

  await sudo(async ({ db }) => {
    const gotUser = await getDoc(doc(db, 'users', '0'));
    expect(gotUser.data()?.name).toBe('EIZO');
  });
});

const Counter = () => {
  const [count, setCount] = useState(0);
  const increment = () => setTimeout(() => setCount((v) => v + 1), 100);
  const decrement = () => setTimeout(() => setCount((v) => v - 1), 200);
  return (
    <div>
      <div>{count}</div>
      <button onClick={increment}>plus 1</button>
      <button onClick={decrement}>minus 1</button>
    </div>
  );
};

it('async count component', async () => {
  const { findByText, getByText } = render(<Counter />);

  expect(await findByText('0')).toBeDefined();

  fireEvent.click(getByText('plus 1'));
  expect(await findByText('1')).toBeDefined();

  fireEvent.click(getByText('minus 1'));
  expect(await findByText('0')).toBeDefined();
});
