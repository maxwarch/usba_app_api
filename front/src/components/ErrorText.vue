<template>
	<p v-if="!isArray(errorComputed.errorText)" data-testid="errortext" :class="[errorComputed.errorTextClass]">{{ errorComputed.errorText }}</p>
	<p
		v-for="text in errorComputed.errorText"
		v-else
		:key="text"
		:class="[errorComputed.errorTextClass]"
		data-testid="errortext">{{ text }}</p>
</template>

<script setup lang="ts">
	import isArray from 'lodash/isArray'
	import { computed } from 'vue'

	import { ErrorInfoInput } from '@/types'

	interface Props {
		errorInfo?: ErrorInfoInput
	}

	const props = defineProps<Props>()

	const errorComputed = computed(() => {
		return Object.assign({
			errorText     : 'Erreur',
			errorTextClass: 'text-red-500 text-xs italic absolute',
		}, props.errorInfo)
	})
</script>