const { rules: baseBestPracticesRules } = require('eslint-config-airbnb-base/rules/best-practices');
const { rules: baseErrorsRules } = require('eslint-config-airbnb-base/rules/errors');
const { rules: baseES6Rules } = require('eslint-config-airbnb-base/rules/es6');
const { rules: baseImportsRules } = require('eslint-config-airbnb-base/rules/imports');
const { rules: baseStyleRules } = require('eslint-config-airbnb-base/rules/style');
const { rules: baseVariablesRules } = require('eslint-config-airbnb-base/rules/variables');
const tsEslintPlugin = require('@typescript-eslint/eslint-plugin');
const parserBase = require('@typescript-eslint/parser');
const stylistic = require('@stylistic/eslint-plugin');
const eslintPluginImportX = require('eslint-plugin-import-x');

module.exports = [
	{
		languageOptions: {
			parser: {
				// ? TODO: This must be only used on TS files
				meta: parserBase.meta,
				parseForESLint: parserBase.parseForESLint,
			},
			sourceType: 'module',
		},
		plugins: {
			'@typescript-eslint': tsEslintPlugin, // TODO: This must be only used on TS files
			'@stylistic': stylistic,
		},
		settings: {
			...eslintPluginImportX.flatConfigs.typescript.settings,
		},
		rules: {
			'brace-style': 'off',
			'@stylistic/brace-style': baseStyleRules['brace-style'],

			// The TypeScript version also adds 3 new options, all of which should be
			// set to the same value as the base config
			'comma-dangle': 'off',
			'@stylistic/comma-dangle': [
				baseStyleRules['comma-dangle'][0],
				{
					...baseStyleRules['comma-dangle'][1],
					enums: baseStyleRules['comma-dangle'][1].arrays,
					generics: baseStyleRules['comma-dangle'][1].arrays,
					tuples: baseStyleRules['comma-dangle'][1].arrays,
				},
			],

			'comma-spacing': 'off',
			'@stylistic/comma-spacing': baseStyleRules['comma-spacing'],

			'func-call-spacing': 'off',
			'@stylistic/func-call-spacing': baseStyleRules['func-call-spacing'],

			indent: 'off',
			'@stylistic/indent': baseStyleRules.indent,

			'keyword-spacing': 'off',
			'@stylistic/keyword-spacing': baseStyleRules['keyword-spacing'],

			'lines-between-class-members': 'off',
			'@stylistic/lines-between-class-members': baseStyleRules['lines-between-class-members'],

			'no-extra-parens': 'off',
			'@stylistic/no-extra-parens': baseErrorsRules['no-extra-parens'],

			'no-extra-semi': 'off',
			'@stylistic/no-extra-semi': baseErrorsRules['no-extra-semi'],

			'space-before-blocks': 'off',
			'@stylistic/space-before-blocks': baseStyleRules['space-before-blocks'],

			quotes: 'off',
			'@stylistic/quotes': baseStyleRules.quotes,

			semi: 'off',
			'@stylistic/semi': baseStyleRules.semi,

			'space-before-function-paren': 'off',
			'@stylistic/space-before-function-paren': baseStyleRules['space-before-function-paren'],

			'space-infix-ops': 'off',
			'@stylistic/space-infix-ops': baseStyleRules['space-infix-ops'],

			'object-curly-spacing': 'off',
			'@stylistic/object-curly-spacing': baseStyleRules['object-curly-spacing'],

			// Append all JS/TS extensions to Airbnb 'import/extensions' rule
			// https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
			'import/extensions': [
				baseImportsRules['import/extensions'][0],
				baseImportsRules['import/extensions'][1],
				{
					...baseImportsRules['import/extensions'][2],
					cjs: 'never',
					ts: 'never',
					tsx: 'never',
					mts: 'never',
					cts: 'never',
				},
			],

			// Append all JS/TS extensions to Airbnb 'import/no-extraneous-dependencies' rule
			// https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
			'import/no-extraneous-dependencies': [
				baseImportsRules['import/no-extraneous-dependencies'][0],
				{
					...baseImportsRules['import/no-extraneous-dependencies'][1],
					devDependencies: [
						...baseImportsRules['import/no-extraneous-dependencies'][1].devDependencies.map(
							(devDep) =>
							{
								let newDevDep = devDep;
								newDevDep = newDevDep.replace(/\.(js$|{js,jsx}$)/g, '.{js,jsx,mjs,cjs,ts,mts,cts}');
								newDevDep = newDevDep.replace(/{,\.js}$/g, '{,.js,.jsx,.mjs,.cjs,.ts,.mts,.cts}');
								return newDevDep;
							},
							[],
						),
						// Add new eslint config file
						'**/eslint.config.{js,jsx,mjs,cjs,ts,mts,cts}',
					],
				},
			],
		},
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
		rules: {
			// Rules
			camelcase: 'off',
			// The `@typescript-eslint/naming-convention` rule allows `leadingUnderscore` and `trailingUnderscore` settings. However, the existing `no-underscore-dangle` rule already takes care of this.
			'@typescript-eslint/naming-convention': [
				'error',
				// Allow camelCase variables (23.2), PascalCase variables (23.8), and UPPER_CASE variables (23.10)
				{
					selector: 'variable',
					format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
				},
				// Allow camelCase functions (23.2), and PascalCase functions (23.8)
				{
					selector: 'function',
					format: ['camelCase', 'PascalCase'],
				},
				// Airbnb recommends PascalCase for classes (23.3), and although Airbnb does not make TypeScript recommendations, we are assuming this rule would similarly apply to anything "type like", including interfaces, type aliases, and enums
				{
					selector: 'typeLike',
					format: ['PascalCase'],
				},
			],

			'default-param-last': 'off',
			'@typescript-eslint/default-param-last': baseBestPracticesRules['default-param-last'],

			'dot-notation': 'off',
			'@typescript-eslint/dot-notation': baseBestPracticesRules['dot-notation'],

			'no-array-constructor': 'off',
			'@typescript-eslint/no-array-constructor': baseStyleRules['no-array-constructor'],

			'no-dupe-class-members': 'off',
			'@typescript-eslint/no-dupe-class-members': baseES6Rules['no-dupe-class-members'],

			'no-empty-function': 'off',
			'@typescript-eslint/no-empty-function': baseBestPracticesRules['no-empty-function'],

			'no-implied-eval': 'off',
			// 'no-new-func': 'off',
			'@typescript-eslint/no-implied-eval': baseBestPracticesRules['no-implied-eval'],

			'no-loop-func': 'off',
			'@typescript-eslint/no-loop-func': baseBestPracticesRules['no-loop-func'],

			'no-magic-numbers': 'off',
			'@typescript-eslint/no-magic-numbers': baseBestPracticesRules['no-magic-numbers'],

			'no-redeclare': 'off',
			'@typescript-eslint/no-redeclare': baseBestPracticesRules['no-redeclare'],

			'no-shadow': 'off',
			'@typescript-eslint/no-shadow': baseVariablesRules['no-shadow'],

			'no-throw-literal': 'off',
			'@typescript-eslint/only-throw-error': baseBestPracticesRules['no-throw-literal'],

			'no-unused-expressions': 'off',
			'@typescript-eslint/no-unused-expressions': baseBestPracticesRules['no-unused-expressions'],

			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': baseVariablesRules['no-unused-vars'],

			'no-use-before-define': 'off',
			'@typescript-eslint/no-use-before-define': baseVariablesRules['no-use-before-define'],

			'no-useless-constructor': 'off',
			'@typescript-eslint/no-useless-constructor': baseES6Rules['no-useless-constructor'],

			'require-await': 'off',
			'@typescript-eslint/require-await': baseBestPracticesRules['require-await'],

			'no-return-await': 'off',
			'@typescript-eslint/return-await': [
				baseBestPracticesRules['no-return-await'],
				'in-try-catch',
			],

			// The following rules are enabled in Airbnb config, but are already checked (more thoroughly) by the TypeScript compiler
			// Some of the rules also fail in TypeScript files, for example: https://github.com/typescript-eslint/typescript-eslint/issues/662#issuecomment-507081586
			// Rules are inspired by: https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended.ts
			...tsEslintPlugin.configs['eslint-recommended'].overrides.rules,

			// The following rules are enabled in Airbnb config, but are recommended to be disabled within TypeScript projects
			// See: https://typescript-eslint.io/troubleshooting/typed-linting/performance/#eslint-plugin-import
			'import/named': 'off',
			'import/namespace': 'off',
			'import/default': 'off',
			'import/no-named-as-default-member': 'off',
			// Disable `import/no-unresolved`, see README.md for details
			'import/no-unresolved': 'off',
		},
	},
];
