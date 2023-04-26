<template>
	<footer class="container xl:container-xl py-10 space-y-12 bg-gray-100">
		<nav class="grid grid-cols-3">
			<div class="wrapper text-left">
				<h1 class="pb-1 font-serif text-gray-400 text-xl">Сайт</h1>
				<ul class="text-md space-y-3">
					<li><NuxtLink to="/shop">Магазин</NuxtLink></li>
					<li><NuxtLink to="/other/sales">Скидки</NuxtLink></li>
					<li><NuxtLink to="/other/about">О нас</NuxtLink></li>
					<li><NuxtLink to="/other/contacts">Контакты</NuxtLink></li>
				</ul>
			</div>
			<div class="wrapper text-center">
				<h1 class="pb-1 font-serif text-gray-400 text-xl">Клиентам</h1>
				<ul class="text-md space-y-3">
					<li><NuxtLink to="/support/delivery">Доставка</NuxtLink></li>
					<li><NuxtLink to="/support/payment">Оплата</NuxtLink></li>
					<li><NuxtLink to="/support/b2b">B2B</NuxtLink></li>
				</ul>
			</div>
			<div class="wrapper text-right">
				<h1 class="pb-1 font-serif text-gray-400 text-xl">Помощь</h1>
				<ul class="text-md space-y-3">
					<li><NuxtLink to="/support">Связь с нами</NuxtLink></li>
					<li><NuxtLink to="/support/faq">Частые вопросы</NuxtLink></li>
					<li><NuxtLink to="/support/offer">Оферта</NuxtLink></li>
				</ul>
			</div>
		</nav>
		<div
			class="container flex flex-col gap-y-3 justify-center items-center"
			id="socials"
		>
			<span class="font-serif text-3xl">подписывайтесь!</span>
			<div class="wrapper space-x-4 text-primary2">
				<!-- <a href="https://instagram.com/chaisotsvetie">
					<Icon name="uil:instagram-alt" size="42px"></Icon>
				</a> -->
				<a href="https://t.me/chaisotsvetie">
					<Icon name="uil:telegram" size="42px"></Icon>
				</a>
				<a href="https://vk.com/chaisotsvetie">
					<Icon name="uil:vk" size="42px"></Icon>
				</a>
			</div>
		</div>
		<div class="wrapper">
			<nuxt-picture
				src="/img/logo-10.svg"
				alt=""
				@click="navigateTo('/shop')"
			></nuxt-picture>
		</div>
		<h4 class="font-bold text-center">
			<a href="">&copy; 2023 Raccoon IT Group</a>
		</h4>
	</footer>
</template>
