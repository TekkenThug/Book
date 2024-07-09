<template>
	<section :class="$style.section">
		<header :class="$style.header">
			<ul :class="$style.navList">
				<template v-if="authStore.authenticated">
					<li :class="$style.navItem">
						<NuxtLink :to="{ name: 'profile' }">
							Profile
						</NuxtLink>
					</li>

					<li :class="$style.navItem" @click="logout">
						Logout
					</li>
				</template>

				<li v-else :class="$style.navItem">
					<NuxtLink :to="{ name: 'auth' }">
						Login
					</NuxtLink>
				</li>
			</ul>
		</header>

		<section :class="$style.content">
			<h1 :class="$style.title">
				Find own book community
			</h1>

			<p :class="$style.subtitle">
				Discuss about books, characters and subjects. Just register on book meeting.
			</p>

			<IconField>
				<InputIcon class="pi pi-search" />

				<InputText
					v-model="searchingString"
					type="text"
					variant="filled"
					placeholder="Enter a name of book"
					:class="$style.searchInput"
				/>
			</IconField>

			<transition name="slide-up">
				<ul v-if="events.length" :class="$style.result">
					<li v-for="event in events" :key="event.id">
						<Card>
							<template #title>
								{{ event.title }}
							</template>
							<template #content>
								<div :class="$style.resultItemFooter">
									<div>
										<p :class="$style.resultItemRow">
											Book: {{ event.book.title }}
										</p>
										<p :class="$style.resultItemRow">
											When: {{ new Date(event.date).toLocaleString() }}
										</p>
									</div>

									<Button
										:label="event.checked ? 'Registered' : 'Register'"
										:disabled="event.checked"
										@click="registerToEvent(event.id)"
									/>
								</div>
							</template>
						</Card>
					</li>
				</ul>
			</transition>
		</section>

		<video
			playsinline
			autoplay
			muted
			loop
			:class="$style.videoBackground"
		>
			<source src="~/assets/videos/books.mp4" type="video/mp4">
		</video>
	</section>
</template>

<script lang="ts" setup>
import _debounce from "lodash.debounce";
import type { EventWithChecked } from "~/types/events";

const authStore = useAuthStore();
const { showErrorToast } = useUI();

definePageMeta({
	layout: false,
});

const searchingString = ref("");
const events = ref<EventWithChecked[]>([]);

const requestToTheServer = _debounce((search: string) => {
	events.value = [];

	try {
		if (search) {
			setTimeout(async () => {
				events.value = await authStore.fetchAPI(
					authStore.authenticated
						? "/events/with-checked"
						: "/events", { query: { book: search } });
			}, 300);
		}
	}
	catch (e) {
		showErrorToast((e as Error).message);
	}
}, 250);

const logout = async () => {
	try {
		await authStore.logout();
	}
	catch (e) {
		console.log(e);
	}
};

watch(() => searchingString.value, requestToTheServer);

const route = useRoute();
const router = useRouter();
onBeforeMount(async () => {
	if (route.query.emailToken) {
		try {
			await authStore.verifyEmail(route.query.emailToken as string);
		}
		finally {
			await router.push({ query: {} });
		}
	}
});

const registerToEvent = async (id: number) => {
	if (!authStore.authenticated) {
		return await router.push({ name: "auth" });
	}

	const changedEvent = events.value.find(item => item.id === id);

	if (!changedEvent) {
		return;
	}

	try {
		await authStore.fetchAPI("/records", {
			method: "post",
			body: {
				event_id: id,
			},
		});

		changedEvent.checked = true;
	}
	catch (e) {
		showErrorToast((e as Error).message);
	}
};
</script>

<style module>
.section {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  background: rgba(30, 26, 38, .9);
  overflow: hidden;
}

.header {
  top: 20px;
  right: 40px;
  position: absolute;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.title {
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 20px;
}

.subtitle {
  margin-bottom: 50px;
}

.videoBackground {
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.searchInput {
  width: 100%;
}

.result {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: absolute;
  min-width: 360px;
  top: calc(100% + 20px);
  left: calc(50% - 180px);
}

.resultItemRow {
  font-size: 14px;
  line-height: 16px;
}

.resultItemRow:not(:last-child) {
  margin-bottom: 5px;
}

.resultItemFooter {
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
}

.navList {
  display: flex;
  gap: 40px;
}

.navItem {
  cursor: pointer;
}
</style>
