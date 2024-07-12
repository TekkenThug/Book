export default defineNuxtConfig({
	devtools: { enabled: true },

	ssr: false,

	modules: [
		"@primevue/nuxt-module",
		"@pinia/nuxt",
		"@nuxt/eslint",
		"@vee-validate/nuxt",
	],

	app: {
		head: {
			title: "Book",
			link: [
				{ rel: "preconnect", href: "https://fonts.googleapis.com" },
				{ rel: "preconnect", href: "https://fonts.gstatic.com" },
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
				},
				{ rel: "manifest", href: "/site.webmanifest" },
			],
		},
	},

	runtimeConfig: {
		public: {
			baseURL: process.env.NODE_ENV === "production"
				? "https://localhost:8001/api/v1"
				: "http://localhost:8001/api/v1",
		},
	},

	css: [
		"normalize.css",
		"reset-css",
		"primeicons/primeicons.css",
		"~/assets/styles/global.css",
	],

	primevue: {
		importTheme: {
			from: "@/themes/theme.ts",
		},
		options: {
			unstyled: false,
			ripple: true,
			inputVariant: "filled",
		},
	},

	eslint: {
		config: {
			stylistic: {
				indent: "tab",
				semi: true,
				quotes: "double",
			},
		},
	},
});
