<script setup>
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import * as z from "zod";

const formSchema = toTypedSchema(z.object({}));

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="w-full space-y-6">
    <h4 class="text-xl font-semibold capitalize">Profile changes</h4>
    <div class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <FormField
          v-slot="{ componentField }"
          name="avatar"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem>
            <FormLabel class="text-muted-foreground">Avatar</FormLabel>
            <FormControl>
              <div class="w-full flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com" alt="@radix-vue" />
                  <AvatarFallback>JK</AvatarFallback>
                </Avatar>
                <Input
                  type="file"
                  class="bg-secondary"
                  v-bind="componentField"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div></div>
        <FormField
          v-slot="{ componentField }"
          name="username"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem>
            <FormLabel class="text-muted-foreground">Username</FormLabel>
            <FormControl>
              <Input
                class="bg-secondary"
                placeholder="@username"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <FormField
          v-slot="{ componentField }"
          name="fname"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem>
            <FormLabel class="text-muted-foreground">First Name</FormLabel>
            <FormControl>
              <Input
                class="bg-secondary"
                placeholder="jhon"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="lname"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem>
            <FormLabel class="text-muted-foreground">Last Name</FormLabel>
            <FormControl>
              <Input
                class="bg-secondary"
                placeholder="deo"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <FormField
        v-slot="{ componentField }"
        name="bio"
        :validate-on-blur="!isFieldDirty"
      >
        <FormItem>
          <FormLabel class="text-muted-foreground">Bio</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Tell us a little bit about yourself"
              class="resize-none bg-secondary"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <div class="flex items-center justify-end">
      <Button variant="secondary">Save Chnages</Button>
    </div>
  </form>
</template>
