const eslint = require('@neutrinojs/eslint')
const react = require('@neutrinojs/react')
const WebpackBar = require('webpackbar')

module.exports = {
	options: {
		root: __dirname
	},
	use: [
		eslint({
			eslint: {
				baseConfig: {
					extends: [
						'plugin:prettier/recommended',
						'prettier/@typescript-eslint',
						'prettier/react',
					],
					parser: '@typescript-eslint/parser',
					parserOptions: {
						project: './tsconfig.json',
					},
				},
			},
		}),
		react({
			html: { title: 'biggerdeeps' },

			babel: {
				presets: ['@babel/typescript']
			}
		}),

		// Typescript file extensions
		neutrino => {
			neutrino.config.resolve.extensions.add('.ts')
			neutrino.config.resolve.extensions.add('.tsx')
			neutrino.config.module.rule('compile').test(/\.(wasm|m?jsx?|tsx?)$/);
		},

		// This is Very Important
		neutrino => neutrino.config.plugin('webpackbar').use(new WebpackBar()),
	],
}
