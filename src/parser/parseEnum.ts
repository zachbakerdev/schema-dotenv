import type { EnumEntry } from '../types';

const parseEnum = (
  env: Record<string, unknown>,
  name: string,
  entry: EnumEntry<readonly string[]>,
): void => {
  const value = process.env[name];

  if (!Array.isArray(entry.values))
    throw new Error(`invalid schema for env:${name}: values is required.`);

  if (value !== undefined && !entry.values.includes(value)) {
    throw new Error(`env:${name} must be one of [${entry.values.join(', ')}].`);
  }

  if ('default' in entry && !entry.values.includes(entry.default)) {
    throw new Error(
      `invalid schema for env:${name}: default must be one of [${entry.values.join(', ')}].`,
    );
  }

  if ('default' in entry) {
    env[name] = value ?? entry.default;
  } else if ('required' in entry) {
    if (!entry.required)
      throw new Error(`invalid schema for env:${name}: required invalid.`);
    if (value === undefined) throw new Error(`env:${name} is required.`);
    env[name] = value;
  } else if ('optional' in entry) {
    if (!entry.optional)
      throw new Error(`invalid schema for env:${name}: optional invalid.`);
    env[name] = value;
  } else {
    throw new Error(`invalid schema for env:${name}.`);
  }
};

export default parseEnum;
