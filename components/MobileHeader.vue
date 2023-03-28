<template>
	<header>
		<nav
			class="fixed inset-0 h-screen w-screen transition transition-all transform translate-x-full bg-white"
		>
			<Icon
				class="absolute left-0 top-0"
				:name="{ 'material-symbols:menu-rounded': true }"
			></Icon>
		</nav>
	</header>
</template>

<script>
	export default { name: 'MobileHeader' }
</script>
