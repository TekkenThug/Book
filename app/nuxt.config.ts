export default defineNuxtConfig({

	modules: [
		"@primevue/nuxt-module",
		"@pinia/nuxt",
		"@nuxt/eslint",
		"@vee-validate/nuxt",
	],

	ssr: false,
	devtools: { enabled: true },

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

	css: [
		"normalize.css",
		"reset-css",
		"primeicons/primeicons.css",
		"~/assets/styles/global.css",
	],

	runtimeConfig: {
		public: {
			baseURL: process.env.NODE_ENV === "production"
				? "https://localhost:8000/api/v1"
				: "http://localhost:8000/api/v1",
		},
	},

	typescript: {
		typeCheck: true,
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
});
