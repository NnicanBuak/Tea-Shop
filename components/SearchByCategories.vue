<script setup>
	const isLargeScreen = useMediaQuery('(min-width: 1024px)')
</script>

<template>
	<form class="relative flex">
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
			{{ category ? category : isLargeScreen ? 'Категория' : '' }}
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
						@click="handleDropdownSelect('')"
					>
						-
					</button>
				</li>
			</ul>
			<ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdown-button">
				<li>
					<button
						class="inline-flex w-full px-4 py-2 pointing:bg-gray-100"
						type="button"
						@click="handleDropdownSelect($event.target.innerText)"
					>
						Чай
					</button>
				</li>
				<li>
					<button
						class="inline-flex w-full px-4 py-2 pointing:bg-gray-100"
						type="button"
						@click="handleDropdownSelect($event.target.innerText)"
					>
						Микс
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
				class="peer block p-2.5 pr-8 w-full z-20 text-sm text-[#333] bg-gray-50 rounded-r-lg focus:rounded-lg border-l-gray-50 border-l-2 focus:border-l-[1px] border-gray-300 focus:ring-primary2 focus:border-primary2"
				v-model="search"
				ref="search"
				type="search"
				id="search-dropdown"
				placeholder="Хочу..."
				required
				@focus="isSearchFocus = true"
				@blur="isSearchFocus = false"
			/>
			<div
				class="wrapper absolute top-0 right-0 p-2.5 text-gray-400 peer-focus:text-[#333]"
			>
				<Icon name="material-symbols:search" size="1.5rem" />
			</div>

			<!-- <button
				type="submit"
				class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-primary2 rounded-r-lg border border-primary2 pointing:bg-secondary2 focus:ring-4 focus:outline-none focus:ring-blue-300"
			>
				<svg
					aria-hidden="true"
					class="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					></path>
				</svg>
				<span class="sr-only">Search</span>
			</button> -->
		</div>
	</form>
</template>

<script>
	export default {
		name: 'SearchByCatigories',
		data() {
			return {
				category: '',
				search: '',
				isDropdownOpen: false,
				isSearchFocus: false,
			}
		},
		mounted() {
			if (this.$route.query.search !== undefined) {
				this.search = this.$route.query.search

				const searchRef = this.$refs.search
				const end = searchRef.value.length
				searchRef.setSelectionRange(end, end)
				searchRef.focus()
			}
		},
		methods: {
			handleDropdownSelect(category) {
				this.isDropdownOpen = false
				this.category = category
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
