import { defineConfig } from 'windicss/helpers' // Для подсказок в IDE

function range(size, startAt = 1) {
	return Array.from(Array(size).keys()).map((i) => i + startAt)
}

export default defineConfig({
	extract: {
		include: ['src/**/*.{vue,html,jsx,tsx}'],
		exclude: ['node_modules', '.nuxt', '.output', 'assets', 'public', 'server'],
	},
	safelist: [range(100).map(item => `translte-x-[calc(${item}-8vw-36px)]`)],
	theme: {
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
	plugins: [require('windicss/plugin/forms')],
})
