import type { Paths } from "./client";
import client from "./client";

export type UserMetadata =
Paths["/api/v1/users/me"]["get"]["responses"]["200"]["content"]["application/json"];

export type Settings =
Paths["/api/v1/users/settings"]["get"]["responses"]["200"]["content"]["application/json"];

export default {
	async getMe() {
		return await client.GET("/api/v1/users/me");
	},

	async getSettings() {
		return client.GET("/api/v1/users/settings");
	},

	async updateSettings(body: Record<string, string>) {
		return await client.PATCH("/api/v1/users/settings", { body });
	},

	async uploadAvatar(formData: FormData) {
		return client.PATCH("/api/v1/users/avatar", {
			body: { avatar: "" },
			bodySerializer: () => {
				return formData;
			},
		});
	},
};
