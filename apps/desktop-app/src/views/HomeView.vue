<script setup>
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Icon } from "@iconify/vue";
import ChatUserList from "@/components/custom/ChatUserList.vue";
import ChatMessageList from "@/components/custom/ChatMessageList.vue";
</script>

<template>
  <div class="h-dvh">
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel max-size="20">
        <div class="flex flex-col w-full h-full divide-y divide-border">
          <div class="py-1.5 px-1 flex items-start gap-2">
            <Button size="icon" variant="ghost" class="max-w-8 max-h-8">
              <Icon icon="teenyicons:menu-outline" />
            </Button>
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
          </div>
          <ScrollArea class="w-full h-full">
            <ChatUserList />
          </ScrollArea>
        </div>
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel>
        <div
          class="w-full h-full flex flex-col  justify-between divide-y divide-border"
        >
          <ScrollArea class="w-full h-full px-1.5">
            <ChatMessageList />
          </ScrollArea>
          <form class="w-ful p-4 space-y-2.5">
            <Textarea placeholder="Type message here..." class="max-h-44" />
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-2.5">
                <Button size="icon" variant="outline">
                  <Icon icon="teenyicons:link-remove-outline" />
                </Button>
                <Button size="icon" variant="outline">
                  <Icon icon="teenyicons:mood-smile-outline" />
                </Button>
                <Button size="icon" variant="outline">
                  <Icon icon="teenyicons:code-outline" />
                </Button>
              </div>
              <Button variant="secondary">Send</Button>
            </div>
          </form>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>
