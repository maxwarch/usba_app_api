<template>
	<div>
		<label v-if="label" :for="uniq" :class="classLabel">{{label}}</label>
		<AutoComplete
			v-model.trim="modelValue"
			class="w-full"
			:option-label="optionLabel"
			:pt="{
				input: {
					id:uniq,
					class: [
						(hasError) ? errorInputClass : '',
						classInputText
					]
				}
			}"
			:suggestions="items"
			@complete="search">
			<template #option="slotProps">
				<div class="flex gap-2" data-row-autocomplete>
					<span v-for="col in props.renderItemsCol" :key="col">{{ slotProps.option[col] }}</span>
				</div>
			</template>
		</AutoComplete>
		<RegErrorText v-if="hasError" :errorInfo="errorInfo"></RegErrorText>
	</div>
</template>

<script setup lang="ts">
	import uniqueId from 'lodash/uniqueId'
	import AutoComplete, { AutoCompleteCompleteEvent } from 'primevue/autocomplete'
	import { computed, ref } from 'vue'

	import IErrorProps from '@/components/inputs/IErrorProps'
	import { IModel } from '@/models/IModel'

	const modelValue = defineModel<string | number>()

	defineOptions({
		inheritAttrs: false,
	})

	interface Props extends IErrorProps {
		model         : IModel,
		label?        : string | boolean,
		optionLabel?  : string,
		renderItemsCol: string[],
		searchOn      : string[],
		labelClass?   : string,
		inputClass?   : string,
	}

	const props = withDefaults(defineProps<Props>(), {
		label          : false,
		errorInputClass: 'reg-input--error-input',
	})

	const uniq = uniqueId('regautocompleteid-')
	const items = ref<any[]>([])

	async function search(e: AutoCompleteCompleteEvent) {
		const res = [...await props.model.search(e.query, props.searchOn)]
		items.value = res
	}

	const classInputText = computed(() => {
		return (props.inputClass) ? `${props.inputClass} reg-input--text` : 'reg-input--text'
	})

	const classLabel = computed(() => {
		return (props.labelClass) ? `${props.labelClass} reg-input--label` : 'reg-input--label'
	})
</script>