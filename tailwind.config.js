export default {
	content: ['./node_modules/flowbite.{js,ts}', './tailwindcss/*'],
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
			sans: ['Fira+Sans', 'sans-serif'],
			serif: ['EB Garamond', 'serif'],
		},
		extend: {
			transitionProperty: {
				'max-height': 'max-height',
				height: 'height',
				spacing: 'margin, padding',
			},
			fontFamily: { special: ['Nanum+Gothic', 'sans-serif'] },
			colors: {
				primary: '#BFD400',
				primary2: '#BB66A5',
				secondary: '#4F501D',
				secondary2: '#56184A',
			},
			backgroundSize: {
				'250%': '250%',
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme('colors.secondary'),
						hr: { marginTop: '1rem', marginBottom: '3rem' },
					},
				},
			}),
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
