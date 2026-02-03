import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["dist/**", "wailsjs/**", "node_modules/**"],
  },
  
  js.configs.recommended,
  
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-prototype-builtins": "off", 
      "no-cond-assign": ["error", "except-parens"],
    },
  },
];