import client from "./client";

export default {
	async recordToEvent(event_id: number) {
		return await client.POST("/api/v1/records", { body: { event_id }});
	},

	async get(query?: { event_id?: number }) {
		return await client.GET("/api/v1/records", { params: { query } });
	},

	async unsubscribe(event_id: number) {
		return await client.DELETE("/api/v1/records/{id}", { params: { path: { id: event_id } } });
	},
};
