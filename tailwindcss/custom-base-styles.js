const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ theme, addBase }) {
	const hStyle = {
		'@apply font-bold font-serif text-secondary': {},
	}

	addBase({
		hr: {
			'@apply mt-1 mb-3 bg-secondary bg-opacity-30 border-none rounded-full':
				{},
		},
		p: {
			'@apply font-sans text-base text-secondary': {},
		},
		h1: {
			...hStyle,
			fontSize: theme('fontSize.4xl'),
			color: theme('colors.primary'),
		},
		h2: { ...hStyle, fontSize: theme('fontSize.3xl') },
		h3: { ...hStyle, fontSize: theme('fontSize.2xl') },
		h4: { ...hStyle, fontSize: theme('fontSize.xl') },
		h5: { ...hStyle, fontSize: theme('fontSize.lg') },
		h6: { ...hStyle, fontSize: theme('fontSize.base') },
	})
})
