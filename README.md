# schema-dotenv

A simple environment variable manager for Node.js applications.

## Description

`schema-dotenv` provides a way to manage environment variables using a declarative schema in a type-safe way.

## Getting Started

### Dependencies
- Node.js v24 or later

### Installing

```bash
npm install schema-dotenv
```

### Usage

```typescript
// env.ts

import configure from 'schema-dotenv';

const env = configure({
  EXAMPLE_VAR: {
    type: 'string',
    default: 'default value'
  },
  ANOTHER_VAR: {
    type: 'number',
    required: true
  }
});

export default env;
```

## Authors

- [@zachbakerdev](https://github.com/zachbakerdev)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
