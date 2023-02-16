module.exports = {
  'setupFiles': ['<rootDir>/tests/enzyme.setup.js'],
  'testMatch': ['<rootDir>/**/*.test.tsx'],
  'moduleNameMapper': {
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy'
  },
  'testRunner': 'jest-jasmine2', // jest-circus which doesn’t support done callback
  'verbose': true
};
