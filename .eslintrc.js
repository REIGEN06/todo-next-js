module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:@web-bee-ru/react',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'react'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'comma-dangle': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'react-hooks/exhaustive-deps': 'off',
	},
};
