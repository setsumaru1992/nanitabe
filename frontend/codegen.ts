import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://nanitabe_back:18101/graphql',
  generates: {
    'lib/graphql/generated/graphql.ts': {
      documents: 'features/**/*.ts',
      // preset: 'client',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
    'lib/graphql/generated/graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
