module.exports = {
	content: [
		'./public/**/*.html',
		'./index.html',
		'./src/**/*.{js,jsx,ts,tsx,vue}',
		'./node_modules/primevue/*/*.{vue,js,ts,jsx,tsx}',
	],
	darkMode: 'class', // or 'media' or 'class'
	theme   : {
		extend: {
			colors: {
				primary  : '#254183',
				secondary: '#7a350d',
				neutral  : '#345487',

				'matisse': {
					'50' : '#f0f8ff',
					'100': '#e1f0fd',
					'200': '#bbe1fc',
					'300': '#80c9f9',
					'400': '#3caef4',
					'500': '#1394e4',
					'600': '#0675c3',
					'700': '#0766ad',
					'800': '#0a4f82',
					'900': '#0e426c',
					'950': '#092a48',
				},

				'fountain-blue': {
					'50' : '#effcfc',
					'100': '#d7f6f6',
					'200': '#b4eded',
					'300': '#80dfe0',
					'400': '#44c9cc',
					'500': '#29adb2',
					'600': '#258b95',
					'700': '#24707a',
					'800': '#255d65',
					'900': '#234e56',
					'950': '#12333a',
				},

				'gossip': {
					'50' : '#f4fbea',
					'100': '#e7f5d2',
					'200': '#c5e898',
					'300': '#b0de78',
					'400': '#92cd4e',
					'500': '#73b230',
					'600': '#578e22',
					'700': '#446d1e',
					'800': '#39571d',
					'900': '#314a1d',
					'950': '#17280b',
				},

				'regate-primary': {
					'50' : '#f0f7fe',
					'100': '#ddebfc',
					'200': '#c3ddfa',
					'300': '#9ac8f6',
					'400': '#68aaf0',
					'500': '#478bea',
					'600': '#326ede',
					'700': '#295acc',
					'800': '#274aa6',
					'900': '#254183',
					'950': '#1b2950',
				},
				'regate-secondary': {
					'50' : '#fffbeb',
					'100': '#fff4c6',
					'200': '#ffe788',
					'300': '#ffd64a',
					'400': '#ffc220',
					'500': '#f9a007',
					'600': '#dd7802',
					'700': '#b75406',
					'800': '#94400c',
					'900': '#7a350d',
					'950': '#461a02',

				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/typography'),
	],
}
