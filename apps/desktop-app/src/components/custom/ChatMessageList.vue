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
        <div class="py-1 px-1 w-full">
          <div class="message-box my">Lorem</div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent class="w-52">
        <ContextMenuItem>Edit</ContextMenuItem>
        <ContextMenuItem>Copy Text</ContextMenuItem>
        <ContextMenuItem class="text-destructive">
          <Icon icon="teenyicons:bin-outline" class="mr-3" />
          Delete</ContextMenuItem
        >
        <ContextMenuSeparator />
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
    <ContextMenu as="li">
      <ContextMenuTrigger>
        <div class="py-1 px-1 w-full">
          <div class="message-box">
            Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur nesciunt reiciendis delectus reprehenderit soluta cum
            modi beatae architecto in iste impedit esse numquam amet aliquam
            vero adipisci vel.
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent class="w-52">
        <ContextMenuItem>Edit</ContextMenuItem>
        <ContextMenuItem>Copy Text</ContextMenuItem>
        <ContextMenuItem class="text-destructive">
          <Icon icon="teenyicons:bin-outline" class="mr-3" />
          Delete</ContextMenuItem
        >
        <ContextMenuSeparator />
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  </ul>
</template>

<style scoped>
.message-box {
  @apply max-w-96 py-1 px-2.5 text-base rounded-lg text-wrap w-fit bg-secondary border border-transparent text-start;
}

.message-box.my {
  @apply text-end ml-auto bg-transparent border-border text-primary;
}
</style>
