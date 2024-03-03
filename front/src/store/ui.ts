import { defineStore } from 'pinia'
import { ToastMessageOptions } from 'primevue/toast'


export const useUI = defineStore('ui', {
	state: () => ({
		sidebarExpanded: false,
		toastParam     : <ToastMessageOptions | undefined> undefined,
		loading        : false,
		loginVisible   : false,
	}),
	getters: {

	},
	actions: {
		toggleSidebar() {
			this.sidebarExpanded = !this.sidebarExpanded
		},
	},
  })