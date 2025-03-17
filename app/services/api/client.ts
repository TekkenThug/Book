import createClient from "openapi-fetch";
import type { paths } from "./v1";

export type Paths = paths;

const client = createClient<paths>({ baseUrl: "http://localhost:8000/api/v1" });

export default client;
