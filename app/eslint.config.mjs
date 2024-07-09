import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
	{
		rules: {
			"vue/no-multiple-template-root": "off",
			"vue/max-attributes-per-line": ["error", {
				singleline: {
					max: 2,
				},
				multiline: {
					max: 1,
				},
			}],
			"vue/max-len": ["error", {
				code: 110,
				template: 120,
			}],
		},
	},
);
