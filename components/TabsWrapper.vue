<template>
	<div>
		<div class="inline-flex rounded-md shadow-sm" role="group">
			<button
				type="button"
				class="px-4 py-2 text-md font-medium border-y-2"
				:class="{
					'text-secondary bg-white border border-gray-200 lg:hover:bg-gray-100 lg:hover:text-primary lg:focus-visible:z-10 focus-visible:ring-2 lg:focus-visible:ring-primary lg:focus-visible:text-primary dark:bg-secondary dark:border-gray-600 dark:text-white dark:lg:hover:text-white dark:lg:hover:bg-gray-600 dark:lg:focus-visible:ring-primary2 dark:lg:focus-visible:text-white':
						selectedTitle === title,
					'text-secondary bg-transparent border-secondary lg:hover:secondary lg:hover:text-white lg:focus-visible:z-10 lg:focus-visible:ring-2 lg:focus-visible:ring-primary lg:focus-visible:bg-secondary lg:focus-visible:text-white dark:border-secondary dark:text-secondary  dark:lg:focus-visible:bg-gray-700 dark:lg:hover:bg-gray-900 dark:lg:hover:text-white dark:lg:focus-visible:ring-gray-500 dark:lg:focus-visible:text-white':
						selectedTitle !== title,
					'rounded-l-lg border-l-2':
						tabTitles.length > 1 && tabTitles.indexOf(title) === 0,
					'rounded-r-lg border-r-2':
						tabTitles.length > 1 &&
						tabTitles.indexOf(title) === tabTitles.length - 1,
					'rounded-lg': tabTitles.length === 1,
				}"
				v-for="(title, index) in tabTitles"
				:key="index"
				@click="selectedTitle = title"
			>
				{{ title }}
			</button>
		</div>
		<slot />
	</div>
</template>

<script>
	export default {
		data() {
			const tabTitles = ref(this.$slots.default().map((tab) => tab.props.title))
			const selectedTitle = ref(tabTitles.value[0])
			provide('selectedTitle', selectedTitle)
			return { tabTitles, selectedTitle }
		},
	}
</script>
