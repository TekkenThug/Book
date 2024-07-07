<template>
  <Section title="Events">
    <Tabs value="0">
      <TabList>
        <Tab value="0">List</Tab>
        <Tab value="1">Create</Tab>
      </TabList>

      <TabPanels>
        <TabPanel value="0">
          <Loader v-if="isLoading" />
          <DataTable v-else :value="events">
            <Column field="title" header="Title" />
            <Column field="book.title" header="Book" />
            <Column field="date" header="Date" />
            <Column field="duration" header="Duration" />
            <Column field="members_count" header="Members" />
            <Column header="Role">
              <template #body="slotProps">
                <Tag
                  :severity="slotProps.data.role === 'owner' ? 'warn' : 'info'"
                  :value="slotProps.data.role === 'owner' ? 'Owner': 'Member'"
                />
              </template>
            </Column>
          </DataTable>
        </TabPanel>

        <TabPanel value="1">
          This is create form
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Section>
</template>

<script lang="ts" setup>
import Loader from "~/components/common/loader/loader.vue";
import Section from "~/components/profile/section"
import { parseInterval, parseDateTime } from "~/utils/date";
import type { Event, MappedEvent } from "~/types/events";

const events = ref<MappedEvent[]>([]);

const authStore = useAuthStore();
const { showErrorToast } = useUI();
const isLoading = ref(true);
const getEvents = async () => {
  try {
    events.value = (await authStore.fetchAPI<Event[]>("/events/my")).map(item => ({
      ...item,
      date: parseDateTime(item.date) as string,
      duration: parseInterval(item.duration),
    }));
    isLoading.value = false;
  } catch (e) {
    showErrorToast((e as Error).message);
  }
};

onBeforeMount(async () => {
  await getEvents();
})
</script>
