<template>
	<div class="mx-auto flex w-1/2 flex-col gap-16 rounded-lg bg-white/20 p-10">
		<h1 class="text-2xl font-bold text-white">Etes-vous élligible ?</h1>
		<div class="flex flex-col gap-4">
			<div class="grid grid-cols-2 gap-8">
				<div class="grid grid-rows-2 gap-0">
					<label for="sepalLength" class="text-white">Longueur Sepal</label>
					<InputNumber
						id="sepalLength"
						v-model="irisData.sepalLength"
						inputId="sepalLength"
						suffix=" cm"
						showButtons
						buttonLayout="vertical"
						:step="0.1"
						:pt="{
							input:{
								root: {
									class: 'input-number'
								}
							},
							decrementButton: {
								root: {
									class: 'bt-minus'
								}
							},
							incrementButton: {
								root: {
									class: 'bt-plus'
								}
							}
						}">
						<template #incrementbuttonicon>
							<span class="pi pi-plus" />
						</template>
						<template #decrementbuttonicon>
							<span class="pi pi-minus" />
						</template>
					</InputNumber>
				</div>
				<div class="grid grid-rows-2">
					<label for="sepalWidth" class=" text-white">Largeur Sepal</label>
					<InputNumber
						id="sepalWidth"
						v-model="irisData.sepalWidth"
						inputId="sepalWidth"
						suffix=" cm"
						showButtons
						buttonLayout="vertical"
						:step="0.1"
						:pt="{
							input:{
								root: {
									class: 'input-number'
								}
							},
							decrementButton: {
								root: {
									class: 'bt-minus'
								}
							},
							incrementButton: {
								root: {
									class: 'bt-plus'
								}
							}
						}">
						<template #incrementbuttonicon>
							<span class="pi pi-plus" />
						</template>
						<template #decrementbuttonicon>
							<span class="pi pi-minus" />
						</template>
					</InputNumber>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-8">
				<div class="grid grid-rows-2">
					<label for="petalLength" class=" text-white">Longueur Pétale</label>
					<InputNumber
						id="petalLength"
						v-model="irisData.petalLength"
						inputId="petalLength"
						suffix=" cm"
						showButtons
						buttonLayout="vertical"
						:step="0.1"
						:pt="{
							input:{
								root: {
									class: 'input-number'
								}
							},
							decrementButton: {
								root: {
									class: 'bt-minus'
								}
							},
							incrementButton: {
								root: {
									class: 'bt-plus'
								}
							}
						}">
						<template #incrementbuttonicon>
							<span class="pi pi-plus" />
						</template>
						<template #decrementbuttonicon>
							<span class="pi pi-minus" />
						</template>
					</InputNumber>
				</div>
				<div class="grid grid-rows-2">
					<label for="petalWidth" class=" text-white">Largeur Pétale</label>
					<InputNumber
						id="petalWidth"
						v-model="irisData.petalWidth"
						inputId="petalWidth"
						suffix=" cm"
						showButtons
						buttonLayout="vertical"
						:step="0.1"
						:pt="{
							input:{
								root: {
									class: 'input-number'
								}
							},
							decrementButton: {
								root: {
									class: 'bt-minus'
								}
							},
							incrementButton: {
								root: {
									class: 'bt-plus'
								}
							}
						}">
						<template #incrementbuttonicon>
							<span class="pi pi-plus" />
						</template>
						<template #decrementbuttonicon>
							<span class="pi pi-minus" />
						</template>
					</InputNumber>
				</div>
			</div>
		</div>
		<button class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700" @click="predict">Envoyer</button>
	</div>
</template>

<script setup lang="ts">
	import axios from 'axios'
	import InputNumber from 'primevue/inputnumber'
	import { useToast } from 'primevue/usetoast'
	import { reactive, toValue } from 'vue'

	import { API_VERSION } from '@/constants'

	const toast = useToast()

	const irisData = reactive({
		sepalLength: 0,
		sepalWidth : 0,
		petalLength: 0,
		petalWidth : 0,
	})


	async function predict() {
		const dataSend = {
			iris: [
				{ ...toValue(irisData) },
			],
		}

		try {
			const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/${API_VERSION}/iris/predict`, dataSend)

			toast.add({ severity: 'info', summary: 'Prédiction', detail: data.result[0], life: 3000 })
		} catch (e: any) {
			toast.add({ severity: 'error', summary: 'Erreur', detail: 'Vous devez vous connecter', life: 3000 })
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