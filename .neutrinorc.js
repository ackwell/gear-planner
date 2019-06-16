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
				presets: ['@babel/typescript'],
			}
		}),

		// Root path module resolution
		neutrino => {
			const {modules} = neutrino.config.resolve
			modules.add('node_modules')
			modules.add('src')
		},

		// Typescript file extensions
		neutrino => {
			neutrino.config.resolve.extensions.add('.ts')
			neutrino.config.resolve.extensions.add('.tsx')
			neutrino.config.module.rule('compile').test(/\.(wasm|m?jsx?|tsx?)$/);
		},

		// Prepend decorators plugin
		neutrino => {
			neutrino.config.module
				.rule('compile')
					.use('babel')
						.tap(options => ({
							...options,
							plugins: [
								['@babel/plugin-proposal-decorators', {legacy: true}],
								...options.plugins,
							],
						}))
		},

		// Webpackbar, because _that's_ important
		neutrino => neutrino.config.plugin('webpackbar').use(new WebpackBar()),
	],
}
