<template>
	<Dialog
		v-model:visible="uiStore.registerVisible"
		modal
		:pt="{
			root: 'border-none w-full',
			mask: {
				style: 'backdrop-filter: blur(8px)'
			}
		}">
		<template #container="{ closeCallback }">
			<div class="flex items-center justify-center">
				<div class="w-full max-w-lg rounded-lg bg-white p-6">
					<div class="mb-8 flex items-center justify-between pb-3">
						<h3 class="text-xl font-medium text-gray-900">Inscription</h3>
						<a
							title="Close"
							class="pi pi-times cursor-pointer transition-all hover:rotate-180"
							@click="closeCallback">
						</a>
					</div>

					<section id="identifiants" class="grid auto-cols-auto grid-flow-col gap-3">
						<div>
							<label>Email</label>
							<InputText
								v-model="user.email"
								class="input-text"
								:class="{'input-invalid': v$.email.$dirty && v$.email.$invalid}"
								autofocus />
							<ErrorText v-if="v$.email.$dirty && (v$.email.required.$invalid || v$.email.email.$invalid)" :error-info="{errorText: v$.email?.$errors[0]?.$message}" />
						</div>

						<div class="mb-4">
							<label for="password">Mot de passe</label>
							<Password
								v-model="user.password"
								toggleMask
								:class="{'input-invalid': v$.password.$dirty && v$.password.$invalid}"
								:pt="{
									root: {
										class: 'inline-flex relative w-full'
									},
									input: {
										root: {
											class: pwdCss
										}
									}
								}"/>
							<ErrorText v-if="v$.password.$dirty && (v$.password.required.$invalid)" :error-info="{errorText: v$.password?.$errors[0]?.$message}" />
						</div>
					</section>

					<div class="my-3 border-b-2"></div>

					<section id="perso" class="grid auto-cols-auto grid-flow-col gap-3">
						<div>
							<label>Prénom</label>
							<InputText  v-model="user.firstname" class="input-text" />
							<ErrorText v-if="v$.firstname.$dirty && (v$.firstname.minLength.$invalid)" :error-info="{errorText: v$.firstname?.$errors[0]?.$message}" />
						</div>

						<div>
							<label>Nom</label>
							<InputText  v-model="user.lastname" class="input-text"/>
							<ErrorText v-if="v$.lastname.$dirty && (v$.lastname.minLength.$invalid)" :error-info="{errorText: v$.lastname?.$errors[0]?.$message}" />
						</div>
					</section>

					<div class="my-4 mt-6 flex items-center">
						<input
							id="remember-me"
							type="checkbox"
							class="mr-2 h-4 w-4 text-matisse-600 focus:ring-matisse-500/0"
							checked>
						<label for="remember-me" class="!mb-0">Se souvenir de moi</label>
					</div>

					<button class="w-full rounded-lg bg-matisse-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-matisse-700 focus:outline-none focus:ring-4 focus:ring-matisse-300" @click="submit">M'inscrire</button>
				</div>
			</div>
		</template>
	</Dialog>
</template>

<script lang="ts" setup>
	import useVuelidate from '@vuelidate/core'
	import { required, minLength, helpers, email } from '@vuelidate/validators'
	import { omitBy, isEmpty } from 'lodash'
	import Dialog from 'primevue/dialog'
	import InputText from 'primevue/inputtext'
	import Password from 'primevue/password'
	import { computed, reactive } from 'vue'

	import ErrorText from '@/components/ErrorText.vue'
	import { User, useAuth } from '@/store/auth'
	import { useUI } from '@/store/ui'

	const uiStore = useUI()
	const auth = useAuth()

	const user: User = reactive({
		email    : 'a@a.fr',
		password : '321654sdfg',
		firstname: '',
		lastname : '',
	})

	const rules = {
		email: {
			//isUnique: helpers.withMessage('Cette licence existe déjà', helpers.withAsync(checkLicence)),
			required: helpers.withMessage('L\'email est obligatoire', required),
			email   : helpers.withMessage('L\'email n\'est pas valide', email),
		},
		password : { required: helpers.withMessage('Le mot de passe est obligatoire', required) },
		firstname: {
			minLength: helpers.withMessage('Le prénom doit avoir au minimum 3 caractères', minLength(3)),
		},
		lastname: {
			minLength: helpers.withMessage('Le prénom doit avoir au minimum 3 caractères', minLength(3)),
		},
	}

	const v$ = useVuelidate<User>(rules, user)

	const pwdCss = computed(() => {
		return (v$.value.password.$dirty && v$.value.password.$invalid) ? 'input-text input-invalid' : 'input-text'
	})

	async function submit() {
		if (await v$.value.$validate()) {
			const dataSend = omitBy(user, isEmpty)
			const { success, data } = await auth.register(dataSend)
			//uiStore.loginVisible = false
		}
	}
</script>
<style scoped lang="scss">
:deep(.input-text){
	@apply border rounded-lg border-gray-300 p-2 focus:outline-0 focus:outline-none focus:ring-0 w-full
}
:deep(.input-invalid) {
	@apply border-red-500
}
label{
	@apply mb-1 block text-sm font-medium text-gray-700
}
</style>