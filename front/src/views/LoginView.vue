<template>
	<Dialog
		v-model:visible="uiStore.loginVisible"
		modal
		:pt="{
			root: 'border-none w-full',
			mask: {
				style: 'backdrop-filter: blur(8px)'
			}
		}">
		<template #container="{ closeCallback }">
			<div v-if="!toggleForgotPassword" class="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 sm:p-0">
				<div class="m-2 w-full max-w-sm rounded-lg bg-white p-6">
					<div class="mb-8 flex items-center justify-between pb-3">
						<h3 class="text-xl font-medium text-gray-900">Login</h3>
						<a
							title="Close"
							class="pi pi-times hover:scale-120 cursor-pointer transition-all hover:rotate-180"
							@click="closeCallback">
						</a>
					</div>

					<div>
						<div class="mb-4">
							<label for="email" class="mb-1 block text-sm font-medium text-gray-700">Email</label>
							<InputText  v-model="user.username" class="input-text" autofocus></InputText>
						</div>

						<div class="mb-4">
							<label for="password" class="mb-1 block text-sm font-medium text-gray-700">Mot de passe</label>
							<InputText  v-model="user.password" class="input-text"></InputText>
						</div>

						<div class="mb-4 flex items-center">
							<input
								id="remember-me"
								type="checkbox"
								class="h-4 w-4 text-matisse-600 focus:ring-matisse-500/50"
								checked>
							<label for="remember-me" class="ml-2 text-sm text-gray-700">Se souvenir de moi</label>
						</div>

						<button class="w-full rounded-lg bg-matisse-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-matisse-700 focus:outline-none focus:ring-4 focus:ring-matisse-300" @click="submit">Login</button>

						<a href="#" class="mt-4 block text-center text-sm text-gray-500 hover:underline" @click="toggleForgotPassword = true">
							Mot de passe oublié ?
						</a>
					</div>
				</div>
			</div>
			<div v-else class="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 sm:p-0">
				<div class="m-2 w-full max-w-sm rounded-lg bg-white p-6">
					<div class="mb-4">
						<label for="email" class="mb-1 block text-sm font-medium text-gray-700">Email</label>
						<InputText v-model="user.email" class="input-text" autofocus></InputText>
					</div>
					<button class="w-full rounded-lg bg-matisse-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-matisse-700 focus:outline-none focus:ring-4 focus:ring-matisse-300" @click="submitForgotPassword">Envoyer</button>

					<a href="#" class="relative mt-4 block text-sm text-gray-500 no-underline" @click="toggleForgotPassword = false">
						<div class="mx-auto flex items-center">
							<i class="pi pi-arrow-left mr-6"></i>
							<p>Revenir</p>
						</div>
					</a>
				</div>
			</div>
		</template>
	</Dialog>
</template>

<script lang="ts" setup>
	import Dialog from 'primevue/dialog'
	import InputText from 'primevue/inputtext'
	import { reactive, ref } from 'vue'

	import { UserLogin, useAuth } from '@/store/auth'
	import { useUI } from '@/store/ui'

	const uiStore = useUI()
	const auth = useAuth()
	const toggleForgotPassword = ref<boolean>(false)

	const user: UserLogin = reactive({
		username: '',
		password: '',
	})

	async function submit() {
		await auth.login(user)
		uiStore.loginVisible = false
	}

	function submitForgotPassword() {

	}
</script>
<style scoped lang="scss">
:deep(.input-text){
	@apply border rounded-l-md border-gray-300 p-2 focus:outline-0 focus:outline-none focus:ring-0 w-full
}
</style>