import { defineStore } from 'pinia'
import { ToastMessageOptions } from 'primevue/toast'
import { RouteLocationNormalized } from 'vue-router'


export const useUI = defineStore('ui', {
	state: () => ({
		toastParam     : <ToastMessageOptions | undefined> undefined,
		loading        : false,
		loginVisible   : false,
		registerVisible: false,
		verifyVisible  : false,
		toRoute        : <RouteLocationNormalized | undefined> undefined,
	}),
	getters: {

	},
	actions: {
	},
  })