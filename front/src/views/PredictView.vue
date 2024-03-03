<template>
	<div class="mx-auto flex w-1/2 flex-col gap-16 rounded-lg bg-white/20 p-10">
		<h1 class="text-2xl font-bold text-white">Etes-vous élligible ?</h1>
		<div class="flex flex-col gap-4">
			<div class="grid grid-cols-2 gap-8">
				<div class="grid grid-rows-2 gap-0">
					<label for="sepalLength" class="text-white">Longueur Sepal</label>
					<InputNumber
						id="sepalLength"
						v-model="sepalLength"
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
						v-model="sepalWidth"
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
						v-model="petalLength"
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
						v-model="petalWidth"
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
	import InputNumber from 'primevue/inputnumber'
	import { ref } from 'vue'

	const sepalLength = ref<number>(1)
	const sepalWidth = ref<number>(1)
	const petalLength = ref<number>(1)
	const petalWidth = ref<number>(1)

	function predict() {

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