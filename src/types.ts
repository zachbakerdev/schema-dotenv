export type Schema = Record<string, Entry>;
type Entry =
  | StringEntry
  | NumberEntry
  | BooleanEntry
  | EnumEntry<readonly string[]>;

type UndefinedIfOptional<E extends Entry> = E extends { optional: true }
  ? undefined
  : never;

type TypeFromEntry<T extends Entry> = T['type'] extends 'string'
  ? string | UndefinedIfOptional<T>
  : T['type'] extends 'number'
    ? number | UndefinedIfOptional<T>
    : T['type'] extends 'boolean'
      ? boolean | UndefinedIfOptional<T>
      : T extends EnumEntry<infer V>
        ? V[number] | UndefinedIfOptional<T>
        : never;

export type SchemaToMap<S extends Readonly<Schema>> = {
  [N in keyof S]: TypeFromEntry<S[N]>;
};

export type StringEntry =
  | {
      type: 'string';
      default: string;
    }
  | {
      type: 'string';
      required: true;
    }
  | {
      type: 'string';
      optional: true;
    };

export type NumberEntry =
  | {
      type: 'number';
      default: number;
    }
  | {
      type: 'number';
      required: true;
    }
  | {
      type: 'number';
      optional: true;
    };

export type BooleanEntry =
  | {
      type: 'boolean';
      default: boolean;
    }
  | {
      type: 'boolean';
      required: true;
    }
  | {
      type: 'boolean';
      optional: true;
    };

export type EnumEntry<V extends Readonly<string[]>> =
  | {
      type: 'enum';
      values: V;
      default: V[number];
    }
  | {
      type: 'enum';
      values: V;
      required: true;
    }
  | {
      type: 'enum';
      values: V;
      optional: true;
    };
