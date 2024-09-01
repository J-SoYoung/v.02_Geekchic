import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import { Linter } from "eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    settings: { react: { version: "18.3" } },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react-hooks/recommended",
      "prettier",
    ],
    files: ["**/*.{ts,tsx}"],
    parser: "@typescript-eslint/parser",
    plugins: {
      react,
      reactHooks,
      reactRefresh,
      "@typescript-eslint": tseslint,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier: prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // React Hooks의 올바른 사용을 보장
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      ...react.configs.recommended.rules,
      // React 개발에서 일반적으로 권장되는 규칙들
      ...react.configs["jsx-runtime"].rules,
      // React 17 이상에서 도입된 새로운 JSX Transform을 사용하는 프로젝트를 위한 추가 규칙
      "prettier/prettier": "error",
      // Prettier 규칙을 ESLint에서 에러로 처리
    },
    languageOptions: {
      // ESLint의 동작을 제어하는 방법
      ecmaVersion: 2020,
      // ECMA최신 버전을 따라 코드 분석
      globals: globals.browser,
      // 전역 변수를 인식할 수 있도록 설정
      parserOptions: {
        // ESLint의 파서가 코드를 분석할 때 사용할 옵션
        // TypeScript에서 project를 기반으로 타입 정보를 검사
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
