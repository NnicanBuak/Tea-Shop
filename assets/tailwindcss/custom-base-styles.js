const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ theme, addBase }) {
	const hStyle = {
		'@apply font-bold font-serif text-secondary': {},
	}

	addBase({
		hr: {
			'@apply h-[2px] mt-1 mb-3 bg-secondary bg-opacity-30 border-none rounded-full':
				{},
		},
		p: {
			'@apply font-sans text-base text-secondary': {},
		},
		h1: {
			...hStyle,
			fontSize: theme('fontSize.4xl'),
			lineHeight: theme('lineHeight.10'),
			color: theme('colors.primary'),
		},
		h2: {
			...hStyle,
			fontSize: theme('fontSize.3xl'),
			lineHeight: theme('lineHeight.9'),
		},
		h3: {
			...hStyle,
			fontSize: theme('fontSize.2xl'),
			lineHeight: theme('lineHeight.8'),
		},
		h4: {
			...hStyle,
			fontSize: theme('fontSize.xl'),
			lineHeight: theme('lineHeight.7'),
		},
		h5: {
			...hStyle,
			fontSize: theme('fontSize.lg'),
			lineHeight: theme('lineHeight.6'),
		},
		h6: {
			...hStyle,
			fontSize: theme('fontSize.base'),
			lineHeight: theme('lineHeight.5'),
		},
	})
})
