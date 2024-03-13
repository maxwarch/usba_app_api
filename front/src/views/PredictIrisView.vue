<template>
	<div class="mx-auto flex w-10/12 flex-col gap-8 rounded-lg bg-white/20 p-10 lg:w-2/3">
		<h1 class="text-2xl font-bold text-white">Etes-vous élligible ?</h1>

		<div class="grid grid-cols-2 gap-x-6 gap-y-0">
			<RegInputNumber
				v-model.trim="irisData.sepalLength"
				input-class="rounded-l-lg"
				label-class="text-white text-lg"
				label="Longueur Sepal"
				suffix=" cm"
				:hasError="v$.sepalLength.$dirty && v$.sepalLength.required.$invalid"
				:errorInfo="{errorText: 'Longueur Sepal est obligatoire'}"
			/>

			<RegInputNumber
				v-model.trim="irisData.sepalWidth"
				input-class="rounded-l-lg"
				label-class="text-white text-lg"
				label="Largeur Sepal"
				suffix=" cm"
				:hasError="v$.sepalWidth.$dirty && v$.sepalWidth.required.$invalid"
				:errorInfo="{errorText: 'Largeur Sepal est obligatoire'}"
			/>

			<RegInputNumber
				v-model.trim="irisData.petalLength"
				input-class="rounded-l-lg"
				label-class="text-white text-lg"
				label="Longueur Pétale"
				suffix=" cm"
				:hasError="v$.petalLength.$dirty && v$.petalLength.required.$invalid"
				:errorInfo="{errorText: 'Longueur est obligatoire'}"
			/>

			<RegInputNumber
				v-model.trim="irisData.petalWidth"
				input-class="rounded-l-lg"
				label-class="text-white text-lg"
				label="Largeur Pétale"
				suffix=" cm"
				:hasError="v$.petalWidth.$dirty && v$.petalWidth.required.$invalid"
				:errorInfo="{errorText: 'Largeur Pétale est obligatoire'}"
			/>
		</div>

		<button class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700" @click="predict">Envoyer</button>
	</div>
</template>

<script setup lang="ts">
	import useVuelidate from '@vuelidate/core'
	import { required } from '@vuelidate/validators'
	import { isAxiosError } from 'axios'
	import { useToast } from 'primevue/usetoast'
	import { reactive, toValue } from 'vue'

	import { API_VERSION } from '@/constants'
	import { useAuth } from '@/store/auth'
	import { api } from '@/store/interceptor'
	import { useUI } from '@/store/ui'

	const toast = useToast()
	const auth = useAuth()
	const uiStore = useUI()

	const irisData = reactive({
		sepalLength: 0,
		sepalWidth : 0,
		petalLength: 0,
		petalWidth : 0,
	})

	const rules = {
		sepalLength: { required },
		sepalWidth : { required },
		petalLength: { required },
		petalWidth : { required },
	}

	const v$ = useVuelidate(rules, irisData)

	async function predict() {
		if (await v$.value.$validate()) {
			const dataSend = {
				iris: [
					{ ...toValue(irisData) },
				],
			}

			try {
				const { data } = await api.post(`/${API_VERSION}/predictions/iris`, dataSend)

				toast.add({ severity: 'info', summary: 'Prédiction', detail: data.result[0], life: 3000 })
			} catch (e) {
				if (isAxiosError(e) && e.response?.status == 403) {
					auth.logout()
					uiStore.loginVisible = true
				}
			}
		}
	}
</script>

<style scoped lang="scss">
:deep(.input-number){
	@apply border rounded-l-md border-gray-300 p-2 focus:outline-0 focus:outline-none focus:ring-0 w-full
}
:deep(.bt-plus){
	@apply w-10 bg-matisse-700 border-r-2 border-matisse-600 text-white hover:bg-matisse-800
}

:deep(.bt-minus){
	@apply w-10 bg-matisse-700 rounded-r-md text-white hover:bg-matisse-800
}
</style>