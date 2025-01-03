<script setup>
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
</script>

<template>
  <ul class="divide-y divide-border">
    <!-- <li class="p-2 flex items-center gap-3 hover:bg-secondary relative">
      <Avatar class="max-w-9 max-h-9">
        <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <h6 class="font-semibold text-base line-clamp-1">Jeet kasundra</h6>
        <p class="text-xs line-clamp-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
          architecto delectus veritatis!
        </p>
      </div>
    </li> -->
    <li class="p-2 flex items-center gap-3 hover:bg-secondary relative">
      <Avatar
        class="max-w-9 max-h-9 outline outline-green-500 outline-offset-2"
      >
        <AvatarImage src="https://github.com" alt="@radix-vue" />
        <AvatarFallback>JK</AvatarFallback>
      </Avatar>
      <div>
        <h6 class="font-semibold text-base line-clamp-1">Jeet kasundra</h6>
        <p class="underline text-xs line-clamp-1">New 2 Message</p>
      </div>
    </li>
  </ul>
</template>
