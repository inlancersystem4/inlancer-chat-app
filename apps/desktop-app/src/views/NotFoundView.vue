<script setup>
import { Button } from "@/components/ui/button";
</script>
<template>
  <main class="w-full h-dvh flex items-center justify-center">
    <div class="space-y-5 text-center">
      <h1 class="text-7xl font-semibold">$)$</h1>
      <Button as-child><RouterLink to="/">Go To Home Page</RouterLink></Button>
    </div>
  </main>
</template>
