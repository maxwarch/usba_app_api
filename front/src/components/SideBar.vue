<template>
	<aside :class="{expanded: uiStore.sidebarExpanded}">
		<div class="bt nav-bt" :class="{'sm:justify-center': uiStore.sidebarExpanded}">
			<p class="pr-5">Manche 1</p>
			<i class="pi pi-check"></i>
		</div>
	</aside>
	<Transition name="fade">
		<div v-if="uiStore.sidebarExpanded" class="overlay" @click="uiStore.toggleSidebar()"></div>
	</Transition>
</template>

<script lang="ts" setup>
	import { useUI } from '@/store/ui'
	const uiStore = useUI()
</script>

<style lang="scss" scoped>
aside{
	@apply flex fixed z-20 h-screen w-[var(--sidebar-width)] md:min-w-[var(--sidebar-width)] -translate-x-[var(--sm-sidebar-width)] left-0 top-16 md:translate-x-0 transition-all ease-in-out duration-300 bg-gradient-to-b from-70% from-fountain-blue-100 to-fountain-blue-200 shadow-md;
	&.expanded {
		@apply z-20 shadow-lg transition-all ease-in-out duration-300 translate-x-0;
	}

	.nav-bt {
		@apply flex h-12 w-full items-center justify-end p-3 hover:bg-matisse-500 hover:text-white text-matisse-700 md:justify-center;
		&.active {
			@apply bg-matisse-500 text-white
		}
	}
}
.overlay {
	@apply h-screen w-screen z-10 bg-matisse-300 opacity-10 fixed;
}
.fade-enter-active, .fade-leave-active {
	@apply transition-opacity ease-in-out
}
.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>