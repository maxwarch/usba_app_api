import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { useAuth } from '@/store/auth'
import { useUI } from '@/store/ui'
import AboutView from '@/views/AboutView.vue'
import HomeView from '@/views/HomeView.vue'
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
		meta     : {
			background  : '/bg-predict.jpg',
			requiresAuth: true,
		},
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
