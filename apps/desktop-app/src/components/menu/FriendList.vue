<script setup>
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/vue";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { post } from "@/utils/apiHelper";
import { useQuery } from "@tanstack/vue-query";

async function fetchUsers() {
  const response = await post("user/users", {
    page: 1,
    limit: 20,
    search: "",
  });
  if (response.success == 1) {
    return response;
  } else {
    return null;
  }
}

const { isPending, isError, data, error } = useQuery({
  queryKey: ["allUsers"],
  queryFn: fetchUsers,
});
</script>

<template>
  <div class="w-full space-y-6">
    <h4 class="text-xl font-semibold capitalize">Add Friend</h4>
    <div class="relative w-full">
      <Input
        id="search"
        type="text"
        :disabled="isPending || isError"
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
    <div v-if="isPending" class="flex items-center justify-center py-12">
      <Icon icon="pixelarticons:loader" class="w-7 h-7 animate-spin" />
    </div>
    <div v-if="isError" class="flex items-center justify-center py-12">
      <Icon icon="subway:error" class="w-7 h-7" />
    </div>
    <div
      v-if="!isPending && !isError && data && data.length == 0"
      class="py-12 text-center"
    >
      <Icon icon="iconoir:db-error" class="w-7 h-7" />
    </div>
    <ul class="grid grid-cols-2 gap-4" v-else>
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
