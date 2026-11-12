import js from "@eslint/js";
import pluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";
import globals from "globals";

export default [
  {
    ignores: ["dist/", ".astro/", "node_modules/", ".opencode/", ".pi/"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginAstro.configs["flat/recommended"],
  {
    // El código corre en el navegador (scripts is:inline + módulos Astro).
    languageOptions: {
      globals: { ...globals.browser },
    },
    rules: {
      // El proyecto usa plantillas con HTML inline (set:html) de forma
      // deliberada (tiles SVG, párrafos con <strong>): no lo tratamos como error.
      "astro/no-set-html": "off",
      // Evitamos ruido en un repo pequeño y deliberadamente simple.
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
];
