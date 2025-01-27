<script setup>
import AuthLayout from "@/layouts/AuthLayout.vue";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSessionStore } from "@/stores";
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
import { toast } from "vue-sonner";
import { post } from "@/utils/apiHelper";
import { useRouter } from "vue-router";

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

const router = useRouter();
const isLoading = ref(false);
const sessionStore = useSessionStore();

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;

  try {
    const response = await post("auth/sign-in", {
      email: values.email,
      password: values.password,
    });

    if (response.success == 1) {
      toast.success(response.message);
      sessionStore.setSessionToken(response.data.token);
      router.push("/");
    } else {
      toast.error(response.message);
    }
  } catch (e) {
    toast.error(e || "500");
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <AuthLayout>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-8">
      <div class="flex flex-col items-center gap-2 text-center">
        <h1 class="text-2xl font-bold">Login to your account</h1>
        <p class="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
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
        <FormField
          v-slot="{ componentField }"
          name="password"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem>
            <div class="flex justify-between">
              <FormLabel>Password</FormLabel>
              <RouterLink
                to="/forget-password"
                class="ml-auto text-sm underline-offset-4 hover:underline"
                >Forgot your password?</RouterLink
              >
            </div>
            <FormControl>
              <Input type="password" v-bind="componentField" />
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
          Login
        </Button>
        <div
          class="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"
        >
          <span class="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button variant="outline" class="w-full" :disabled="isLoading">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Login with GitHub
        </Button>
      </div>
      <div class="text-center text-sm">
        Don&apos;t have an account?
        <RouterLink to="/sign-up" class="underline underline-offset-4">
          Sign up
        </RouterLink>
      </div>
    </form>
  </AuthLayout>
</template>
