<script setup>
import { RouterView } from "vue-router";
import { useColorMode } from "@vueuse/core";
import { Toaster } from "@/components/ui/sonner";
import { useFps, useBattery } from "@vueuse/core";
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import { Icon } from "@iconify/vue";
import { computed } from "vue";

const mode = useColorMode();

const { charging, level } = useBattery();
const fps = useFps();

mode.value = "light";
</script>

<template>
  <div class="fixed start-1.5 bottom-1.5 flex items-center gap-4">
    <p class="text-xs flex items-center gap-1">
      <Icon icon="ri:wifi-line" />
      {{ fps }}
    </p>
    <p class="text-xs flex items-center gap-1">
      <Icon
        :icon="charging ? 'ri:battery-charge-line' : 'ri:battery-low-line'"
      />
      {{ level }}
    </p>
  </div>
  <VueQueryDevtools />
  <Toaster />
  <RouterView />
</template>
