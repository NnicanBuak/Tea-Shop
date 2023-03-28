<template>
	<header
		class="fixed h-screen w-screen inset-0 transform translate-x-full transition transition-all bg-white"
	>
		<button
			class="absolute -left-10 transform -translate-x-full"
			:class="{
				'cursor-none': $route.path === '/shop',
				'top-12': !isAppAtTop,
				'-left-14': !isAppAtTop,
			}"
			type="button"
		>
			<Icon name="material-symbols:menu-rounded" size="10vw"></Icon>
		</button>
		<nav class=""></nav>
	</header>
</template>

<script>
	export default { name: 'MobileHeader' }
</script>
