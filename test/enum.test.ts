import { describe, expect, test } from '@jest/globals';
import configure from '../src';

describe('enum parser', () => {
  test('defined with default', () => {
    const env = configure({
      ENUM_VALUE: {
        type: 'enum',
        values: ['apple', 'banana', 'cantaloupe'],
        default: 'banana',
      },
    });

    expect(env).toEqual({
      ENUM_VALUE: 'apple',
    });
  });

  test('undefined with default', () => {
    const env = configure({
      UNDEF_ENUM_VALUE: {
        type: 'enum',
        values: ['apple', 'banana', 'cantaloupe'],
        default: 'banana',
      },
    });

    expect(env).toEqual({
      UNDEF_ENUM_VALUE: 'banana',
    });
  });

  test('defined and required', () => {
    const env = configure({
      ENUM_VALUE: {
        type: 'enum',
        values: ['apple', 'banana', 'cantaloupe'],
        required: true,
      },
    });

    expect(env).toEqual({
      ENUM_VALUE: 'apple',
    });
  });

  test('undefined and required', () => {
    expect(() => {
      configure({
        UNDEF_ENUM_VALUE: {
          type: 'enum',
          values: ['apple', 'banana', 'cantaloupe'],
          required: true,
        },
      });
    }).toThrow();
  });

  test('defined and optional', () => {
    const env = configure({
      ENUM_VALUE: {
        type: 'enum',
        values: ['apple', 'banana', 'cantaloupe'],
        optional: true,
      },
    });

    expect(env).toEqual({
      ENUM_VALUE: 'apple',
    });
  });

  test('undefined and optional', () => {
    const env = configure({
      UNDEF_ENUM_VALUE: {
        type: 'enum',
        values: ['apple', 'banana', 'cantaloupe'],
        optional: true,
      },
    });

    expect(env).toEqual({
      UNDEF_ENUM_VALUE: undefined,
    });
  });

  test('invalid schema required', () => {
    expect(() => {
      configure({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        ENUM_VALUE: {
          type: 'enum',
          values: ['apple', 'banana', 'cantaloupe'],
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
        ENUM_VALUE: {
          type: 'enum',
          values: ['apple', 'banana', 'cantaloupe'],
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
        ENUM_VALUE: {
          type: 'enum',
          values: ['apple', 'banana', 'cantaloupe'],
        },
      });
    }).toThrow();
  });

  test('missing values', () => {
    expect(() => {
      configure({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        ENUM_VALUES: {
          type: 'enum',
          required: true,
        },
      });
    }).toThrow();
  });

  test('invalid schema default', () => {
    expect(() => {
      configure({
        ENUM_VALUE: {
          type: 'enum',
          values: ['apple', 'banana', 'cantaloupe'],
          default: 'invalid',
        },
      });
    }).toThrow();
  });

  test('invalid value provided', () => {
    expect(() => {
      configure({
        INVALID_ENUM_VALUE: {
          type: 'enum',
          values: ['apple', 'banana', 'cantaloupe'],
          required: true,
        },
      });
    }).toThrow();
  });
});
