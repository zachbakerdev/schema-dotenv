import { expect, test } from '@jest/globals';
import configure from '../src';

test('no parser', () => {
  expect(() => {
    configure({
      SOME_VALUE: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        type: 'invalid',
      },
    });
  }).toThrow();
});
