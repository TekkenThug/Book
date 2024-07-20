<template>
	<section class="page">
		<div class="container">
			<CreateEvent @submit="redirectToEvents" />
		</div>
	</section>
</template>

<script lang="ts" setup>
import CreateEvent from "~/components/profile/events/create";

const router = useRouter();
const redirectToEvents = async () => {
	await router.push({ name: "profile-events" });
};
</script>
