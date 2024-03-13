<template>
	<nav class="relative top-5 z-30 mx-auto flex w-4/5 select-none items-stretch text-white">
		<div class="flex-no-shrink flex grow items-stretch">
			<div class="flex items-center gap-3 text-lg sm:pl-6">
				<router-link to="/" title="Accueil" class="mr-2 sm:mr-12">
					<img src="/logo.svg" class="h-16" alt="">
				</router-link>
				<div class="container-bts flex items-center gap-14">
					<router-link :to="{name: 'iris'}" title="Prédiction des iris" class="hover-underline-animation">
						Iris
					</router-link>
					<router-link :to="{name: 'usba'}" title="Prédiction de prêt" class="hover-underline-animation">
						Elligibilité
					</router-link>
					<router-link :to="{name: 'about'}" title="A propos" class="hover-underline-animation">
						A propos
					</router-link>
				</div>
			</div>
		</div>

		<div v-if="auth.isLogin" class="ml-auto flex justify-end">
			<Avatar
				icon="pi pi-user"
				class="cursor-pointer border-none bg-transparent"
				size="large"
				shape="circle"
				@click="toggle" />
			<Menu
				ref="menu"
				:model="items"
				:popup="true" />
		</div>
		<div v-else class="ml-auto flex items-center justify-end gap-8">
			<a class="cursor-pointer hover:text-gray-200" @click="uiStore.loginVisible = true">Login</a>
			<a class="cursor-pointer rounded-full bg-matisse-800 p-2 px-4 hover:bg-matisse-700" @click="uiStore.registerVisible = true">Inscription</a>
		</div>
	</nav>
</template>

<script lang="ts" setup>
	import Avatar from 'primevue/avatar'
	import Menu from 'primevue/menu'
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'

	import { useAuth } from '@/store/auth'
	import { useUI } from '@/store/ui'

	const router = useRouter()
	const uiStore = useUI()
	const auth = useAuth()

	const menu = ref()
	const items = ref([
		{
			label: 'Profil',
		},
		{
			label  : 'Logout',
			command: () => {
				auth.logout()
				if (router.currentRoute.value.meta.requiresAuth)
					router.push('/')
			},
		},
	])

	const toggle = (event: MouseEvent) => {
		menu.value.toggle(event)
	}
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