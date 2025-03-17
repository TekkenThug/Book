import type { Paths } from "./client";
import client from "./client";

export type ChatLog =
Paths["/api/v1/rooms/{id}"]["get"]["responses"]["200"]["content"]["application/json"]["chat_log"];

export type Participant =
Paths["/api/v1/rooms/{id}/participants"]["get"]["responses"]["200"]["content"]["application/json"][0];

export default {
	async get(id: number) {
		return await client.GET("/api/v1/rooms/{id}", { params: { path: { id } } });
	},

	async getParticipants(id: number) {
		return await client.GET("/api/v1/rooms/{id}/participants", { params: { path: { id } } });
	},
};
