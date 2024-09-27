import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import react from 'eslint-plugin-react'
import prettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'
import _import from 'eslint-plugin-import'
import globals from 'globals'
import pluginJs from '@eslint/js'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import babelParser from '@babel/eslint-parser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    ignores: ['**/node_modules', '**/dist', '**/build', '**/node_modules', '.vscode', '.git'],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:prettier/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:react-hooks/recommended',
      'plugin:jsx-a11y/recommended'
    )
  ),
  {
    plugins: {
      react: fixupPluginRules(react),
      prettier: fixupPluginRules(prettier),
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        babelOptions: {
          configFile: path.resolve(__dirname, 'babel.config.json'),
        },
      },
      globals: {
        ...globals.browser,
      },
    },

    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src/'],
        },
      },
    },

    rules: {
      strict: 0,
      'import/namespace': 'off',
      indent: ['error', 2],
      'prettier/prettier': 'error',
      'linebreak-style': [0, 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 0,

      'import/no-unresolved': [
        2,
        {
          caseSensitive: false,
        },
      ],

      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.js', '.jsx'],
        },
      ],

      'import/order': [
        2,
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
    },
  },
]
