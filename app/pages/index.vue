<template>
	<section class="flex items-center justify-center flex-col relative overflow-hidden min-h-dvh bg-black/75">
		<div class="flex flex-col items-center relative">
			<h1 class="text-5xl font-semibold mb-4">
				Find own book community
			</h1>

			<p class="mb-10">
				Discuss about books, characters and subjects. Just register on book meeting.
			</p>

			<IconField>
				<InputIcon class="pi pi-search" />

				<InputText
					v-model="searchingString"
					type="text"
					variant="filled"
					placeholder="Enter a name of book"
					class="w-full"
					@update:model-value="requestToTheServer"
				/>
			</IconField>

			<transition name="slide-up">
				<ul
					v-if="events.length"
					class="flex flex-col gap-5 absolute w-[360px] top-[calc(100%_+_20px)]"
				>
					<li v-for="event in events" :key="event.id">
						<Card>
							<template #title>
								{{ event.title }}
							</template>
							<template #content>
								<div class="flex justify-between pt-2.5">
									<div class="flex gap-1.5 flex-col mr-2.5">
										<p class="text-sm">
											Book: {{ event.book.title }}
										</p>
										<p class="text-sm">
											When: {{ parseDateTime(event.date) }}
										</p>
									</div>

									<Button
										:label="'checked' in event && event.checked ? 'Registered' : 'Register'"
										:disabled="'checked' in event ? event.checked : false"
										@click="registerToEvent(event.id)"
									/>
								</div>
							</template>
						</Card>
					</li>
				</ul>
			</transition>
		</div>

		<video
			playsinline
			autoplay
			muted
			loop
			class="absolute top-0 left-0 w-full h-full -z-1 object-cover"
		>
			<source src="~/assets/videos/books.mp4" type="video/mp4">
		</video>
	</section>
</template>

<script lang="ts" setup>
import _debounce from "lodash.debounce";
import { recordService, eventService, authService, isAPIError } from "~/services/api";
import type { CheckedMeetingEvent, MeetingEventWithBook } from "~/services/api/event";

definePageMeta({
	layout: "full-page",
});

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const { showErrorToast } = useUI();

const searchingString = ref("");
const events = ref<(CheckedMeetingEvent | MeetingEventWithBook)[]>([]);

const requestToTheServer = _debounce(async () => {
	events.value = [];

	try {
		if (searchingString.value) {
			const { data } = await eventService[authStore.authenticated ? "getWithChecked" : "get"]({
				future: true,
				book: searchingString.value,
			});

			if (data) {
				events.value = data;
			}
		}
	}
	catch (error) {
		if (isAPIError(error)) {
			showErrorToast(error.message);
		}
	}
}, 300);

const registerToEvent = async (id: number) => {
	if (!authStore.authenticated) {
		return await router.push({ name: "auth" });
	}

	const changedEvent = events.value.find(item => item.id === id);

	if (!changedEvent) {
		return;
	}

	try {
		await recordService.recordToEvent(id);

		if ("checked" in changedEvent) {
			changedEvent.checked = true;
		}
	}
	catch (e) {
		showErrorToast((e as Error).message);
	}
};

onBeforeMount(async () => {
	if (route.query.resetToken) {
		void router.push({ name: "reset-password", query: { resetToken: route.query.resetToken } });
		return;
	}

	if (typeof route.query.emailToken === "string") {
		try {
			await authService.verifyEmail(route.query.emailToken);
		}
		finally {
			await router.push({ query: {} });
		}
	}
});
</script>
