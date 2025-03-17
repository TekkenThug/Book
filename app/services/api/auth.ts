import type { Paths } from "./client";
import client from "./client";

type Login = Paths["/api/v1/auth/login"]["post"]["requestBody"]["content"]["application/json"];
type Register = Paths["/api/v1/auth/register"]["post"]["requestBody"]["content"]["application/json"];

type NewPassword =
Paths["/api/v1/auth/reset-password"]["patch"]["requestBody"]["content"]["application/json"];

export default {
	async login(body: Login) {
		return await client.POST("/api/v1/auth/login", { body });
	},

	async register(body: Register) {
		return await client.POST("/api/v1/auth/register", { body });
	},

	async verifyEmail(token: string) {
		return await client.POST("/api/v1/auth/verify-email", { body: { token } });
	},

	async resetPassword(email: string) {
		return await client.POST("/api/v1/auth/reset-password", { body: { email } });
	},

	async approveResetPassword(body: NewPassword) {
		return await client.PATCH("/api/v1/auth/reset-password", { body });
	},

	async refreshTokens() {
		return await client.POST("/api/v1/auth/refresh");
	},

	async logout() {
		return await client.POST("/api/v1/auth/logout");
	},
};
