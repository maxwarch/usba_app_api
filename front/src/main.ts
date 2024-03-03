import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Tailwind from 'primevue/passthrough/tailwind'
import ToastService from 'primevue/toastservice'
import { createApp } from 'vue'

import '@/style/style.scss'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

createApp(App)
	.use(store)
	.use(router)
	.use(ToastService)
	.use(PrimeVue, { unstyled: true, pt: Tailwind })
	.use(createPinia())
	.mount('#app')