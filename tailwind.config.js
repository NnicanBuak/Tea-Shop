export default {
	content: [
		'./pages/**/*.{vue,html,js,jsx}',
		'./components/**/*.{vue,html,js,jsx}',
	],
	safelist: [
		'translate-x-[calc(100%-8vw-36px)]',
		'translate-x-[calc(30%-8vw-36px)]',
	],
	theme: {
		backgroundPosition: {
			'left-59%-bottom': 'left 59% bottom',
			'left-62%-bottom': 'left 62% bottom',
		},
		backgroundSize: {
			'250%': '250%',
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
		},
	},
	plugins: ['@tailwindcss/typography', '@tailwindcss/forms'],
}
