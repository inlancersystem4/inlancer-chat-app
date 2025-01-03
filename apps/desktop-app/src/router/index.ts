import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/sign-in",
    name: "signIn",
    component: () => import("@/views/auth/SignInView.vue"),
  },
  {
    path: "/sign-up",
    name: "signUp",
    component: () => import("@/views/auth/SignUpView.vue"),
  },
  {
    path: "/forget-password",
    name: "forgetPassword",
    component: () => import("@/views/auth/ForgetPasswordView.vue"),
  },
  {
    path: "/reset-password",
    name: "resetPassword",
    component: () => import("@/views/auth/ResetPassword.vue"),
  },
  {
    path: "/email",
    name: "emailsend",
    component: () => import("@/views/auth/EmailSendView.vue"),
  },
  {
    path: "/404",
    name: "notFound",
    component: () => import("@/views/NotFoundView.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "404",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
