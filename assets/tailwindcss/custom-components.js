const plugin = require('tailwindcss/plugin')
module.exports = plugin(function ({ addComponents }) {
	addComponents({
		'.card': {
			'@apply relative overflow-clip p-6 bg-primary shadow-xl rounded-xl': {},
		},
		'.button': {
			'@apply py-[1vw] text-xl rounded-full': {},
		},
		'.button-primary': {
			'@apply transition-all pointing:px-4 pointing:border-[3px] bg-primary border-black max-lg:bg-primary font-special font-[800] text-2xl text-black pointing:uppercase tracking-[-0.15vw]':
				{},
		},
	})
})
