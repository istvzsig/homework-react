// jest.config.js
module.exports = {
  preset: "ts-jest", // You can keep this if you want to use the ts-jest preset
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        /* ts-jest config options can go here */
      },
    ],
    "^.+\\.jsx?$": "babel-jest", // Transform JavaScript files
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
};
