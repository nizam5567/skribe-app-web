module.exports = {

  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'airbnb-base',
    'standard-with-typescript',
    'plugin:lodash/recommended'
  ],
  'overrides': [

  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    'project': ['tsconfig.json']
  },
  'plugins': [
    'react',
    'unicorn'
  ],
  'rules': {
    'no-plusplus': 0,
    'comma-dangle': ['error', 'never'],
    'max-len': ['warn', 250],
    'no-console': 0,
    'radix': 0,
    'no-bitwise': 0,
    'react/react-in-jsx-scope': 0,
    'quote-props': ['error', 'always'],
    '@typescript-eslint/strict-boolean-expressions': 0,
    'semi': ['error', 'always'],
    'curly': 'error',
    '@typescript-eslint/semi': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'unicorn/prefer-switch': ['error', { 'minimumCases': 2 }],
    'max-classes-per-file': ['error', 1],
    'import/extensions': 0,
    'import/no-unresolved': 0
  }
};
// take this line out when we get to code cleanups
// '@typescript-eslint/explicit-function-return-type': 0
