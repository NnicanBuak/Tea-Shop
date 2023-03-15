<template>
	<header></header>
	<main>
		<section class="container h-screen grid">
			<aside
				class="h-screen w-full grid gap-x-60 row-start-1 row-end-1 col-start-1 col-end-1 grid-cols-2 grid-rows-3 p-20"
			>
				<img
					class="h-full row-start-1 col-start-1 col-end-1"
					id="logo"
					style="grid-row-end: -1"
					src="/img/logo.png"
				/>
				<nav class="flex flex-col row-start-1 col-start-2">
					<div class="flex">
						<Icon
							class="text-lime-800"
							name="material-symbols:search"
							size="32"
						/>
						<Icon
							class="text-lime-800"
							name="material-symbols:shopping-bag-outline"
							size="32"
						/>
					</div>
					<div class="flex">
						<span>Магазин</span><span>Скидки(Постоянным клиентам?)</span
						><span>О нас</span><span>Контакты</span>
					</div>
				</nav>
				<div class="row-start-2 row-end-3 col-start-2 col-end-2" id="title">
					<h1 class="text-6xl flex flex-col">
						<span>Аромат&nbsp;на</span>
						<span>каждый&nbsp;день</span>
					</h1>
					<button
						class="px-6 py-2 border-2 border-black text-3xl rounded-full"
						type="button"
					>
						<span>выбрать</span>
					</button>
				</div>
			</aside>
			<Swiper
				class="h-full w-full row-start-1 row-end-1 col-start-1 col-end-1"
				style="z-index: -2"
				:modules="[SwiperAutoplay]"
				:slides-per-view="1"
				:loop="true"
				:autoplay="{
					delay: 15000,
					disableOnInteraction: true,
				}"
			>
				<SwiperSlide class="h-full w-full" v-for="slide in slides" :key="slide">
					<div
						class="h-full w-full"
						style="background-position: bottom"
						:style="{ background: 'url(' + slide + ')' }"
					></div>
				</SwiperSlide>
			</Swiper>
		</section>
	</main>
	<footer></footer>
</template>

<style>
	:root {
		--primary-color: #bfd400;
	}
	img {
		width: 100%;
	}
	section {
		margin-bottom: 15rem;
	}
	h1 {
		color: var(--primary-color);
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
		transform: translate3d(-8.25rem, -0.63rem, 0) scale(1.2, 1.2);
		width: 149px;
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
