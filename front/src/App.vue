<template>
	<div class="fixed h-screen w-full bg-cover bg-center bg-no-repeat backdrop-brightness-50" :class="background" :style="{ backgroundImage: 'url(' + background + ')' }"></div>
	<NavBar></NavBar>
	<div class="relative top-24 mx-auto flex w-4/5 sm:w-3/5">
		<div class="size-full">
			<router-view></router-view>
		</div>
	</div>
	<LoginView />
	<SignupView />
	<VerifyView />
	<Toast
		:pt="{
			root: {
				class:'z-50'
			}}"
		@life-end="closeToast()"></Toast>
</template>

<script setup lang="ts">
	import Toast from 'primevue/toast'
	import { onMounted, ref, watch } from 'vue'
	import { useRoute } from 'vue-router'

	import NavBar from '@/components/Navbar.vue'
	import { useAuth } from '@/store/auth'
	import { useUI } from '@/store/ui'
	import LoginView from '@/views/LoginView.vue'
	import SignupView from '@/views/SignupView.vue'
	import VerifyView from '@/views/VerifyView.vue'

	const route = useRoute()
	const background = ref('/background-money.jpg')

	const uiStore = useUI()
	const auth = useAuth()

	// console.log(import.meta.env)

	function closeToast() {
		uiStore.toastParam = undefined
	}

	watch(
		() => route.meta.background,
		bg => background.value = String(bg),
	)

	onMounted(() => {
		auth.restoreToken()
	})
</script>

<style scoped lang="scss">

</style>
