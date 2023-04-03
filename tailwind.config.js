export default {
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
	variants: {
		extend: {
			backgroundColor: ['interact'],
			borderColor: ['interact'],
			textColor: ['interact'],
		},
	},
	plugins: [
		function ({ addVariant, e }) {
			addVariant('interact', ({ container }) => {
				container.walkRules((rule) => {
					rule.selector = `.${e(
						`interact${rule.selector.slice(1)}`,
					)}:hover, .${e(`interact${rule.selector.slice(1)}`)}:focus, .${e(
						`interact${rule.selector.slice(1)}`,
					)}:focus-visible, .lg\\:hover\\:${e(
						`interact${rule.selector.slice(1)}`,
					)}:hover`
				})
			})
		},
	],
}
