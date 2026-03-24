import type { NumberEntry } from '../types';

const parseNumber = (
  env: Record<string, unknown>,
  name: string,
  entry: NumberEntry,
): void => {
  const value = process.env[name];
  const number = value ? Number(value) : undefined;

  if (number !== undefined && isNaN(number)) {
    throw new Error(`env:${name} must be a number.`);
  }

  if ('default' in entry) {
    env[name] = number ?? entry.default;
  } else if ('required' in entry) {
    if (!entry.required)
      throw new Error(`invalid schema for env:${name}: required invalid.`);
    if (number === undefined) throw new Error(`env:${name} is required.`);
    env[name] = number;
  } else if ('optional' in entry) {
    if (!entry.optional)
      throw new Error(`invalid schema for env:${name}: optional invalid.`);
    env[name] = number;
  } else {
    throw new Error(`invalid schema for env:${name}.`);
  }
};

export default parseNumber;
