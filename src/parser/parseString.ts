import type { StringEntry } from '../types';

const parseString = (
  env: Record<string, unknown>,
  name: string,
  entry: StringEntry,
): void => {
  const value = process.env[name];

  if ('default' in entry) {
    env[name] = value ?? entry.default;
  } else if ('required' in entry) {
    if (!entry.required)
      throw new Error(`invalid schema for env:${name}: required invalid.`);
    if (value === undefined) throw new Error(`env:${name} is required.`);
    if (value.length === 0) throw new Error(`env:${name} is required.`);
    env[name] = value;
  } else if ('optional' in entry) {
    if (!entry.optional)
      throw new Error(`invalid schema for env:${name}: optional invalid.`);
    if (value === undefined) env[name] = undefined;
    else env[name] = value.length === 0 ? undefined : value;
  } else {
    throw new Error(`invalid schema for env:${name}.`);
  }
};

export default parseString;
