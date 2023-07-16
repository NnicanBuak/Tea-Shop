<script setup>
	const props = defineProps({
		articleContentPath: { type: String, required: true },
	})

	// article composition
	// > body
	// -> children (parsed content)
	// --> %ID%
	// ---> children
	// ---> props
	// ---> tag
	// ->	toc
	// --> links (headline)
	// ---> %ID%
	// ----> id
	// ----> text
	// > title
	// > description
	// > ...
	const article = ref(null)
	const articleLinks = ref([])
	const currentArticleLink = ref(null)
	const currentArticleLinkNumber = ref(1)
	const articleCurrentTransition = ref(null)

	const fetchArticle = async () => {
		article.value = await queryContent(props.articleContentPath).findOne()
		console.log(article.value)
		articleLinks.value = Array.from(article.value.body.toc.links)
		currentArticleLink.value = articleLinks.value[0]
	}

	const handleArticleNavigation = (isPrevious) => {
		// check is predict transition in admissible range
		const index = articleLinks.value.indexOf(currentArticleLink.value)
		const isWithinRange = isPrevious
			? index - 1 >= 0
			: index + 1 < articleLinks.value.length

		if (isWithinRange) {
			// set needed transition
			articleCurrentTransition.value = isPrevious
				? 'long-fade-in-left-in-right-out-out'
				: 'long-fade-in-right-out-left-in-out'
			// change index
			const nextIndex = isPrevious ? index - 1 : index + 1
			currentArticleLinkNumber.value = nextIndex + 1
			// set article header
			currentArticleLink.value = articleLinks.value[nextIndex]

			// if previous article content bigger than current by index
			if (true) {
				this.$emit('isArticleTransitioning', true)
				setTimeout(() => {
					this.$emit('isArticleTransitioning', false)
				}, 1000)
			}

			// scroll to article header
			nextTick(() => {
				const articleHeader = document.getElementById('articleHeader')
				articleHeader.scrollIntoView({ behavior: 'smooth' })
			})
		}
	}

	onUpdated(() => {
		if (articleLinks.value.length > 0 && !currentArticleLink.value) {
			currentArticleLink.value = articleLinks.value[0]
		}
	})

	fetchArticle()
</script>

<template>
	<div class="wrapper">
		<div class="wrapper relative">
			<TransitionGroup :name="articleCurrentTransition">
				<div
					class="wrapper w-full"
					v-show="currentArticleLink.id === link.id"
					v-for="link in articleLinks"
					:key="link.id"
				>
					<div class="wrapper">
						<h1 class="text-secondary" id="articleHeader">
							{{ link.text }}
						</h1>
						<hr />
						<p>
							{{
								article.body.children[
									Number(
										getKeyByValue(
											article.body.children,
											findInObject(article.body.children, 'props', {
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
		<hr />
		<div class="wrapper relative flex justify-between items-center">
			<h4 class="p-2 font-sans" id="pagination">
				{{ currentArticleLinkNumber + '/' + articleLinks.length }}
			</h4>
			<nav>
				<button
					type="button"
					class="p-2"
					@click="handleArticleNavigation(true)"
				>
					<Icon
						class="active:bg-secondary active:text-primary rounded-full"
						name="material-symbols:arrow-circle-left-outline-rounded"
						size="2rem"
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
						size="2rem"
					/>
				</button>
			</nav>
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
