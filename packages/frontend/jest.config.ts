// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//   transformIgnorePatterns: [
//     "/node_modules/(?!@reduxjs|@standard-schema).+\\.js$"
//   ],
// };

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  transformIgnorePatterns: [
    '/node_modules/(?!(\\@standard-schema)/)',
  ],
};

export {};