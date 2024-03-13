import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { useAuth } from '@/store/auth'
import { useUI } from '@/store/ui'
import HomeView from '@/views/HomeView.vue'

const AboutView  = () => import('@/views/AboutView.vue')
const PredictIrisView  = () => import('@/views/PredictIrisView.vue')
const PredictUsbaView  = () => import('@/views/PredictUsbaView.vue')

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
		path     : '/usba',
		name     : 'usba',
		component: PredictUsbaView,
		meta     : {
			background  : '/bg-predict.jpg',
			requiresAuth: true,
		},
	},
	{
		path     : '/iris',
		name     : 'iris',
		component: PredictIrisView,
		meta     : {
			background  : '/bg-predict.jpg',
			requiresAuth: true,
		},
	},
	{
		path    : '/verify/:token',
		name    : 'verify',
		redirect: '/',
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	const auth = useAuth()
	const uiStore = useUI()

	if (to.meta.requiresAuth) {
		if (auth.isLogin) {
			next()
		} else {
			uiStore.loginVisible = true
			uiStore.toRoute = to
		}
	} else {
		next()
	}
  })

export default router
