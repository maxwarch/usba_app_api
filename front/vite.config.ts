/// <reference types="vitest" />

import { resolve } from 'path'

import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import dynamicImport from 'vite-plugin-dynamic-import'
const env = { ...process.env }
import { ViteDevServer } from "vite";
import history from "connect-history-api-fallback";
import { Request, Response } from "express-serve-static-core";

function redirectAll() {
	return {
		name: "rewrite-all",
		configureServer(server: ViteDevServer) {
			return () => {
				const handler = history({
					disableDotRule: true,
					rewrites: [{ from: /\/$/, to: () => "/index.html" }]
				});

				server.middlewares.use((req, res, next) => {
					handler(req as Request, res as Response, next)
				});
			};
		}
	}
};

export default defineConfig({
	define: {
		'process.env': env,
	},
	plugins: [
		redirectAll(),
		dynamicImport(),
		vue(),
		Components({
			dirs: [
				'src/components',
				'src/views',
				//'node_modules/primevue',
			],
			dts: './dts/components.d.ts',
		}),
		// visualizer({
		// 	template  : 'treemap', // or sunburst
		// 	open      : true,
		// 	gzipSize  : true,
		// 	brotliSize: true,
		// 	filename  : 'analyse.html', // will be saved in project's root
		// }) as PluginOption,
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
	build: {
		minify: 'terser',
		rollupOptions: {
			treeshake: 'recommended',
		},
	},
	server: {
		port: 3001,
	},
	test: {
		include: ['./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		environment: 'jsdom',
		globals: true,
		setupFiles: './tests/setup.ts',
		coverage: {
			provider: 'istanbul',
		},
	},
})
