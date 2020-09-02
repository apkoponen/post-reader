module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/pages'],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: 'jest.tsconfig.json',
    },
  },
  setupFilesAfterEnv: ['./test/setup.ts'],
};
