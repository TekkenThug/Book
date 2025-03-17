import type { Paths } from "./client";
import client from "./client";

export type Book = Paths["/api/v1/books"]["get"]["responses"]["200"]["content"]["application/json"][0];

export default {
	async get(params: { title?: string } = {}) {
		return await client.GET("/api/v1/books", { params: { query: { title: params.title } } });
	},
};
