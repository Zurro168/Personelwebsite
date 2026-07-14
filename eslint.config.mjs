import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["scripts/**/*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Local reference repository and non-production audit scripts.
    "design-md-spec/**",
    "scratch/**",
    // Static exports are maintained by their source/build workflows.
    "public/**",
    // Legacy empty placeholder is UTF-16 and is not imported by the app.
    "src/data/cycle-maps.ts",
  ]),
]);

export default eslintConfig;
