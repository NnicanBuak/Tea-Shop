<script setup>
	const route = useRoute();
</script>

<template>
	<div
		class="-z-10 absolute h-8 w-8 bg-color-primary rounded-full"
		id="cursor"
	></div>
	<div>
		<NuxtLayout :name="route.meta.layout">
			<NuxtPage></NuxtPage>
		</NuxtLayout>
	</div>
</template>

<style>
	body {
		/* cursor: none; */
	}
	img {
		width: 100%;
	}
	h1 {
		font-family: "Montserrat", sans-serif;
		font-weight: bold;
		margin-bottom: 3rem;
	}
	p {
		font-family: Arial, Helvetica, sans-serif;
	}
	button:focus-visible {
		outline: none;
	}
	button:hover,
	button:focus-visible {
		text-transform: uppercase;
		letter-spacing: -0.058em;
	}
	button::after {
		content: "";
		position: absolute;
		transform: translate3D(-8.4rem, -0.3rem, 0);
		background-color: #bfd400;
		width: 167px;
		height: 56px;
		border-radius: 9999px;
		transition: all 0.2s ease-out;
	}
	button:hover::after,
	button:focus-visible::after {
		transform: translate3d(-7.6rem, -0.6rem, 0) scale(1.5, 1.5);
		width: 128px;
	}
	button:active::after {
		transition: all 0.1s ease-out;
		transform: translate3d(-8.25rem, -0.63rem, 0) scale(1.2, 1.2);
		width: 149px;
	}
	#cusror {
		display: block;
	}
</style>

<script>
	if (process.browser) {
		const cursor = document.getElementById("cursor");
		document.addEventListener("mousemove", (e) => {
			cursor.style.left = e.pageX + "px";
			cursor.style.top = e.pageY + "px";
		});
	}
</script>
