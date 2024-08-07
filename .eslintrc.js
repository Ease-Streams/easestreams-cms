module.exports = {
  root: true,
  extends: ["plugin:@next/next/recommended", "@payloadcms"],
  ignorePatterns: ["**/payload-types.ts"],
  rules: {
    "simple-import-sort/imports": "off", // Disable sorting imports rule
    "simple-import-sort/exports": "off", // Disable sorting imports rule
    "@typescript-eslint/no-unused-vars": "off", // Disable unused vars rule
    "prettier/prettier": "off",
    "no-console": "off", // Disable no-console rule
    "dot-notation": "off", // Disable no-console rule
    "eol-last": "off", // Disable no-console rule
  },
};
