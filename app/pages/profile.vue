<template>
	<section class="page">
		<div class="container">
			<div class="flex items-start gap-5">
				<Menu :model="items">
					<template #item="{ item }">
						<NuxtLink
							:to="{ name: item.route }"
							class="flex gap-2.5 p-2 items-center"
							active-class="bg-zinc-800"
						>
							<span :class="item.icon" />

							<span>{{ item.label }}</span>
						</NuxtLink>
					</template>
				</Menu>

				<NuxtPage />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: "profile",
});

const items = ref([
	{
		label: "Settings",
		icon: "pi pi-cog",
		route: "profile-settings",
	},
	{
		label: "Events",
		icon: "pi pi-calendar",
		route: "profile-events",
	},
]);
</script>
