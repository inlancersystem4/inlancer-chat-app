<script setup>
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/vue";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
</script>

<template>
  <div class="w-full space-y-6">
    <div class="relative w-full">
      <Input
        id="search"
        type="text"
        placeholder="Search..."
        class="pl-8 bg-secondary max-h-8"
      />
      <span
        class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
      >
        <Icon
          icon="teenyicons:search-outline"
          class="size-4 text-muted-foreground"
        />
      </span>
    </div>
    <ul class="grid grid-cols-2 gap-4">
      <li
        class="w-full border border-input rounded-lg cursor-pointer p-2.5 flex gap-4 items-center"
      >
        <Avatar
          class="max-w-8 max-h-8 outline outline-green-500 outline-offset-2"
        >
          <AvatarImage src="https://github.com" alt="@radix-vue" />
          <AvatarFallback>JK</AvatarFallback>
        </Avatar>
        <div>
          <h6 class="font-semibold text-sm line-clamp-1">Jeet kasundra</h6>
        </div>
      </li>
    </ul>
  </div>
</template>
