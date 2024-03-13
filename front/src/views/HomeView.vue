<template>
	<div class="flex flex-col gap-16">
		<h1 class="w-1/2 text-2xl text-white sm:text-5xl lg:text-6xl xl:text-7xl">Besoin de financement pour votre petite entreprise ?</h1>
		<div class="flex flex-row items-center gap-10">
			<router-link :to="{name: 'iris'}" title="Elligibilité" class="h-16 basis-6 rounded-md bg-matisse-600 p-4 text-center text-lg text-white transition-transform duration-300 hover:scale-110 hover:bg-matisse-800">Démarrez</router-link>
			<p class="hidden w-4/12 text-lg leading-8 text-white sm:block md:w-1/2">La façon la plus facile de savoir si vous êtes élligible.</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { AxiosResponse, isAxiosError } from 'axios'
	import { useToast } from 'primevue/usetoast'
	import { onMounted } from 'vue'
	import { useRoute } from 'vue-router'

	import { useAuth } from '@/store/auth'

	const toast = useToast()
	const route = useRoute()
	const auth = useAuth()

	onMounted(async() => {
		if (route.redirectedFrom?.params.token){
			try {
				await auth.verify(route.redirectedFrom?.params.token as string)
				toast.add({ severity: 'info', life: 3000, detail: 'Merci d\'avoir confirmé. Vous êtes connecté !' })
			} catch (e) {
				if (isAxiosError(e)) {
					const { data } = e.response as AxiosResponse
					if (data.includes('token')) {
						toast.add({ severity: 'error', life: 3000, detail: 'Le lien a expiré ou invalide.' })
					}
				}
			}
		}
	})

</script>