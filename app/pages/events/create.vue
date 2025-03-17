<template>
	<section class="page">
		<div class="container">
			<ProfileEventsCreate @submit="redirectToEvents" />
		</div>
	</section>
</template>

<script lang="ts" setup>
import { ProfileEventsCreate } from "#components";

const router = useRouter();
const redirectToEvents = async () => {
	await router.push({ name: "profile-events" });
};
</script>
