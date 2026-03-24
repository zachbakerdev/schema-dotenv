import { describe, expect, test } from '@jest/globals';
import configure from '../src';

describe('string parser', () => {
  test('defined with default', () => {
    const env = configure({
      STRING_VALUE: {
        type: 'string',
        default: 'default_string',
      },
    });

    expect(env).toEqual({
      STRING_VALUE: 'some_string',
    });
  });

  test('undefined with default', () => {
    const env = configure({
      UNDEF_STRING_VALUE: {
        type: 'string',
        default: 'default_string',
      },
    });

    expect(env).toEqual({
      UNDEF_STRING_VALUE: 'default_string',
    });
  });

  test('defined and required', () => {
    const env = configure({
      STRING_VALUE: {
        type: 'string',
        required: true,
      },
    });

    expect(env).toEqual({
      STRING_VALUE: 'some_string',
    });
  });

  test('undefined and required', () => {
    expect(() => {
      configure({
        UNDEF_STRING_VALUE: {
          type: 'string',
          required: true,
        },
      });
    }).toThrow();
  });

  test('empty string and required', () => {
    expect(() => {
      configure({
        EMPTY_STRING_VALUE: {
          type: 'string',
          required: true,
        },
      });
    }).toThrow();
  });

  test('defined and optional', () => {
    const env = configure({
      STRING_VALUE: {
        type: 'string',
        optional: true,
      },
    });

    expect(env).toEqual({
      STRING_VALUE: 'some_string',
    });
  });

  test('empty string and optional', () => {
    const env = configure({
      EMPTY_STRING_VALUE: {
        type: 'string',
        optional: true,
      },
    });

    expect(env).toEqual({
      EMPTY_STRING_VALUE: undefined,
    });
  });

  test('undefined and optional', () => {
    const env = configure({
      UNDEF_STRING_VALUE: {
        type: 'string',
        optional: true,
      },
    });

    expect(env).toEqual({
      UNDEF_STRING_VALUE: undefined,
    });
  });

  test('invalid schema required', () => {
    expect(() => {
      configure({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        STRING_VALUE: {
          type: 'string',
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
        STRING_VALUE: {
          type: 'string',
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
        STRING_VALUE: {
          type: 'string',
        },
      });
    }).toThrow();
  });
});
