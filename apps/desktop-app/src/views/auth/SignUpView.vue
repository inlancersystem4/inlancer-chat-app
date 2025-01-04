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
import { effectScope, ref } from "vue";
import { Icon } from "@iconify/vue";
import { toast } from "vue-sonner";
import { post } from "@/utils/apiHelper";
import { useRouter } from "vue-router";

const formSchema = toTypedSchema(
  z.object({
    fname: z.string().min(1, "first name is required"),
    lname: z.string().min(1, "lname name is required"),
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
    const response = await post("auth/sign-up", {
      fname: values.fname,
      lname: values.lname,
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
        <h1 class="text-2xl font-bold">Create a new account</h1>
        <p class="text-sm text-muted-foreground">
          Enter your email below to sign up for a new account
        </p>
      </div>
      <div class="grid gap-5">
        <div class="grid grid-cols-2 gap-4">
          <FormField
            v-slot="{ componentField }"
            name="fname"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="jhon" v-bind="componentField" />
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
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="deo" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
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
            <FormLabel>Password</FormLabel>
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
          Crete Account
        </Button>
        <Button variant="outline" class="w-full" :disabled="isLoading">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Continue with GitHub
        </Button>
      </div>
      <div class="text-center text-sm">
        Already have an account?
        <RouterLink to="/sign-in" class="underline underline-offset-4">
          Login
        </RouterLink>
      </div>
    </form>
  </AuthLayout>
</template>
