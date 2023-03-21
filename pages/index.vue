<script setup>
	definePageMeta({
		layout: "main",
		hasHeader: false,
		hasFooter: true,
		hasNewsletterBlock: true,
	});
</script>

<template>
	<section
		class="container-fluid mb-40 h-screen grid overflow-hidden"
		id="hero"
	>
		<div
			class="-z-10 absolute top-[-100%] left-[-100%] h-6 w-6 bg-primary rounded-full pointer-events-none"
			ref="cursor"
		></div>
		<aside
			class="h-screen container-xl flex gap-4 flex-col justify-around items-center lg:grid grid-cols-2 grid-rows-4 gap-x-22 xl:gap-x-40 max-lg:py-32 p-12 lg:p-16 xl:p-20 row-[1/-1] col-[1/-1]"
		>
			<nav class="hidden flex flex-col lg:row-[1/1] lg:col-[2/2]">
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
			<nuxt-img
				class="hidden lg:block h-full w-fit self-center lg:row-[1/-1] lg:col-[1/1]"
				id="logo"
				src="/img/logo-16 1.png"
				alt=""
			/>
			<div class="flex flex-col justify-center items-center gap-4" id="title">
				<nuxt-img
					class="block lg:hidden w-[75vw]"
					id="logo2"
					src="/img/logo2.png"
					alt=""
				/>
				<h3 class="block lg:hidden w-full text-[4vw] text-center">
					<span class="text-white mix-blend-difference">
						Порой&nbsp;просто&nbsp;хочется&nbsp;начать&nbsp;день&nbsp;с&nbsp;чашечки
					</span>
					<div class="py-6">
						<span
							class="px-6 py-3 font-bold text-md text-secondary2 bg-primary2 rounded-full"
							>{{ randomProduct.nameHero }}</span
						>
					</div>
				</h3>
			</div>
			<div
				class="max-lg:w-full lg:h-full lg:row-[2/-1] lg:col-[2/2]"
				id="alt-title"
			>
				<h1
					class="hidden lg:flex flex-col font-bold text-[5vw] text-primary leading-none"
				>
					<span>Аромат&nbsp;на</span>
					<span>каждый&nbsp;день</span>
				</h1>
				<button
					class="lg:absolute max-lg:w-full hover:px-4 focus-visible:px-4 py-2 transition border-0 hover:border-[4px] focus-visible:border-[4px] border-black text-black text-[6vw] lg:text-4xl font-bold hover:uppercase focus-visible:uppercase tracking-[-0.15vw] rounded-full focus-visible:bg-primary"
					type="button"
					data-pointer-type="highlight"
				>
					<span class="hidden lg:inline">выбрать</span>
					<span class="inline lg:hidden">хочу</span>
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
				v-for="(image, index) in sliderImages"
				:key="index"
				:style="{
					backgroundImage: 'url(' + '~' + image + ')',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'left 59% bottom',
					backgroundSize: 'cover',
				}"
			>
			</SwiperSlide>
		</Swiper>
	</section>
</template>

<script>
	export default {
		name: "Main",
		async asyncData() {
			const images = await this.$glob(
				"~/public/img/slider/*.{jpg,jpeg,png,gif}"
			);
			const sliderImages = images.map((image) => image.default);
			return { sliderImages };
		},
		data() {
			return {
				randomProduct:
					this.$products[Math.floor(Math.random() * this.$products.length)],
			};
		},

		mounted() {
			if (this.isCursorAviable) {
				this.useCustomCursor();
			}
		},
		methods: {
			useCustomCursor() {
				const cursor = this.$refs.cursor;
				if (cursor) {
					const offsetX = cursor.offsetWidth / 2;
					const offsetY = cursor.offsetHeight / 2;

					const setCursorPos = (e) => {
						requestAnimationFrame(() => {
							const x = e.clientX - offsetX;
							const y = e.clientY + window.scrollY - offsetY;
							const maxY = document.body.clientHeight - cursor.offsetHeight;

							cursor.style.left = `${x}px`;
							cursor.style.top = `${Math.min(y, maxY)}px`;
						});
					};

					window.addEventListener("mousemove", setCursorPos);
				}
			},
		},
	};
</script>
