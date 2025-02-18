<template>
	<section :class="$style.section">
		<MainLogo />

		<NewPasswordForm :token="route.query.resetToken" />
	</section>
</template>

<script lang="ts" setup>
import MainLogo from "~/components/common/main-link";
import NewPasswordForm from "~/components/forms/new-password";

definePageMeta({
	layout: false,
});

const route = useRoute();
const router = useRouter();

onBeforeMount(() => {
	if (!route.query.resetToken) {
		router.push({ name: "index" });
	}
});
</script>

<style module>
.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  padding: 20px;
}
</style>
