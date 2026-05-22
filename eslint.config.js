import js from '@eslint/js'
import globals from 'globals'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import pluginReact from 'eslint-plugin-react'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx,css}'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
                project: './tsconfig.json',
            },
            globals: globals.browser,
        },
        plugins: {
            js,
            '@typescript-eslint': tseslint,
            react: pluginReact,
            prettier: prettierPlugin,
        },
        extends: [
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:react/recommended',
            'plugin:react/jsx-runtime',
            'plugin:prettier/recommended',
            'prettier',
        ],
        rules: {
            'no-console': 'warn',
            'no-debugger': 'error',

            'react/react-in-jsx-scope': 'off',

            '@typescript-eslint/explicit-function-return-type': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/strict-boolean-expressions': 'error',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/no-non-null-assertion': 'error',
            '@typescript-eslint/prefer-optional-chain': 'warn',
            '@typescript-eslint/prefer-nullish-coalescing': 'warn',
            '@typescript-eslint/explicit-function-return-type': [
                'warn',
                { allowExpressions: true },
            ],
            '@typescript-eslint/no-inferrable-types': 'warn',
            '@typescript-eslint/no-misused-promises': 'error',
            '@typescript-eslint/consistent-type-definitions': [
                'error',
                'interface',
            ],
            'prettier/prettier': 'error',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
])
