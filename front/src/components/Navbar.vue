<template>
	<nav class="relative top-5 z-30 mx-auto flex w-4/5 select-none items-stretch text-white">
		<div class="flex-no-shrink flex grow items-stretch">
			<div class="flex items-center gap-3 text-lg sm:pl-6">
				<router-link to="/" title="Accueil" class="mr-2 sm:mr-12">
					<img src="/logo.svg" class="h-16" alt="">
				</router-link>
				<div class="container-bts flex items-center gap-14">
					<router-link :to="{name: 'elligibilite'}" title="Elligibilité" class="hover-underline-animation">
						Elligibilité
					</router-link>
					<router-link :to="{name: 'about'}" title="A propos" class="hover-underline-animation">
						A propos
					</router-link>
				</div>
			</div>
		</div>
		<div class="ml-auto flex justify-end">
			<a class="pi pi-users primary__bg-transparent cursor-pointer pt-4 text-3xl transition-transform hover:scale-110" @click="uiStore.loginVisible = true"></a>
		</div>
	</nav>
</template>

<script lang="ts" setup>
	import { useUI } from '@/store/ui'
	const uiStore = useUI()
</script>

<style lang="scss" scoped>
nav {
	.container-bts{
			a.router-link-active{
				@apply underline-offset-1;

				&::after {
					@apply  bg-white content-[''] absolute w-full scale-x-100 h-[2px] -bottom-1 left-0 origin-left;
				}
			}
		}
	}
</style>