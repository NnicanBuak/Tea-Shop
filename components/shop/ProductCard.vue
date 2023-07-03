<script setup>
	const windowSize = useWindowSize()

	const isCardHovered = ref(null)
	const imageStyles = ref(null)

	watch(isCardHovered, async (newBoolean) => {
		if (windowSize.width > 1024 && newBoolean) {
			imageStyles.value.backgroundSize = '130%'
		} else {
			imageStyles.value.backgroundSize = '100%'
		}
	})

	const handleMouseEnterCard = () => {
		isCardHovered.value = true
	}
	const handleMouseLeaveCard = () => {
		isCardHovered.value = false
	}

	onMounted(() => {
		imageStyles.value = {
			backgroundPosition: 'center',
			backgroundSize: '100%',
		}
	})
</script>

<template>
	<div
		class="card static p-0 w-full h-[450px] flex flex-col border-2 border-gray-200 bg-white pointing:shadow-none transition-shadow"
		@click="handleProductSelecting"
		@mouseenter="handleMouseEnterCard"
		@mouseleave="handleMouseLeaveCard"
	>
		<div
			class="absolute top-0 left-0 w-full h-full flex items-center justify-center"
			v-if="!inStock"
		></div>
		<div
			class="basis-2/5 transition"
			:style="{
				background: `url(${image})`,
				...imageStyles,
				transition: 'background-size 0.4s ease-out',
			}"
		></div>
		<div class="wrapper p-6 space-y-4 basis-3/5">
			<div class="wrapper">
				<h2
					class="font-normal text-black leading-relaxed"
					id="highlightedTitle"
					v-html="highlightedTitle"
					v-if="search !== ''"
				></h2>
				<h2 class="text-black font-normal" v-else>{{ title }}</h2>
			</div>
			<h3 class="font-sans font-normal text-black">
				<span>{{ price }}</span>
				<span class="text-xl"> ₽</span>
				<span class="text-sm">{{ ' / ' + piece + ' г.' }}</span>
			</h3>
			<p
				class="h-[60px] font-normal text-gray-400 text-sm line-clamp-3 overflow-hidden"
			>
				{{ description }}
			</p>
			<div class="wrapper flex flex-wrap gap-2">
				<div
					class="h-8 w-fit px-4 flex items-center font-bold text-sm text-secondary bg-primary bg-opacity-25 border-2 border-primary rounded-full leading-none"
				>
					{{ category }}
				</div>
				<div
					class="h-8 w-fit px-4 flex items-center font-bold text-sm rounded-full bg-opacity-25 border-2"
					:class="{
						'bg-[#fc3c0b] border-[#fc3c0b] text-[#9c2406]':
							teaVariety === 'Чёрный',
						'bg-[#790a06] border-[#790a06] text-[#3a0503]':
							teaVariety === 'Красный',
						'bg-[#f8cb66] border-[#f8cb66] text-[#8d743b]':
							teaVariety === 'Улун',
						'bg-[#fcc85b] border-[#fcc85b] text-[#997a38]':
							teaVariety === 'Зелёный',
						'bg-[#ffe7c8] border-[#ffe7c8] text-[#8b7f6e]':
							teaVariety === 'Белый',
						'bg-[#e67d19] border-[#e67d19] text-[#bb6515]':
							teaVariety === 'Травянной',
					}"
					v-if="category === 'Чай' && teaVariety"
				>
					{{ teaVariety }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ProductCard',
		props: {
			inStock: { type: Boolean, required: true },
			id: { type: Number, required: true },
			image: { type: String, default: '/img/pattern-02.png' },
			title: { type: String, required: true },
			price: { type: Number, required: true },
			piece: { type: Number, required: false },
			category: { type: String, required: false },
			teaVariety: { type: String, required: false },
			search: { type: String, required: false },
			description: { type: String, required: false },
		},
		computed: {
			highlightedTitle() {
				let highlightedTitle = this.title
				const searchWords = this.search
					.toLowerCase()
					.split(' ')
					.filter((word) => word !== '')
				searchWords.forEach((searchWord, i) => {
					const lowercaseTitle = highlightedTitle.toLowerCase()
					const startIndex = lowercaseTitle.indexOf(
						searchWord,
						i * searchWord.length,
					)
					if (startIndex !== -1) {
						const endIndex = startIndex + searchWord.length
						const before = highlightedTitle.slice(0, startIndex)
						const after = highlightedTitle.slice(endIndex)
						highlightedTitle =
							before +
							'<b>' +
							highlightedTitle.slice(startIndex, endIndex) +
							'</b>' +
							after
					}
				})
				return highlightedTitle
			},
		},
		methods: {
			handleProductSelecting() {
				if (this.inStock)
					navigateTo({ path: '/shop/products', query: { id: this.id } })
			},
		},
	}
</script>

<style>
	#highlightedTitle > b {
		padding-left: 0.25rem;
		padding-right: 0.25rem;
		background-color: rgb(191 212 0);
		border-radius: 0.75rem;
	}
</style>
