<template>
	<footer class="p-6 px-12 bg-gray-100">
		<nav class="container grid grid-cols-3">
			<div class="wrapper text-left">
				<h1 class="pb-1 font-serif text-gray-400 text-lg">Карта сайта</h1>
				<ul class="text-sm space-y-3">
					<li><NuxtLink to="">Магазин</NuxtLink></li>
					<li><NuxtLink to="">Скидки</NuxtLink></li>
					<li><NuxtLink to="">О нас</NuxtLink></li>
					<li><NuxtLink to="">Контакты</NuxtLink></li>
				</ul>
			</div>
			<div class="wrapper text-center">
				<h1 class="pb-1 font-serif text-gray-400 text-lg">Клиентам</h1>
				<ul class="text-sm space-y-3">
					<li><NuxtLink to="">Доставка</NuxtLink></li>
					<li><NuxtLink to="">Оплата</NuxtLink></li>
					<li><NuxtLink to="">B2B</NuxtLink></li>
				</ul>
			</div>
			<div class="wrapper text-right">
				<h1 class="pb-1 font-serif text-gray-400 text-lg">Помощь</h1>
				<ul class="text-sm space-y-3">
					<li><NuxtLink to="">Связаться с нами</NuxtLink></li>
					<li><NuxtLink to="">Частые вопросы</NuxtLink></li>
					<li><NuxtLink to="">Оферта</NuxtLink></li>
				</ul>
			</div>
		</nav>
		<div class="wrapper" id="socials"></div>
	</footer>
</template>
