const plugin = require('tailwindcss/plugin')
module.exports = plugin(function ({ addVariant }) {
	addVariant('interact', [
		'@media (min-width: 1024px)',
		'&:hover',
		'&:focus-visible',
	])
})
