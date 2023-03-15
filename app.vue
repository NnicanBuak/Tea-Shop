<template>
	<header></header>
	<main>
		<section class="container h-screen grid">
			<aside
				class="h-full w-full row-start-1 row-end-auto col-start-1 col-end-auto flex space-between p-20"
			>
				<div id="logo"></div>
				<div id="title">
					<nav></nav>
					<nav></nav>
					<h1 class="text-6xl text-right flex flex-col">
						<span>Аромат&nbsp;на</span>
						<span>каждый&nbsp;день</span>
					</h1>
					<button
						class="float-right px-6 py-2 border-2 border-black text-3xl rounded-full"
						type="button"
					>
						<span>выбрать</span>
					</button>
				</div>
			</aside>
			<div
				class="swiper-container relative row-start-1 row-end-auto col-start-1 col-end-auto"
			>
				<Swiper
					:modules="[SwiperAutoplay]"
					:slides-per-view="1"
					:loop="true"
					:autoplay="{
						delay: 15000,
						disableOnInteraction: true,
					}"
				>
					<SwiperSlide
						class="h-full w-full"
						v-for="slide in slides"
						:key="slide"
					>
						<div
							class="h-full w-full"
							:style="{ background: 'url(' + slide + ')' }"
						></div>
					</SwiperSlide>
				</Swiper>
			</div>
		</section>
	</main>
	<footer></footer>
</template>

<style>
	:root {
		--primary-color: #bfd400;
	}
	section {
		margin-bottom: 15rem;
	}
	h1 {
		color: var(--primary-color);
		font-family: "Montserrat", sans-serif;
		font-weight: bold;
	}
	p {
		font-family: sans-serif;
	}
	button:focus-visible {
		outline: none;
	}
	button > span {
		transition: all 0.2s ease-out;
	}
	button:hover > span {
		transform: translateY(-0.5rem);
	}
	button::after {
		content: "";
		position: absolute;
		transform: translate3D(-8.4rem, -0.1rem, 0);
		background-color: var(--primary-color);
		width: 167px;
		height: 56px;
		border-radius: 9999px;
		z-index: -1;
		transition: all 0.2s ease-out;
	}
	button:hover::after,
	button:focus-visible::after {
		transform: translate3d(-7.6rem, -0.6rem, 0) scale(1.5, 1.5);
		width: 128px;
	}
	button:active::after {
		transition: all 0.1s ease-out;
		transform: translate3d(-8.05rem, -0.6rem, 0) scale(1.25, 1.25);
		width: 142px;
	}
	#title > *:not(:last-child) {
		margin-bottom: 4rem;
	}
</style>

<script>
	export default {
		name: "App",
		data() {
			return {
				slides: ["/img/slide.png", "/img/slide.png", "/img/slide.png"],
			};
		},
	};
</script>
