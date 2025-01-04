<script setup>
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Icon } from "@iconify/vue";
import { Button } from "@/components/ui/button";
</script>

<template>
  <ul>
    <ContextMenu as="li">
      <ContextMenuTrigger>
        <div class="py-1.5 px-1 w-full">
          <div class="message-box">Lorem</div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent class="w-52">
        <ContextMenuItem>
          <Icon icon="bi:reply" class="mr-3 size-4" />
          Replay</ContextMenuItem
        >
        <ContextMenuItem>
          <Icon icon="teenyicons:edit-outline" class="mr-3" />
          Edit</ContextMenuItem
        >
        <ContextMenuItem>
          <Icon icon="teenyicons:note-outline" class="mr-3" />
          Copy Text</ContextMenuItem
        >
        <ContextMenuItem class="text-destructive">
          <Icon icon="teenyicons:bin-outline" class="mr-3" />
          Delete</ContextMenuItem
        >
        <ContextMenuSeparator />
        <ContextMenuItem disabled>4:00 PM</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  </ul>
</template>

<style scoped>
.message-box {
  @apply max-w-96 py-1 px-2.5 text-sm rounded-md text-wrap w-fit bg-secondary border border-transparent text-start;
}

.message-box.my {
  @apply text-end ml-auto  border-input text-primary shadow-sm;
}
</style>
