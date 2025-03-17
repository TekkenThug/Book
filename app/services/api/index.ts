export { default as authService } from "./auth";
export { default as bookService } from "./book";
export { default as eventService } from "./event";
export { default as recordService } from "./record";
export { default as roomService } from "./room";
export { default as userService } from "./user";

type APIError = { message: string; error?: string; statusCode: number };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAPIError = (error: any): error is APIError => "message" in error;
