import { describe, expect, test } from '@jest/globals';
import configure from '../src';

describe('number parser', () => {
  test('defined with default', () => {
    const env = configure({
      NUMBER_VALUE: {
        type: 'number',
        default: 64,
      },
    });

    expect(env).toEqual({
      NUMBER_VALUE: 42,
    });
  });

  test('undefined with default', () => {
    const env = configure({
      UNDEF_NUMBER_VALUE: {
        type: 'number',
        default: 64,
      },
    });

    expect(env).toEqual({
      UNDEF_NUMBER_VALUE: 64,
    });
  });

  test('defined and required', () => {
    const env = configure({
      NUMBER_VALUE: {
        type: 'number',
        required: true,
      },
    });

    expect(env).toEqual({
      NUMBER_VALUE: 42,
    });
  });

  test('undefined and required', () => {
    expect(() => {
      configure({
        UNDEF_NUMBER_VALUE: {
          type: 'number',
          required: true,
        },
      });
    }).toThrow();
  });

  test('defined and optional', () => {
    const env = configure({
      NUMBER_VALUE: {
        type: 'number',
        optional: true,
      },
    });

    expect(env).toEqual({
      NUMBER_VALUE: 42,
    });
  });

  test('undefined and optional', () => {
    const env = configure({
      UNDEF_NUMBER_VALUE: {
        type: 'number',
        optional: true,
      },
    });

    expect(env).toEqual({
      UNDEF_NUMBER_VALUE: undefined,
    });
  });

  test('invalid value', () => {
    expect(() => {
      configure({
        INVALID_NUMBER_VALUE: {
          type: 'number',
          required: true,
        },
      });
    }).toThrow();
  });

  test('invalid schema required', () => {
    expect(() => {
      configure({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        NUMBER_VALUE: {
          type: 'number',
          required: false,
        },
      });
    }).toThrow();
  });

  test('invalid schema optional', () => {
    expect(() => {
      configure({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        NUMBER_VALUE: {
          type: 'number',
          optional: false,
        },
      });
    }).toThrow();
  });

  test('invalid schema', () => {
    expect(() => {
      configure({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        NUMBER_VALUE: {
          type: 'number',
        },
      });
    }).toThrow();
  });
});
