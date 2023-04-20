const plugin = require('tailwindcss/plugin')
module.exports = plugin(function ({ addVariant }) {
	addVariant('pointing', [
		'@media (min-width: 1024px) &:hover',
		'&:focus-within',
	])
})
