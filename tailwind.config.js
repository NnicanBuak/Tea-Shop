export default {
	content: ['./node_modules/flowbite.{js,ts}'],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: 'calc(8vw + 24px)',
				lg: '50px',
				xl: '0px',
			},
		},
		fontFamily: {
			sans: ['Montserrat', 'sans-serif'],
			serif: ['EB Garamond', 'serif'],
		},
		extend: {
			colors: {
				primary: '#BFD400',
				primary2: '#BB66A5',
				secondary: '#4F501D',
				secondary2: '#56184A',
			},
			backgroundPosition: {
				'left-59%-bottom': 'left 59% bottom',
				'left-62%-bottom': 'left 62% bottom',
			},
			backgroundSize: {
				'250%': '250%',
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('flowbite'),
		require('tailwindcss-touch'),
		require('./tailwindcss/custom-base-styles'),
		require('./tailwindcss/custom-components'),
		require('./tailwindcss/custom-variants'),
	],
}
