<script setup>
	const isLargeScreen = useMediaQuery('(min-width: 1024px)')
</script>

<template>
	<form class="relative flex" @submit.prevent="">
		<label
			class="mb-2 text-sm font-medium text-[#333] sr-only"
			for="search-dropdown"
		>
			Поиск
		</label>
		<button
			type="button"
			class="z-10 inline-flex flex-shrink-0 items-center py-2.5 px-4 text-sm font-medium text-center text-[#333] bg-gray-100 border border-gray-300 rounded-l-lg pointing:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
			id="dropdown-button"
			data-dropdown-toggle="dropdown"
			v-show="!isSearchFocus"
			@click="isDropdownOpen = true"
		>
			<span>{{ category ? category : isLargeScreen ? 'Категория' : '' }}</span>
			<Icon name="material-symbols:arrow-drop-down-rounded" size="1.2rem" />
		</button>
		<div
			class="z-20 absolute left-0 top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
			v-show="isDropdownOpen"
			ref="dropdown"
		>
			<ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdown-button">
				<li>
					<button
						class="inline-flex w-full px-4 py-2 pointing:bg-gray-100"
						type="button"
						value=""
						@click="handleDropdownSelect($event)"
					>
						-
					</button>
				</li>
			</ul>
			<ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdown-button">
				<li v-for="item in categories">
					<button
						class="inline-flex w-full px-4 py-2 pointing:bg-gray-100"
						type="button"
						:value="item"
						@click="handleDropdownSelect($event)"
					>
						{{ item }}
					</button>
				</li>
			</ul>
		</div>
		<div
			class="z-10 fixed inset-0 h-screen w-screen"
			v-show="isDropdownOpen"
			@click="isDropdownOpen = false"
		></div>
		<div class="relative w-full">
			<input
				class="peer block p-2.5 pr-11 w-full z-20 text-sm text-[#333] bg-gray-50 rounded-r-lg focus:rounded-lg border-l-gray-50 border-l-2 focus:border-l-[1px] border-gray-300 focus:ring-primary2 focus:border-primary2"
				v-model="search"
				ref="search"
				type="search"
				id="search-dropdown"
				placeholder="Хочу..."
				required
				@focus="isSearchFocus = true"
				@blur="isSearchFocus = false"
				@keydown.enter="$event.target.blur()"
			/>
			<div
				class="wrapper absolute top-0 right-0 p-2.5 text-gray-400 peer-focus:text-[#333]"
			>
				<Icon name="material-symbols:search" size="1.5rem" />
			</div>
		</div>
	</form>
</template>

<script>
	export default {
		name: 'SearchByCatigories',
		data() {
			return {
				categories: ['Чай', 'Сбор'],
				category: '',
				search: '',
				isDropdownOpen: false,
				isSearchFocus: false,
			}
		},
		watch: {
			category(newValue) {
				const state = {
					category: newValue,
					search: this.search,
				}

				history.pushState(
					state,
					'',
					state.category !== ''
						? `products?category=${state.category}?search=${state.search}`
						: state.search !== ''
						? `products?category=${state.search}`
						: '?',
				)

				this.$route.query.category = newValue

				this.$emit('filtering', state)
			},
			search(newValue) {
				this.debounce(() => {
					const state = {
						category: this.category,
						search: newValue,
					}

					history.pushState(
						state,
						'',
						state.search !== ''
							? `products?category=${state.category}?search=${state.search}`
							: state.category !== ''
							? `products?category=${state.category}`
							: '?',
					)

					this.$route.query.search = newValue

					this.$emit('filtering', state)
				}, 300)()
			},
		},
		created() {
			if (this.$route.query.search) {
				this.search = this.$route.query.search

				const searchRef = this.$refs.search
				this.handleInputFocus(searchRef)
			}

			if (
				this.$route.query.category &&
				this.categories.includes(this.$route.query.category)
			) {
				this.category = this.$route.query.category
			}
		},
		methods: {
			handleInputFocus(target) {
				const end = target.value.length
				target.setSelectionRange(end, end)
				target.focus()
			},
			handleDropdownSelect(event) {
				this.isDropdownOpen = false
				this.category = event.target.value
			},
			debounce(fn, wait) {
				let timer
				return function (...args) {
					if (timer) {
						clearTimeout(timer)
					}
					const context = this
					timer = setTimeout(() => {
						fn.apply(context, args)
					}, wait)
				}
			},
		},
	}
</script>