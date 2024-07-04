import { defineStore } from 'pinia';
import { useLocalStorage } from "@vueuse/core";
import { parseJWT } from "~/utils";

interface UserPayloadInterface {
  email: string;
  password: string;
}

interface TokenResponse {
  token: string;
  expires: number;
}

export const useAuthStore = defineStore("auth", () => {
  const config = useRuntimeConfig();
  const authenticated = ref(false);

  const token = useLocalStorage<string | null>("token", null);
  const tokenExpires = useLocalStorage<number | null>("token_exp", null);

  const tokenIsExpired = computed(() => {
    if (!tokenExpires.value) return false;

    return new Date().getTime() > tokenExpires.value;
  });
  const userId = computed(() => {
    if (!token.value) return null;

    const payload = parseJWT(token.value);

    return payload.sub;
  })

  const authenticateUser = async ({ email, password }: UserPayloadInterface) => {
    const data = await $fetch<TokenResponse>(`${config.public.baseURL}/auth/login`, {
      method: 'post',
      body: {
        email,
        password,
      },
      credentials: "include",
      onResponseError({ response}) {
        throw Error(response._data.message);
      }
    });

    token.value = data.token;
    tokenExpires.value = data.expires;

    authenticated.value = true;
  }
  const refreshTokens = async () => {
    const data = await $fetch<TokenResponse>(`${config.public.baseURL}/auth/refresh`, {
      method: "post",
      credentials: "include"
    });

    token.value = data.token;
    tokenExpires.value = data.expires;
  };
  const logout = async () => {
    await fetchAPI.value("/auth/logout", { method: "post", credentials: "include" })

    token.value = null;
    tokenExpires.value = null;

    authenticated.value = false;
  };

  const fetchAPI = computed(() => $fetch.create({
    baseURL: config.public.baseURL,
    headers: [["Authorization", `bearer ${token.value}`]]
  }));

  return {
    authenticated,
    authenticateUser,
    token,
    tokenIsExpired,
    refreshTokens,
    logout,
    userId,
    fetchAPI
  }
});
