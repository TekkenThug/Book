import type { Paths } from "./client";
import client from "./client";

export type MeetingEvent =
Paths["/api/v1/events/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

export type MeetingEventWithBook =
Paths["/api/v1/events"]["get"]["responses"]["200"]["content"]["application/json"][0];

export type CheckedMeetingEvent =
Paths["/api/v1/events/with-checked"]["get"]["responses"]["200"]["content"]["application/json"][0];

export type UserMeetingEvent =
Paths["/api/v1/events/my"]["get"]["responses"]["200"]["content"]["application/json"][0];

type QueryParams = Paths["/api/v1/events"]["get"]["parameters"]["query"];

export default {
	async create(body: Paths["/api/v1/events"]["post"]["requestBody"]["content"]["application/json"]) {
		return await client.POST("/api/v1/events", { body });
	},

	async getById(id: number) {
		return await client.GET("/api/v1/events/{id}", { params: { path: { id } } });
	},

	async getUsersEvent() {
		return await client.GET("/api/v1/events/my");
	},

	async get(query: QueryParams) {
		return await client.GET("/api/v1/events", { params: { query } });
	},

	async getWithChecked(query: QueryParams) {
		return await client.GET("/api/v1/events/with-checked", { params: { query } });
	},
};
