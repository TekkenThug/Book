import axios from "axios";
import { useLocalStorage } from "@vueuse/core";

// const config = useRuntimeConfig();
const token = useLocalStorage<string | null>("token", null);

const API = axios.create({
	baseURL: "http://localhost:8000/api/v1",
	withCredentials: true,
	headers: {
		Authorization: `Bearer ${token.value}`,
	},
});

export default API;

export const isAPIError = (error: unknown) => axios.isAxiosError(error);
