module.exports = {
  root: true,
  extends: ["next", "next/core-web-vitals"],
  parserOptions: {
    tsconfigRootDir: __dirname
  },
  rules: {
    "no-unused-vars": "off"
  }
};
