const plugin = require('tailwindcss/plugin')
module.exports = plugin(function ({ theme, addComponents }) {
	addComponents({
		'.card': {
			position: 'relative',
			backgroundColor: theme('colors.primary'),
			borderRadius: theme('borderRadius.xl'),
			padding: theme('spacing.6'),
		},
	})
})
