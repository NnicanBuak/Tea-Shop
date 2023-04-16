const plugin = require('tailwindcss/plugin')
module.exports = plugin(function ({ addComponents }) {
	addComponents({
		'.card': {
			'@apply relative p-6 bg-primary rounded-xl': {},
		},
		'.button': {
			'@apply transition-all lg:hover:px-4 lg:focus-visible:px-4 py-[1vw] lg:hover:border-[3px] focus-visible:border-[3px] lg:border-[3px] border-black max-lg:bg-primary text-black text-[6vw] lg:text-3xl font-bold lg:hover:uppercase focus-visible:uppercase tracking-[-0.15vw] rounded-full':
				{},
		},
		'.button-primary': {},
	})
})
