import plugin from 'tailwindcss/plugin'
import tailwindTypography from '@tailwindcss/typography'
import tailwindForms from '@tailwindcss/forms'

export default {
	content: [
		'./components/**/*.{vue,js,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./composables/**/*.{js,ts}',
		'./plugins/**/*.{js,ts}',
		'./utils/**/*.{js,ts}',
		'./App.{js,ts,vue}',
		'./app.{js,ts,vue}',
		'./Error.{js,ts,vue}',
		'./error.{js,ts,vue}',
		'./.nuxt/content-cache/parsed/**/*.md',
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: 'calc(8vw + 24px)',
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
		tailwindTypography,
		tailwindForms,
		plugin(function ({
			theme,
			addBase,
			addComponents,
			addUtilities,
			addVariant,
		}) {
			const hStyle = {
				fontWeight: theme('fontWeight.bold'),
				fontFamily: theme('fontFamily.serif'),
				color: theme('colors.primary'),
			}

			addBase({
				hr: {
					marginTop: theme('margin.1'),
					marginBottom: theme('margin.3'),
					borderRadius: theme('borderRadius.full'),
					borderStyle: 'none',
				},
				p: {
					fontSize: theme('fontSize.base'),
					fontFamily: theme('fontFamily.sans'),
					color: theme('colors.secondary'),
				},
				h1: { ...hStyle, fontSize: theme('fontSize.4xl') },
				h2: { ...hStyle, fontSize: theme('fontSize.3xl') },
				h3: { ...hStyle, fontSize: theme('fontSize.2xl') },
				h4: { ...hStyle, fontSize: theme('fontSize.xl') },
				h5: { ...hStyle, fontSize: theme('fontSize.lg') },
				h6: { ...hStyle, fontSize: theme('fontSize.base') },
			})

			addComponents({
				'.card': {
					backgroundColor: theme('colors.primary'),
					borderRadius: theme('borderRadius.xl'),
					padding: theme('spacing.6'),
				},
			})

			addVariant({
				interact: ['@media (min-width: 1024px) &:hover', '&:focus-visible'],
			})
		}),
	],
}
