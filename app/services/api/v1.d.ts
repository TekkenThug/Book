/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
	"/api/v1/rooms/{id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/** Get room by event id */
		get: operations["RoomsController_getById"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/rooms/{id}/participants": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/** Get participants */
		get: operations["RoomsController_getParticipants"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/users/settings": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/** Get data for settings */
		get: operations["UsersController_getSettings"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		/** Update settings */
		patch: operations["UsersController_updateSettings"];
		trace?: never;
	};
	"/api/v1/users/avatar": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		/** Update avatar */
		patch: operations["UsersController_updateAvatar"];
		trace?: never;
	};
	"/api/v1/users/me": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/** Get user`s metadata */
		get: operations["UsersController_getUserInfo"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/books": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/** Get books */
		get: operations["BooksController_findAll"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/events": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/** Get events */
		get: operations["EventsController_findAll"];
		put?: never;
		/** Create event */
		post: operations["EventsController_create"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/events/with-checked": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/** Get events with checked property for authorized users */
		get: operations["EventsController_findChecked"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/events/my": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/** Get user`s events */
		get: operations["EventsController_findMy"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/events/{id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/** Get event by id */
		get: operations["EventsController_findById"];
		put?: never;
		post?: never;
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/records": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		/** Get records */
		get: operations["RecordsController_get"];
		put?: never;
		/** Create record to event */
		post: operations["RecordsController_create"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/records/{id}": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		post?: never;
		/** Delete record */
		delete: operations["RecordsController_delete"];
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/auth/login": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		/** Login as user */
		post: operations["AuthController_signIn"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/auth/register": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		/** Register as user */
		post: operations["AuthController_register"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/auth/logout": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		/** Logout from app */
		post: operations["AuthController_logout"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/auth/refresh": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		/** Refresh JWT tokens */
		post: operations["AuthController_refresh"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/auth/verify-email": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		/** Verify email */
		post: operations["AuthController_verifyEmail"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
	"/api/v1/auth/reset-password": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		/** Send mail with token for reset password */
		post: operations["AuthController_resetPassword"];
		delete?: never;
		options?: never;
		head?: never;
		/** Reset password by token */
		patch: operations["AuthController_approveResetPassword"];
		trace?: never;
	};
}
export type webhooks = Record<string, never>;
export interface components {
	schemas: {
		ChatDto: {
			id: number;
			text: string;
			fullname: string;
			datetime: string;
		};
		RoomDto: {
			/** @example 1 */
			event_id: number;
			/** @example [
             *       {
             *         "id": 1,
             *         "text": "Hello!",
             *         "fullname": "Joe Peach",
             *         "datetime": "2025-03-17T08:21:59+00:00"
             *       }
             *     ] */
			chat_log: components["schemas"]["ChatDto"][];
			/** @example [
             *       1,
             *       2,
             *       3
             *     ] */
			participants: number[];
		};
		ApiErrorDto: {
			message: string;
			statusCode: number;
			error: string;
		};
		ParticipantDto: {
			/** @example 1 */
			id: number;
			/** @example Joe */
			first_name: string;
			/** @example Peach */
			last_name: string;
			/** @example https://some.s3.com/some_bucket/images/avatar.png */
			avatar: string;
		};
		SettingsDataDto: {
			/** @example John */
			first_name: string;
			/** @example Daw */
			last_name: string;
			/** @example johndaw@example.com */
			email: string;
		};
		UpdateSettingsDto: {
			first_name?: string;
			last_name?: string;
			password?: string;
			repeat_password?: string;
		};
		ApiMessageDto: {
			message: string;
		};
		UpdateAvatarDto: {
			/** Format: binary */
			avatar: string;
		};
		UserMetadataDto: {
			/** @example John */
			first_name: string;
			/** @example Daw */
			last_name: string;
			/** @example 1 */
			id: number;
			/** @example https://some.s3.com/some_bucket/images/avatar.png */
			avatar: string;
		};
		BookDto: {
			/** @example OL17930368W */
			id: string;
			/** @example [
             *       "James Clear"
             *     ] */
			author: string[];
			/** @example Atomic Habits */
			title: string;
		};
		Interval: {
			hours?: number;
			minutes?: number;
		};
		EventWithBookDto: {
			/** @example 1 */
			id: number;
			/** @example Is Martin Eden mad person? */
			title: string;
			/** @example 2020-02-12T07:20:50.52Z */
			date: string;
			/** @example {
             *       "hours": 1,
             *       "minutes": 30
             *     } */
			duration: components["schemas"]["Interval"];
			/** @example 15 */
			members_count: number;
			/** @example <p>Hello</p> */
			description: string;
			book: components["schemas"]["BookDto"];
		};
		EventDtoChecked: {
			/** @example 1 */
			id: number;
			/** @example Is Martin Eden mad person? */
			title: string;
			/** @example 2020-02-12T07:20:50.52Z */
			date: string;
			/** @example {
             *       "hours": 1,
             *       "minutes": 30
             *     } */
			duration: components["schemas"]["Interval"];
			/** @example 15 */
			members_count: number;
			/** @example <p>Hello</p> */
			description: string;
			book: components["schemas"]["BookDto"];
			/** @example true */
			checked: boolean;
		};
		UserEventDto: {
			/** @example 1 */
			id: number;
			/** @example Is Martin Eden mad person? */
			title: string;
			/** @example 2020-02-12T07:20:50.52Z */
			date: string;
			/** @example {
             *       "hours": 1,
             *       "minutes": 30
             *     } */
			duration: components["schemas"]["Interval"];
			/** @example 15 */
			members_count: number;
			/** @example <p>Hello</p> */
			description: string;
			book: components["schemas"]["BookDto"];
			/** @example owner */
			role: string;
		};
		CreateEventDto: {
			title: string;
			book_id: string;
			datetime: string;
			duration: string;
			description?: string;
		};
		EventDto: {
			/** @example 1 */
			id: number;
			/** @example Is Martin Eden mad person? */
			title: string;
			/** @example 2020-02-12T07:20:50.52Z */
			date: string;
			/** @example {
             *       "hours": 1,
             *       "minutes": 30
             *     } */
			duration: components["schemas"]["Interval"];
			/** @example 15 */
			members_count: number;
			/** @example <p>Hello</p> */
			description: string;
		};
		CreateRecordDto: {
			/** @example 1 */
			event_id: number;
		};
		RecordDto: {
			/** @example 1 */
			user_id: number;
			/** @example 1 */
			event_id: number;
		};
		SignInDto: {
			/** @example admin@gmail.com */
			email: string;
			/** @example SomeStrongPswd.123 */
			password: string;
		};
		TokenDto: {
			/** @example somejwttoken */
			token: string;
			/** @example 1720878528 */
			expires: number;
		};
		SignUpDto: {
			email: string;
			first_name: string;
			last_name: string;
			password: string;
			repeat_password: string;
		};
		VerifyEmailDto: {
			token: string;
		};
		ResetPasswordDto: {
			email: string;
		};
		ApproveResetPasswordDto: {
			token: string;
			password: string;
			repeat_password: string;
		};
	};
	responses: never;
	parameters: never;
	requestBodies: never;
	headers: never;
	pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
	RoomsController_getById: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				/** @description Event`s id */
				id: number;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["RoomDto"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiErrorDto"];
				};
			};
		};
	};
	RoomsController_getParticipants: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				/** @description Event`s id */
				id: number;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ParticipantDto"][];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiErrorDto"];
				};
			};
		};
	};
	UsersController_getSettings: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["SettingsDataDto"];
				};
			};
		};
	};
	UsersController_updateSettings: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["UpdateSettingsDto"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiMessageDto"];
				};
			};
			/** @description Bad Request */
			400: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiErrorDto"];
				};
			};
		};
	};
	UsersController_updateAvatar: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["UpdateAvatarDto"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiMessageDto"];
				};
			};
			/** @description Bad Request */
			400: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiErrorDto"];
				};
			};
		};
	};
	UsersController_getUserInfo: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["UserMetadataDto"];
				};
			};
			/** @description User not found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiErrorDto"];
				};
			};
		};
	};
	BooksController_findAll: {
		parameters: {
			query?: {
				title?: unknown;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["BookDto"][];
				};
			};
		};
	};
	EventsController_findAll: {
		parameters: {
			query?: {
				/** @description Only future events */
				future?: boolean;
				/** @description Find by book title */
				book?: string;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["EventWithBookDto"][];
				};
			};
		};
	};
	EventsController_create: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["CreateEventDto"];
			};
		};
		responses: {
			/** @description Created */
			201: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["EventDto"];
				};
			};
			/** @description Too many events on this date */
			406: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiErrorDto"];
				};
			};
		};
	};
	EventsController_findChecked: {
		parameters: {
			query?: {
				/** @description Only future events */
				future?: boolean;
				/** @description Find by book title */
				book?: string;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["EventDtoChecked"][];
				};
			};
		};
	};
	EventsController_findMy: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["UserEventDto"][];
				};
			};
		};
	};
	EventsController_findById: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				/** @description Event`s id */
				id: number;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["EventDto"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiErrorDto"];
				};
			};
		};
	};
	RecordsController_get: {
		parameters: {
			query?: {
				/** @description Record`s event id */
				event_id?: unknown;
			};
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["RecordDto"][];
				};
			};
		};
	};
	RecordsController_create: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["CreateRecordDto"];
			};
		};
		responses: {
			/** @description Record created */
			201: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiMessageDto"];
				};
			};
			/** @description Record already exists */
			400: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiErrorDto"];
				};
			};
			/** @description Event not found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiErrorDto"];
				};
			};
		};
	};
	RecordsController_delete: {
		parameters: {
			query?: never;
			header?: never;
			path: {
				/** @description Event`s id */
				id: number;
			};
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiMessageDto"];
				};
			};
			/** @description You can`t delete the record, because you are owner */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiErrorDto"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiErrorDto"];
				};
			};
		};
	};
	AuthController_signIn: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["SignInDto"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["TokenDto"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiErrorDto"];
				};
			};
		};
	};
	AuthController_register: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["SignUpDto"];
			};
		};
		responses: {
			/** @description Created */
			201: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiMessageDto"];
				};
			};
			/** @description Invalid data */
			400: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiErrorDto"];
				};
			};
			/** @description User already exists */
			422: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiErrorDto"];
				};
			};
		};
	};
	AuthController_logout: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			200: {
				headers: {
					[name: string]: unknown;
				};
				content?: never;
			};
		};
	};
	AuthController_refresh: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody?: never;
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["TokenDto"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiErrorDto"];
				};
			};
		};
	};
	AuthController_verifyEmail: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["VerifyEmailDto"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiMessageDto"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiErrorDto"];
				};
			};
		};
	};
	AuthController_resetPassword: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ResetPasswordDto"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiMessageDto"];
				};
			};
			/** @description Not found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiErrorDto"];
				};
			};
		};
	};
	AuthController_approveResetPassword: {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		requestBody: {
			content: {
				"application/json": components["schemas"]["ApproveResetPasswordDto"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiMessageDto"];
				};
			};
			400: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiErrorDto"];
				};
			};
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiErrorDto"];
				};
			};
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ApiErrorDto"];
				};
			};
		};
	};
}
