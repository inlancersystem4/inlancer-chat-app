<script setup>
import AuthLayout from "@/layouts/AuthLayout.vue";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import * as z from "zod";
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const formSchema = toTypedSchema(
  z
    .object({
      password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be at most 20 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
          /[^a-zA-Z0-9]/,
          "Password must contain at least one special character"
        ),
      confirmPassword: z
        .string()
        .min(6, "Confirm password must be at least 6 characters")
        .max(20, "Confirm password must be at most 20 characters")
        .regex(
          /[A-Z]/,
          "Confirm password must contain at least one uppercase letter"
        )
        .regex(
          /[a-z]/,
          "Confirm password must contain at least one lowercase letter"
        )
        .regex(/[0-9]/, "Confirm password must contain at least one number")
        .regex(
          /[^a-zA-Z0-9]/,
          "Confirm password must contain at least one special character"
        ),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match",
          path: ["confirmPassword"],
        });
      }
    })
);

const isLoading = ref(false);
const pass1 = ref(true);
const pass2 = ref(true);

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  console.log("Form submitted!", values);
});
</script>

<template>
  <AuthLayout>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-8">
      <div class="flex flex-col items-center gap-2 text-center">
        <h1 class="text-2xl font-bold">Set Your New Password</h1>
        <p class="text-sm text-muted-foreground">
          Choose a strong password to protect your account.
        </p>
      </div>
      <div class="grid gap-6">
        <FormField
          v-slot="{ componentField }"
          name="password"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <div class="relative w-full">
                <Input
                  :type="pass1 ? 'password' : 'text'"
                  class="pr-10"
                  v-bind="componentField"
                />
                <Button
                  @click="pass1 = !pass1"
                  size="icon"
                  type="button"
                  variant="ghost"
                  class="absolute end-0 inset-y-0 flex items-center justify-center px-2"
                >
                  <Icon
                    :icon="
                      pass1
                        ? 'teenyicons:eye-outline'
                        : 'teenyicons:eye-closed-outline'
                    "
                    class="size-5 text-muted-foreground"
                  />
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="confirmPassword"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <div class="relative w-full">
                <Input
                  :type="pass2 ? 'password' : 'text'"
                  class="pr-10"
                  v-bind="componentField"
                />
                <Button
                  @click="pass2 = !pass2"
                  size="icon"
                  type="button"
                  variant="ghost"
                  class="absolute end-0 inset-y-0 flex items-center justify-center px-2"
                >
                  <Icon
                    :icon="
                      pass2
                        ? 'teenyicons:eye-outline'
                        : 'teenyicons:eye-closed-outline'
                    "
                    class="size-5 text-muted-foreground"
                  />
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit" class="w-full" :disabled="isLoading">
          <Icon
            icon="teenyicons:loader-outline"
            class="animate-spin"
            v-if="isLoading"
          />
          Set New Password
        </Button>
      </div>
    </form>
  </AuthLayout>
</template>
