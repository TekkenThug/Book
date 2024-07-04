import { storeToRefs } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export default defineNuxtRouteMiddleware((to) => {
  const { authenticated } = storeToRefs(useAuthStore());
  const token = useLocalStorage("token", null);

  if (token.value) {
    authenticated.value = true;
  }

  if (to.name === "index") {
    return;
  }

  if (token.value && ["auth", "register"].includes(to.name as string)) {
    return navigateTo("/");
  }

  if (!token.value && !["auth", "register"].includes(to.name as string)) {
    abortNavigation();
    return navigateTo("/auth");
  }
});
