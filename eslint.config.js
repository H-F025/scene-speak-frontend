// Next.js + TypeScript向けのESLint設定。any型禁止・console.log警告 + react-doctor によるアーキ/品質診断
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import reactDoctor from 'eslint-plugin-react-doctor'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname })

const eslintConfig = [
  { ignores: ['.next/**', 'next-env.d.ts'] },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  reactDoctor.configs.recommended,
  reactDoctor.configs.next,
  reactDoctor.configs['tanstack-query'],
  {
    rules: {
      // 型安全
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      // コード品質
      'no-console': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      'eqeqeq': ['error', 'always'],
      'no-implicit-coercion': 'error',

      // import整理
      'import/no-duplicates': 'error',

      // CLAUDE.md のバレル方針 (feature 外からは barrel 経由必須) と
      // react-doctor の no-barrel-import (barrel 自体を避けるべきとする) は方針が対立する。
      // 本プロジェクトは Bulletproof React 準拠で barrel を public API として使うため off にする
      'react-doctor/no-barrel-import': 'off',
    },
  },
  {
    // バレル (`index.ts` / `index.tsx`) は re-export aggregator として
    // components と non-components (variants / constants / types) を意図的に混在させる。
    // Fast Refresh の責務はコンポーネント定義ファイル側で担保するため、barrel では off にする
    files: ['**/index.ts', '**/index.tsx'],
    rules: {
      'react-doctor/only-export-components': 'off',
    },
  },
  {
    // Next.js App Router 規約ファイル (layout.tsx / page.tsx 等) は
    // `metadata` / `dynamic` / `revalidate` 等の非コンポーネント export を Next.js 側が要求する
    files: ['src/app/**/*.{ts,tsx}'],
    rules: {
      'react-doctor/only-export-components': 'off',
    },
  },
]

export default eslintConfig
