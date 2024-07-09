<template>
	<Section title="Events">
		<Tabs value="list" lazy>
			<TabList>
				<Tab value="list">
					List
				</Tab>
				<Tab value="create">
					Create
				</Tab>
			</TabList>

			<TabPanels>
				<TabPanel value="list">
					<EventList />
				</TabPanel>

				<TabPanel value="create">
					<CreateEvent />
				</TabPanel>
			</TabPanels>
		</Tabs>
	</Section>
</template>

<script lang="ts" setup>
import Section from "~/components/profile/section";
import CreateEvent from "~/components/profile/events/create";
import EventList from "~/components/profile/events/list";
</script>
