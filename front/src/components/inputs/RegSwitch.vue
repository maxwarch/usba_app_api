<template>
	<div role="checkbox">
		<div class="reg-switch" :class="inputClass">
			<span
				v-if="labelLeft"
				:class="labelClass"
				class="cursor-pointer"
				:aria-label="labelLeft"
				@click="switchState(valueLeft)">{{ labelLeft }}</span>
			<div
				class="h-8 w-14 cursor-pointer rounded-full p-1 transition-colors"
				:class="switchBgComputed"
				data-testid="bt"
				@click="switchState()">
				<div class="h-6 w-6 rounded-full bg-white transition-all" :class="{'translate-x-6': value == valueRight}"></div>
			</div>
			<span
				v-if="labelRight"
				:class="labelClass"
				class="cursor-pointer"
				:aria-label="labelRight"
				@click="switchState(valueRight)">{{ labelRight }}</span>
		</div>
		<RegErrorText v-if="hasError" :errorInfo="errorInfo" class="mt-2"></RegErrorText>
	</div>
</template>

<script setup lang="ts">
	import { computed, ref } from 'vue'

	import IErrorProps from '@/components/inputs/IErrorProps'

	interface Props extends IErrorProps {
		modelValue?: string | boolean,
		labelLeft? : string,
		valueLeft? : string | boolean,
		colorLeft? : string,
		labelRight?: string,
		valueRight?: string | boolean,
		colorRight?: string,
		inputClass?: string,
		labelClass?: string,
	}

	const emit = defineEmits(['update:modelValue'])
	const props = withDefaults(defineProps<Props>(), {
		valueLeft : false,
		valueRight: true,
	})

	const switchBgComputed = computed(() => {
		if (props.colorLeft && value.value == props.valueLeft) return props.colorLeft
		if (props.colorRight && value.value == props.valueRight) return props.colorRight

		return 'reg-switch--bg-color'
	})

	const value = ref<string | boolean>(props.modelValue || props.valueLeft)

	function switchState(val: any = null) {
		if (!val) {
			value.value = (value.value == props.valueLeft) ? props.valueRight : props.valueLeft
		} else {
			value.value = val
		}

		emit('update:modelValue', value.value)
	}
</script>
