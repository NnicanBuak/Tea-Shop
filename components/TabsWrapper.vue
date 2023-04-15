<template>
	<div>
		<ul>
			<li
				v-for="title in tabTitles"
				:key="title"
				@click="selectedTitle = title"
			>
				<h1>{{ title }}</h1>
			</li>
		</ul>
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
