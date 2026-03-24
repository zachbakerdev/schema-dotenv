import type { BooleanEntry } from '../types';

const VALID_VALUES = [
  'true',
  'false',
  't',
  'f',
  'yes',
  'no',
  'y',
  'n',
  '1',
  '0',
];
const TRUE_VALUES = ['true', 't', 'yes', 'y', '1'];

const parseBoolean = (
  env: Record<string, unknown>,
  name: string,
  entry: BooleanEntry,
): void => {
  const value = process.env[name]?.toLowerCase();

  if (value !== undefined && !VALID_VALUES.includes(value)) {
    throw new Error(`env:${name} must be a boolean value.`);
  }

  if ('default' in entry) {
    env[name] =
      value !== undefined ? TRUE_VALUES.includes(value) : entry.default;
  } else if ('required' in entry) {
    if (!entry.required)
      throw new Error(`invalid schema for env:${name}: required invalid.`);
    if (value === undefined) throw new Error(`env:${name} is required.`);
    env[name] = TRUE_VALUES.includes(value);
  } else if ('optional' in entry) {
    if (!entry.optional)
      throw new Error(`invalid schema for env:${name}: optional invalid.`);
    env[name] = value !== undefined ? TRUE_VALUES.includes(value) : undefined;
  } else {
    throw new Error(`invalid schema for env:${name}.`);
  }
};

export default parseBoolean;
