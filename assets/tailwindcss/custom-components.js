const plugin = require('tailwindcss/plugin')
module.exports = plugin(function ({ addComponents }) {
	addComponents({
		'.card': {
			'@apply relative overflow-clip p-6 bg-primary shadow-xl rounded-xl': {},
		},
		'.button': {
			'@apply py-1 px-4 flex items-center leading-none rounded-full': {},
		},
		'.button-primary': {
			'@apply transition-all pointing:px-4 pointing:border-[3px] bg-primary border-black max-lg:bg-primary font-special font-bold text-black pointing:uppercase':
				{},
		},
	})
})
