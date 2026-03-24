import type { Schema, SchemaToMap } from './types';
import parseString from './parser/parseString';
import parseNumber from './parser/parseNumber';
import parseBoolean from './parser/parseBoolean';
import parseEnum from './parser/parseEnum';
import { config } from 'dotenv';

const NODE_ENV = process.env.NODE_ENV;

config({
  path: NODE_ENV
    ? [`.env.${NODE_ENV}.local`, `.env.${NODE_ENV}`, '.env.local', '.env']
    : ['.env.local', '.env'],
  quiet: true,
});

const configure = <const S extends Schema>(
  schema: S,
): SchemaToMap<typeof schema> => {
  const env: Record<string, unknown> = {};

  for (const [name, entry] of Object.entries(schema)) {
    switch (entry.type) {
      case 'string':
        parseString(env, name, entry);
        break;
      case 'number':
        parseNumber(env, name, entry);
        break;
      case 'boolean':
        parseBoolean(env, name, entry);
        break;
      case 'enum':
        parseEnum(env, name, entry);
        break;
      default:
        throw new Error(`invalid schema for env:${name}.`);
    }
  }

  return env as SchemaToMap<typeof schema>;
};

export default configure;
