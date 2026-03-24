import { describe, expect, test } from '@jest/globals';
import configure from '../src';

describe('boolean parser', () => {
  test('defined with default', () => {
    const env = configure({
      BOOLEAN_VALUE: {
        type: 'boolean',
        default: true,
      },
    });

    expect(env).toEqual({
      BOOLEAN_VALUE: false,
    });
  });

  test('undefined with default', () => {
    const env = configure({
      UNDEF_BOOLEAN_VALUE: {
        type: 'boolean',
        default: true,
      },
    });

    expect(env).toEqual({
      UNDEF_BOOLEAN_VALUE: true,
    });
  });

  test('defined and required', () => {
    const env = configure({
      BOOLEAN_VALUE: {
        type: 'boolean',
        required: true,
      },
    });

    expect(env).toEqual({
      BOOLEAN_VALUE: false,
    });
  });

  test('undefined and required', () => {
    expect(() => {
      configure({
        UNDEF_BOOLEAN_VALUE: {
          type: 'boolean',
          required: true,
        },
      });
    }).toThrow();
  });

  test('defined and optional', () => {
    const env = configure({
      BOOLEAN_VALUE: {
        type: 'boolean',
        optional: true,
      },
    });

    expect(env).toEqual({
      BOOLEAN_VALUE: false,
    });
  });

  test('undefined and optional', () => {
    const env = configure({
      UNDEF_BOOLEAN_VALUE: {
        type: 'boolean',
        optional: true,
      },
    });

    expect(env).toEqual({
      UNDEF_BOOLEAN_VALUE: undefined,
    });
  });

  test('invalid value', () => {
    expect(() => {
      configure({
        INVALID_BOOLEAN_VALUE: {
          type: 'boolean',
          optional: true,
        },
      });
    }).toThrow();
  });

  test('invalid schema required', () => {
    expect(() => {
      configure({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        BOOLEAN_VALUE: {
          type: 'boolean',
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
        BOOLEAN_VALUE: {
          type: 'boolean',
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
        BOOLEAN_VALUE: {
          type: 'boolean',
        },
      });
    }).toThrow();
  });
});
