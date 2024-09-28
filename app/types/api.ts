import type { AxiosError } from "axios";

export interface Message {
	message: string;
}

export interface APIError extends AxiosError {}
