<template>
	<div class="relative grid grid-rows-2">
		<label
			v-if="label"
			:for="uniq"
			:class="classLabel">{{label}}</label>
		<span class="inline-flex w-full">
			<input
				:id="uniq"
				v-model="modelValue"
				type="number"
				:role="attrs.role as string || ''"
				:placeholder="attrs.placeholder as string || ''"
				:class="[(props.hasError) ? errorInputClass : '', classInputText]" />

			<slot name="icons"></slot>
		</span>

		<RegErrorText v-if="hasError" :errorInfo="errorInfo"></RegErrorText>
	</div>
</template>
<script setup lang="ts">
	import uniqueId from 'lodash/uniqueId'
	import { computed, useAttrs } from 'vue'

	import IErrorProps from '@/components/inputs/IErrorProps'

	interface Props extends IErrorProps {
		label?     : string | boolean,
		inputClass?: string,
		labelClass?: string,
		icon?      : string
	}

	// defineOptions({
	// 	inheritAttrs: false,
	// })

	const modelValue = defineModel<string | number>()

	const props = withDefaults(defineProps<Props>(), {
		label          : false,
		errorInputClass: 'reg-input--error-input',
	})

	const attrs = useAttrs()
	const uniq = uniqueId('reginputtextid-')

	const classInputText = computed(() => {
		return (props.inputClass) ? `${props.inputClass} reg-input--text` : 'reg-input--text'
	})
	const classLabel = computed(() => {
		return (props.labelClass) ? `${props.labelClass} reg-input--label` : 'reg-input--label'
	})
</script>