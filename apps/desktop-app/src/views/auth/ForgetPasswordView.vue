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
  z.object({
    email: z
      .string()
      .min(2, "Email is required")
      .max(50, "Email must be at most 50 characters")
      .email("Invalid email address"),
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
  })
);

const isLoading = ref(false);

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
        <h1 class="text-2xl font-bold">Reset Your Password</h1>
        <p class="text-sm text-muted-foreground">
          Enter your email address below, and we'll send you instructions to
          reset your password.
        </p>
      </div>
      <div class="grid gap-6">
        <FormField
          v-slot="{ componentField }"
          name="email"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="m@example.com"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="space-y-2">
          <Button type="submit" class="w-full" :disabled="isLoading">
            <Icon
              icon="teenyicons:loader-outline"
              class="animate-spin"
              v-if="isLoading"
            />
            Reset Password
          </Button>
          <Button
            type="submit"
            variant="secondary"
            class="w-full"
            as-child
            :disabled="isLoading"
          >
            <RouterLink to="/sign-in">
              <Icon icon="teenyicons:arrow-left-outline" />
              Back to Login
            </RouterLink>
          </Button>
        </div>
      </div>
    </form>
  </AuthLayout>
</template>
