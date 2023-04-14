const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ theme, addBase }) {
	const hStyle = {
		fontWeight: theme('fontWeight.bold'),
		fontFamily: theme('fontFamily.serif'),
		color: theme('colors.secondary'),
	}

	addBase({
		hr: {
			marginTop: theme('margin.1'),
			marginBottom: theme('margin.3'),
			borderRadius: theme('borderRadius.full'),
			backgroundColor: theme('colors.secondary'),
			backgrondOpacity: '0.3',
			borderStyle: 'none',
		},
		p: {
			fontSize: theme('fontSize.base'),
			fontFamily: theme('fontFamily.sans'),
			color: theme('colors.secondary'),
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
