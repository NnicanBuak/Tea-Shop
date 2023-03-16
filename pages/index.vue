<script setup>
	definePageMeta({
		layout: "main",
		hasHeader: false,
		hasFooter: true,
		hasNewsletterBlock: true,
	});
</script>

<template>
	<section class="container mb-40 h-screen grid overflow-hidden">
		<aside
			class="h-screen w-full sm:flex md:grid md:gap-x-22 xl:gap-x-60 row-start-1 row-end-1 col-start-1 col-end-1 grid-cols-2 grid-rows-3 p-20"
		>
			<img
				class="hidden md:block h-full md:row-start-1 md:col-start-1 md:col-end-1"
				id="logo"
				style="grid-row-end: -1"
				src="/img/logo.png"
			/>
			<nav class="hidden flex flex-col md:row-start-1 md:col-start-2">
				<div class="flex">
					<NuxtLink to="/shop/catalog">
						<Icon
							class="text-lime-800"
							name="material-symbols:search"
							size="32"
						/>
					</NuxtLink>
					<NuxtLink to="">
						<Icon
							class="text-lime-800"
							name="material-symbols:shopping-bag-outline"
							size="32"
						/>
					</NuxtLink>
				</div>
				<div class="flex">
					<NuxtLink to="/">
						<span><b>Магазин</b></span>
					</NuxtLink>
					<NuxtLink to="/sales">
						<span>Скидки(Постоянным клиентам?)</span>
					</NuxtLink>
					<NuxtLink to="/about">
						<span>О нас</span>
					</NuxtLink>
					<NuxtLink to="/contacts">
						<span>Контакты</span>
					</NuxtLink>
				</div>
			</nav>
			<div
				class="hidden sm:block row-start-2 row-end-3 col-start-2 col-end-2"
				id="title"
			>
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
			style="z-index: -20"
			:modules="[SwiperAutoplay]"
			:slides-per-view="1"
			:loop="true"
			:autoplay="{
				delay: 15000,
				disableOnInteraction: true,
			}"
		>
			<SwiperSlide
				class="h-full w-full bg-bottom"
				v-for="slide in slides"
				:key="slide"
				:style="{ background: 'url(' + slide + ')' }"
			>
			</SwiperSlide>
		</Swiper>
	</section>
</template>

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
