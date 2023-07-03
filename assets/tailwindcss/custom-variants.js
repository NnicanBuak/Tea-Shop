const plugin = require('tailwindcss/plugin')
module.exports = plugin(function ({ addVariant }) {
	addVariant('pointing', ['@media (pointer: fine) &:hover', '&:focus-within'])
})
