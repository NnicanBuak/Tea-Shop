const plugin = require('tailwindcss/plugin')
module.exports = plugin(function ({ theme, addComponents }) {
	buttonStyles = { transition: theme(transition.all) }
	addComponents({
		'.card': {
			position: 'relative',
			backgroundColor: theme('colors.primary'),
			borderRadius: theme('borderRadius.xl'),
			padding: theme('spacing.6'),
		},
		'.button-primary': {
			// transition-all lg:hover:px-4 lg:focus-visible:px-4 py-[1vw] lg:hover:border-[3px] focus-visible:border-[3px] lg:border-[3px] border-black max-lg:bg-primary text-black text-[6vw] lg:text-3xl font-bold lg:hover:uppercase focus-visible:uppercase tracking-[-0.15vw] rounded-full
		},
	})
})
