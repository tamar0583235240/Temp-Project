module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    "/node_modules/(?!@reduxjs|@standard-schema).+\\.js$"
  ],
};