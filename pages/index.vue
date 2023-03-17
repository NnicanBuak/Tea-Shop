<script setup>
	definePageMeta({
		layout: "main",
		hasHeader: false,
		hasFooter: true,
		hasNewsletterBlock: true,
	});
</script>

<template>
	<section class="container-fluid mb-40 h-screen grid overflow-hidden">
		<aside
			class="h-screen container-xl flex gap-4 flex-col justify-around items-center lg:grid grid-cols-2 grid-rows-3 lg:gap-x-22 xl:gap-x-60 p-14 max-lg:py-32 lg:p-20 row-[1/-1] col-[1/-1]"
		>
			<img
				class="hidden lg:block h-full lg:row-[1/-1] lg:col-[1/1]"
				id="logo"
				src="/img/logo.png"
				ast=""
			/>
			<div class="flex flex-col gap-16" id="alt-title">
				<img
					class="block lg:hidden w-[70vw]"
					id="logo2"
					src="/img/logo2.png"
					alt=""
				/>
				<h3
					class="block lg:hidden w-full text-[4vw] whitespace-nowrap text-center"
				>
					порой хочется начать день не с кофе
				</h3>
			</div>
			<nav class="hidden flex flex-col md:row-[1/1] md:col-[2/2]">
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
			<div class="max-lg:w-full row-[2/3] col-[2/2]" id="title">
				<h1 class="hidden lg:flex text-6xl flex-col">
					<span>Аромат&nbsp;на</span>
					<span>каждый&nbsp;день</span>
				</h1>
				<button
					class="max-lg:w-full lg:px-4 py-2 transition-all border-0 hover:border-4 border-black text-primary hover:text-black text-[6vw] lg:text-4xl font-bold rounded-full"
					type="button"
				>
					<span>выбрать</span>
				</button>
			</div>
		</aside>
		<!-- применение тега style вместо tailwindcss в данном случае исключение из-за изначально заданного значения z-index библиотекой -->
		<Swiper
			class="h-full w-full row-[1/-1] col-[1/-1]"
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
				class="h-full w-full"
				v-for="slide in slides"
				:key="slide"
				:style="{
					background:
						'url(' + slide + ')' + ' ' + 'cover' + ' ' + 'bottom left 41%',
				}"
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
