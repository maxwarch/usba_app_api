<template>
	<button :class="classes" :disabled="loading" @click="emit('click')">
		<i v-if="icon && !loading" :class="icon" data-testid="icon"></i>
		<i v-if="loading" class="loading" data-testid="loading"></i>
		<span :class="{'opacity-0': loading}">
			<slot></slot>
		</span>
	</button>
</template>
<script setup lang="ts">
	import { twMerge } from 'tailwind-merge'
	import { computed, useAttrs, useSlots } from 'vue'

	const emit = defineEmits<{
		(event: 'click'): void
	}>()

	interface Props {
		icon?   : string
		loading?: boolean
	}

	defineProps<Props>()

	const attrs = useAttrs()
	const slots = useSlots()

	const classes = computed(() => {
		let baseClass = 'bt primary flex flex-row items-center justify-center'
		baseClass = (slots.default == undefined) ? baseClass : `${baseClass} gap-2`

		return twMerge(
			attrs.class as string,
			baseClass,
		)
	})

</script>
<style lang="scss" scoped>
.loading{
	@apply absolute h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]
}
</style>