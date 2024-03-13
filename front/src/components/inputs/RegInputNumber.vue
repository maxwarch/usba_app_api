<template>
	<div>
		<div class="flex flex-col gap-2">
			<label
				v-if="label"
				:for="uniq"
				:class="classLabel">{{label}}</label>
			<InputNumber
				v-model="modelValue"
				:inputId="uniq"
				:suffix="suffix"
				showButtons
				buttonLayout="vertical"
				:min="min"
				:max="max"
				:step="step"
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

		<RegErrorText v-if="hasError" :errorInfo="errorInfo"></RegErrorText>
	</div>
</template>
<script setup lang="ts">
	import uniqueId from 'lodash/uniqueId'
	import InputNumber from 'primevue/inputnumber'
	import { computed } from 'vue'

	import IErrorProps from '@/components/inputs/IErrorProps'

	interface Props extends IErrorProps {
		label?     : string | boolean,
		labelClass?: string,
		min?:number
		max?:number
		step?:number
		suffix?:string
	}

	const modelValue = defineModel<number | null>()

	const props = withDefaults(defineProps<Props>(), {
		label          : false,
		errorInputClass: 'reg-input--error-input',
		min            : 0,
		max            : 100,
		step           : 1,
		suffix         : '',
	})

	const uniq = uniqueId('reginputtextid-')

	const classLabel = computed(() => {
		return (props.labelClass) ? `${props.labelClass} reg-input--label` : 'reg-input--label'
	})
</script>

<style lang="scss" scoped>
:deep(.input-number){
	@apply border rounded-l-md border-gray-300 p-2 focus:outline-0 focus:outline-none focus:ring-0 w-full
}

:deep(.bt-plus){
	@apply w-10 bg-matisse-700 border-r-2 border-matisse-600 text-white hover:bg-matisse-800
}

:deep(.bt-minus){
	@apply w-10 bg-matisse-700 rounded-r-md text-white hover:bg-matisse-800
}

.reg-input--error-text{
	@apply bg-red-200/30 border-2 border-red-300
}
</style>