import { expect, it } from 'vitest';

import { UserDoc } from '@/fire/docs';

it('trivial', () => {
  console.log(UserDoc);
  expect(true).toBe(true);
});
