import axios from "axios";
import { useLocalStorage } from "@vueuse/core";

const config = useRuntimeConfig();
const token = useLocalStorage<string | null>("token", null);

const API = axios.create({
	baseURL: config.public.baseURL,
	headers: {
		Authorization: `Bearer ${token.value}`,
	},
});

export default API;
