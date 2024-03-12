<template>
	<Dialog
		v-model:visible="uiStore.verifyVisible"
		modal
		:pt="{
			root: 'border-none w-full',
			mask: {
				style: 'backdrop-filter: blur(8px)'
			}
		}">
		<template #container="{ closeCallback }">
			<div class="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 sm:p-0">
				<div class="m-2 w-full max-w-sm rounded-lg bg-white p-6">
					<div class="mb-8 flex items-center justify-between pb-3">
						<h3 class="text-xl font-medium text-gray-900">Lien de confirmation</h3>
						<a
							title="Close"
							class="pi pi-times hover:scale-120 cursor-pointer transition-all hover:rotate-180"
							@click="closeCallback">
						</a>
					</div>

					<div>
						<div class="mb-4">
							<label for="email" class="mb-1 block text-sm font-medium text-gray-700">Votre email</label>
							<InputText  v-model="user.email" class="input-text" autofocus></InputText>
						</div>

						<button class="w-full rounded-lg bg-matisse-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-matisse-700 focus:outline-none focus:ring-4 focus:ring-matisse-300" @click="submit">Envoi</button>

						<p v-if="error" class="mt-4 text-center text-red-700">{{ error }}</p>
					</div>
				</div>
			</div>
		</template>
	</Dialog>
</template>

<script lang="ts" setup>
	import Dialog from 'primevue/dialog'
	import InputText from 'primevue/inputtext'
	import { useToast } from 'primevue/usetoast'
	import { reactive, ref } from 'vue'

	import { useAuth } from '@/store/auth'
	import { useUI } from '@/store/ui'

	const uiStore = useUI()
	const auth = useAuth()
	const toast = useToast()

	const user = reactive({
		email: 'testsimplon@yopmail.com',
	})

	const error = ref<string>('')

	async function submit() {
		try {
			await auth.sendVerify(user.email)
			toast.add({ severity: 'info', life: 3000, detail: 'Le lien viens de vous être envoyé.' })
		} catch (e) {
			toast.add({ severity: 'error', life: 3000, detail: 'Un problème est survenu. Veuillez essayer plus tard.' })
		}

		uiStore.verifyVisible = false
	}
</script>

<style scoped lang="scss">
:deep(.input-text){
	@apply border rounded-lg border-gray-300 p-2 focus:outline-0 focus:outline-none focus:ring-0 w-full
}
</style>