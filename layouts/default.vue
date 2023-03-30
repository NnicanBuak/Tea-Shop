<template>
	<div
		class="-z-10 absolute inset-[-100%] h-6 w-6 rounded-full"
		id="cursor"
		ref="cursor"
	></div>
	<DesktopHeader v-if="hasDesktopHeader"></DesktopHeader>
	<MobileHeader v-if="hasMobileHeader" :isAppAtTop="true"></MobileHeader>
	<main>
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
			return { hasNewsletterBlock, hasFooter, hasHeader }
		},
		mounted() {
			if ('onmousemove' in window) {
				this.useCustomCursor(this.$refs.cursor)
			}
		},
		computed: {
			hasDesktopHeader() {
				return false
				// return this.hasHeader && this.windowWidth > 1024
			},
			hasMobileHeader() {
				return true
				// return this.hasHeader && this.windowWidth <= 1024
			},
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
						const rect = target.getBoundingClientRect()
						const x = rect.left + rect.width / 2 - offsetX
						const y = rect.top + rect.height / 2 + window.scrollY - offsetY
						cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
					} else {
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
