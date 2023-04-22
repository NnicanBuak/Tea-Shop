<script setup>
	const articleLinks = ref([])
	const articleLinksLength = ref(null)
	const currentArticleLink = ref(null)

	let { data: article } = useAsyncData('article', async () => {
		const data = await queryContent('/other/about').findOne()
		return { data }
	})

	onMounted(() => {
		articleLinks.value = Array.from(article.value.data.body.toc.links)
		articleLinksLength.value = articleLinks.value.length
		currentArticleLink.value = articleLinks.value[0]
	})

	const currentArticleLinkNumber = ref(1)
	const articleTransition = ref(null)
	const isArticleTransitioning = ref(false)

	const handleArticleNavigation = (isPrevious) => {
		const currentIndex = articleLinks.value.indexOf(currentArticleLink.value)

		articleTransition.value = isPrevious
			? 'long-fade-in-left-in-right-out-out'
			: 'long-fade-in-right-out-left-in-out'

		onUpdated(() => {
			isArticleTransitioning.value = true
			setTimeout(() => {
				isArticleTransitioning.value = false
			}, 1000)
		})

		const isWithinRange = isPrevious
			? currentIndex - 1 >= 0
			: currentIndex + 1 < articleLinks.value.length
		if (isWithinRange) {
			const nextIndex = isPrevious ? currentIndex - 1 : currentIndex + 1
			currentArticleLinkNumber.value = nextIndex + 1
			currentArticleLink.value = articleLinks.value[nextIndex]
		}
	}
</script>

<template>
	<div
		class="wrapper transition-max-height ease-out duration-1000"
		:class="{
			'max-h-60': !isArticleOpen,
			'max-h-[60rem]': isArticleOpen,
			'max-h-[61rem]': isArticleTransitioning,
			'max-h-[62rem]': !isArticleTransitioning,
		}"
	>
		<div class="wrapper relative">
			<TransitionGroup :name="articleTransition">
				<div
					class="wrapper w-full"
					v-show="currentArticleLink.id === link.id"
					v-for="link in articleLinks"
					:key="link.id"
				>
					<div class="wrapper">
						<h1 class="text-secondary">
							<a :href="'#' + link.id">
								{{ link.text }}
							</a>
						</h1>
						<hr />
						<p>
							{{
								article.data.body.children[
									Number(
										getKeyByValue(
											article.data.body.children,
											findInObject(article.data.body.children, 'props', {
												id: link.id,
											}),
										),
									) + 1
								].children[0].value
							}}
						</p>
					</div>
				</div>
			</TransitionGroup>
		</div>
		<hr class="h-[4px]" />
		<div class="wrapper relative flex flex-row-reverse">
			<nav>
				<button
					type="button"
					class="p-2"
					@click="handleArticleNavigation((isPrevious = true))"
				>
					<Icon
						class="active:bg-secondary active:text-primary rounded-full"
						name="material-symbols:arrow-circle-left-outline-rounded"
						size="10vw"
					/>
				</button>
				<button
					type="button"
					class="p-2"
					@click="handleArticleNavigation((isPrevious = false))"
				>
					<Icon
						class="active:bg-secondary active:text-primary rounded-full"
						name="material-symbols:arrow-circle-right-outline-rounded"
						size="10vw"
					/>
				</button>
			</nav>
			<h4 class="absolute left-2 bottom-4 font-sans" id="pagination">
				{{ currentArticleLinkNumber + '/' + articleLinksLength }}
			</h4>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ArticleSlider',
		methods: {
			findInObject(object, key, value) {
				if (
					object.hasOwnProperty(key) &&
					JSON.stringify(object[key]) === JSON.stringify(value)
				) {
					return object // Возвращаем исходный объект, если найдена пара ключ-значение
				}
				for (let prop in object) {
					if (object.hasOwnProperty(prop) && typeof object[prop] === 'object') {
						let result = this.findInObject(object[prop], key, value) // Рекурсивно вызываем функцию для поиска пары ключ-значение в дочернем объекте
						if (result) {
							return result // Возвращаем дочерний объект, если найдена пара ключ-значение
						}
					}
				}
			},
			getKeyByValue(object, value) {
				for (let key in object) {
					if (object.hasOwnProperty(key) && object[key] === value) {
						return key
					}
				}
				return null // Если значение не найдено, вернем null
			},
		},
	}
</script>
