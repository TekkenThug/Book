<template>
  <section :class="$style.section">
    <div :class="$style.header">
      <NuxtLink
        :to="{ name: 'auth' }"
      >
        {{ authStore.authenticated ? "Profile" : "Login" }}
      </NuxtLink>
    </div>

    <div :class="$style.content">
      <h1 :class="$style.title">
        Find own book community
      </h1>

      <p :class="$style.subtitle">
        Discuss about books, characters and subjects. Just register on book meeting.
      </p>

      <IconField>
        <InputIcon class="pi pi-search" />

        <InputText
          type="text"
          v-model="searchingString"
          variant="filled"
          placeholder="Enter a name of book"
          :class="$style.searchInput"
        />
      </IconField>

      <transition name="slide-up">
        <ul v-if="result.length" :class="$style.result">
          <li v-for="event in result" :key="event.id">
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

                  <NuxtLink :to="authStore.authenticated ? { name: 'events-id', params: { id: event.id } } : { name: 'auth' }">
                    <Button label="Register" />
                  </NuxtLink>
                </div>
              </template>
            </Card>
          </li>
        </ul>
      </transition>
    </div>

    <video playsinline autoplay muted loop :class="$style.videoBackground">
      <source src="~/assets/videos/books.mp4" type="video/mp4">
    </video>
  </section>
</template>

<script lang="ts" setup>
import _debounce from "lodash.debounce";
import type { Event } from "~/types/events";

const authStore = useAuthStore();

definePageMeta({
  layout: false,
});

const searchingString = ref("");
let result = ref<Event[]>([]);

const requestToTheServer = _debounce((search: string) => {
  result.value = [];

  if (search) {
    setTimeout(async () => {
      result.value = await authStore.fetchAPI("/events", { query: { book: search } });
    }, 300)
  }
}, 250)

watch(() => searchingString.value, requestToTheServer);
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
</style>
