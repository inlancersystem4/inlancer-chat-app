import { ref } from "vue";
import { defineStore } from "pinia";
import Cookies from "js-cookie"; 

export const useSessionStore = defineStore("session", () => {
  const sessionToken = ref(Cookies.get("sessionToken") || "");

  function setSessionToken(value: any) {
    sessionToken.value = value;
    Cookies.set("sessionToken", value, { expires: 1 / 24 });
  }

  return { setSessionToken, sessionToken };
});
