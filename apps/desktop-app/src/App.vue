<script setup>
import { RouterView } from "vue-router";
import { useColorMode } from "@vueuse/core";
import { Toaster } from "@/components/ui/sonner";
import { useFps, useBattery } from "@vueuse/core";
import { Icon } from "@iconify/vue";

const mode = useColorMode();

const { charging, level } = useBattery();
const fps = useFps();

mode.value = "auto";
</script>

<template>
  <div class="fixed end-1.5 top-1.5 flex items-center gap-4">
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
  <Toaster />
  <RouterView />
</template>
