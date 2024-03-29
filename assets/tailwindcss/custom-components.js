const plugin = require('tailwindcss/plugin')
module.exports = plugin(function ({ addComponents }) {
	addComponents({
		'.card': {
			'@apply relative overflow-clip p-6 bg-primary shadow-xl rounded-xl': {},
		},
		'.button': {
			'@apply min-h-[40px] py-2 px-6 flex justify-center items-center leading-none rounded-full':
				{},
		},
		'.button-primary': {
			'@apply bg-primary border-black max-lg:bg-primary font-special font-bold text-black':
				{},
		},
		'.button-primary2': {
			'@apply bg-primary2 border-secondary2 max-lg:bg-primary2 font-special font-bold text-white':
				{},
		},
	})
})
