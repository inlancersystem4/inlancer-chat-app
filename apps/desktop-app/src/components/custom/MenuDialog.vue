<script setup>
import {
  Dialog,
  DialogScrollContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import FriendList from "../menu/FriendList.vue";
import { Icon } from "@iconify/vue";
import Profile from "../menu/Profile.vue";
import { ref } from "vue";

const props = defineProps({
  open: Boolean,
});

const tabList = ref([
  {
    id: 1,
    tabName: "Profile",
    component: Profile,
  },
  {
    id: 2,
    tabName: "Add Friend",
    component: FriendList,
  },
  {
    id: 3,
    tabName: "Setting",
    component: "",
  },
]);

const activeTab = ref(tabList.value[0].component);

function openTab(tabValue) {
  activeTab.value = tabValue.component;
}
</script>

<template>
  <Dialog :open="open">
    <DialogScrollContent class="max-w-4xl p-0 gap-0">
      <DialogHeader class="p-4">
        <div class="w-full flex items-center justify-between">
          <div class="flex items-center gap-4">
            <Avatar
              class="max-w-9 max-h-9 outline outline-green-500 outline-offset-2"
            >
              <AvatarImage src="https://github.com" alt="@radix-vue" />
              <AvatarFallback>JK</AvatarFallback>
            </Avatar>
            <div>
              <h6 class="font-semibold text-base line-clamp-1">
                Jeet kasundra
              </h6>
            </div>
          </div>
          <DialogClose as-child>
            <Button
              type="button"
              size="icon"
              @click="$emit('close')"
              variant="secondary"
            >
              <Icon icon="majesticons:close" />
            </Button>
          </DialogClose>
        </div>
      </DialogHeader>
      <div
        class="flex items-stretch border-t border-input divide-x divide-input"
      >
        <aside class="w-full max-w-48 p-4">
          <ul class="space-y-1 w-full">
            <li v-for="item in tabList" :key="item.id">
              <Button
                class="w-full justify-start"
                @click="openTab(item)"
                :variant="activeTab == item.component ? 'secondary' : 'ghost'"
              >
                {{ item.tabName }}
              </Button>
            </li>
          </ul>
        </aside>
        <div class="w-full p-4">
          <component :is="activeTab" />
        </div>
      </div>
    </DialogScrollContent>
  </Dialog>
</template>
