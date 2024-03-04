import { defineStore } from 'pinia'
import { ToastMessageOptions } from 'primevue/toast'


export const useUI = defineStore('ui', {
	state: () => ({
		toastParam     : <ToastMessageOptions | undefined> undefined,
		loading        : false,
		loginVisible   : false,
		registerVisible: false,
	}),
	getters: {

	},
	actions: {
	},
  })