<template>
	<div>
		<div class="inline-flex rounded-md shadow-sm" role="group">
			<button
				type="button"
				class="px-4 py-2 font-medium text-md border-y-2"
				:class="{
					'bg-secondary border-secondary text-primary lg:hover:text-white lg:focus-visible:ring-primary2 lg:focus-visible:text-primary':
						selectedTitle === title,
					'bg-transparent border-secondary text-secondary lg:hover:text-white lg:hover:bg-secondary lg:focus-visible:ring-primary2 lg:focus-visible:text-primary':
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
