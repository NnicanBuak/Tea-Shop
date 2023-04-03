<template>
	<div
		class="z-20 absolute inset-[-100%] h-6 w-6 rounded-full pointer-events-none"
		id="cursor"
		ref="cursor"
	></div>
	<DesktopHeader v-if="hasHeader && isAppDesktop"></DesktopHeader>
	<MobileHeader v-if="hasHeader && isAppMobile" :isAppAtTop="isAppAtTop" />
	<main class="overflow-auto">
		<slot @click="toggleMobileHeader" />
		<section v-if="hasNewsletterBlock">Подпишись на рассылку</section>
	</main>
	<footer v-if="hasFooter">FooterFooterFooterFooterFooter</footer>
</template>

<script>
	export default { 
		defer: true,
		data() {
			const { hasNewsletterBlock, hasFooter, hasHeader } = this.$route.meta

			return {
				hasNewsletterBlock,
				hasFooter,
				hasHeader,
			}
		},
		mounted() {
			if ('onmousemove' in window) {
				this.useCustomCursor(this.$refs.cursor)
			}
		},
		methods: {
			useCustomCursor(cursor) {
				const offsetX = cursor.offsetWidth / 2
				const offsetY = cursor.offsetHeight / 2
				window.addEventListener('mousemove', (e) => {
					let target = e.target
					while (target && !target.closest('[data-pointer-type="highlight"]')) {
						target = target.parentElement
					}
					if (target) {
						cursor.classList.remove('z-20')
						cursor.classList.add('-z-10')

						const rect = target.getBoundingClientRect()
						const x = rect.left + rect.width / 2 - offsetX
						const y = rect.top + rect.height / 2 + window.scrollY - offsetY
						cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
					} else {
						cursor.classList.remove('-z-10')
						cursor.classList.add('z-20')

						const x = e.clientX - offsetX
						const y = e.clientY + window.scrollY - offsetY
						cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
					}
				})

				cursor.classList.remove('inset-[-100%]')
			},
		},
	}
</script>
