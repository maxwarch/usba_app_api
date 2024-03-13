<template>
	<div class="reg-input relative">
		<label
			v-if="label"
			:for="uniq"
			:class="classLabel">{{label}}
			<div class="relative">
				<input
					:id="uniq"
					v-model="modelValue"
					:role="attrs.role as string || ''"
					:type="attrs.type as string || 'text'"
					:placeholder="attrs.placeholder as string || ''"
					:class="[(props.hasError) ? errorInputClass : '', classInputText]" />
				<div class="pointer-events-none absolute inset-y-0 right-3 flex items-center ps-3 opacity-40">
					<i v-if="icon" :class="icon" />
				</div>
			</div>
		</label>

		<div v-else class="relative">
			<input
				v-model="modelValue"
				:role="attrs.role as string || ''"
				:type="attrs.type as string || 'text'"
				:placeholder="attrs.placeholder as string || ''"
				:class="[(props.hasError) ? errorInputClass : '', classInputText]" />
			<div class="pointer-events-none absolute inset-y-0 right-3 flex items-center ps-3 opacity-40">
				<i v-if="icon" :class="icon" />
			</div>
		</div>

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