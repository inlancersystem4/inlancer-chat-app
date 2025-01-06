import { ref } from "vue";
import { defineStore } from "pinia";
import Cookie from "tiny-cookie";

export const useSessionStore = defineStore("session", () => {
  const sessionToken = ref<string>(Cookie.get("sessionToken") || "");

  function setSessionToken(value: string) {
    sessionToken.value = value;
    Cookie.set("sessionToken", value, {
      path: "/",
      expires: 1 / 24, // 1 hour
    });
  }

  return { setSessionToken, sessionToken };
});
