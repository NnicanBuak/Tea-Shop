<template>
	<div
		class="card p-0 h-[450px] w-full flex flex-col border-2 border-gray-200 bg-white"
		@click="navigateTo({ path: '/shop/products', query: { id: id } })"
	>
		<div
			class="basis-3/5"
			:style="{
				background: `url(${image})`,
				backgroundPosition: 'center',
				backgroundSize: 'cover',
			}"
		></div>
		<div class="wrapper p-6 space-y-4">
			<h2 class="text-black" v-if="search">
				<span class="font-normal"
					>{{ title.replace(search, 'Ô').split('Ô')[0] }}
				</span>
				<span class="px-1">{{ search }} </span>
				<span class="font-normal"
					>{{ title.replace(search, 'Ô').split('Ô')[1] }}
				</span>
			</h2>
			<h2 class="text-black font-normal" v-else>{{ title }}</h2>
			<h3 class="font-sans text-black">
				<span class="font-normal">{{ piece + 'г.' + ' / ' }}</span>
				<span>{{ price + '₽' }}</span>
			</h3>
			<div class="wrapper flex flex-wrap gap-2" id="tags">
				<div
					class="w-fit px-4 py-1 font-bold text-sm text-secondary rounded-full bg-primary bg-opacity-25 border-2 border-primary"
				>
					{{ category }}
				</div>
				<div
					class="w-fit px-4 py-1 font-bold text-sm rounded-full bg-opacity-25 border-2"
					:class="{
						'bg-[#fc3c0b] border-[#fc3c0b] text-[#9c2406]':
							variety === 'Чёрный',
						'bg-[#790a06] border-[#790a06] text-[#3a0503]':
							variety === 'Красный',
						'bg-[#f8cb66] border-[#f8cb66] text-[#8d743b]': variety === 'Улун',
						'bg-[#fcc85b] border-[#fcc85b] text-[#997a38]':
							variety === 'Зелёный',
						'bg-[#ffe7c8] border-[#ffe7c8] text-[#8b7f6e]': variety === 'Белый',
						'bg-[#e67d19] border-[#e67d19] text-[#bb6515]':
							variety === 'Травянной',
					}"
					v-if="category === 'Чай' && variety"
				>
					{{ variety }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ProductCard',
		props: {
			id: { type: Number, required: true },
			image: { type: String, default: '/img/pattern-02.png' },
			title: { type: String, required: true },
			price: { type: Number, required: true },
			piece: { type: Number, required: false },
			category: { type: String, required: false },
			variety: { type: String, required: false },
			search: { type: String, required: false },
		},
	}
</script>
