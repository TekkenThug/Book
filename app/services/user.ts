import API from "~/services/instance";
import type { APIError, Message } from "~/types/api";

export type UserMetadata = {
	id: number;
	first_name: string;
	last_name: string;
	avatar: string | null;
};

export type Settings = {
	first_name: string;
	last_name: string;
	email: string;
};

type Token = {
	token: string;
	expires: number;
};

type RegisterCredentials = {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	repeat_password: string;
};

type NewPasswordCredentials = {
	password: string;
	repeat_password: string;
	token: string;
};

export default {
	async getMe() {
		return (await API.get<UserMetadata>("/users/me")).data;
	},

	async getSettings() {
		return (await API.get<Settings>("/users/settings")).data;
	},

	async updateSettings(payload: Record<string, string>) {
		return (await API.patch<Message>("/users/settings", payload)).data;
	},

	async uploadAvatar(formData: FormData) {
		return (await API.patch<Message>("/users/avatar", formData)).data;
	},

	auth: {
		async login(payload: { email: string; password: string }) {
			try {
				return (await API.post<Token>("/auth/login", payload)).data;
			}
			catch (error) {
				throw (error as APIError).response?.data;
			}
		},

		async register(payload: RegisterCredentials) {
			try {
				return (await API.post<Message>("/auth/register", payload)).data;
			}
			catch (error) {
				throw (error as APIError).response?.data;
			}
		},

		async verifyEmail(token: string) {
			try {
				return (await API.post<Message>("/auth/verify-email", { token })).data;
			}
			catch (error) {
				throw (error as APIError).response?.data;
			}
		},

		async resetPassword(email: string) {
			try {
				return (await API.post<Message>("/auth/reset-password", { email })).data;
			}
			catch (error) {
				throw (error as APIError).response?.data;
			}
		},

		async approveResetPassword(payload: NewPasswordCredentials) {
			try {
				return (await API.patch<Message>("/auth/reset-password", payload)).data;
			}
			catch (error) {
				throw (error as APIError).response?.data;
			}
		},

		async refreshTokens() {
			return (await API.post<Token>("/auth/refresh")).data;
		},

		async logout() {
			return (await API.post("/auth/logout")).data;
		},
	},
};
