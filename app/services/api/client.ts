import createClient, { type Middleware } from "openapi-fetch";
import { useLocalStorage } from "@vueuse/core";
import type { paths } from "./v1";

export type Paths = paths;

const accessToken = useLocalStorage<string | null>("token", null);

const authMiddleware: Middleware = {
	async onRequest({ request }) {
		if (accessToken.value) {
			request.headers.set("Authorization", `Bearer ${accessToken.value}`);
		}

		return request;
	},
};

const client = createClient<paths>({ baseUrl: "http://localhost:8000/" });
client.use(authMiddleware);

export default client;
