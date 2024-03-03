import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import AboutView from '@/views/AboutView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import PredictView from '@/views/PredictView.vue'

const routes: RouteRecordRaw[] = [
	{
		path     : '/',
		name     : 'home',
		component: HomeView,
		meta     : { background: '/bg-money.jpg' },
	},
	{
		path     : '/a-popos',
		name     : 'about',
		component: AboutView,
		meta     : { background: '/bg-about.jpg' },
	},
	{
		path     : '/elligibilite',
		name     : 'elligibilite',
		component: PredictView,
		meta     : { background: '/bg-predict.jpg' },
	},
	{
		path     : '/login',
		name     : 'login',
		component: LoginView,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
