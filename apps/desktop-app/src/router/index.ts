import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useSessionStore } from "@/stores/session";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
    meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  console.log(from);

  const sessionStore = useSessionStore();
  const isAuthenticated = sessionStore.sessionToken.value;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "signIn" });
  } else {
    next();
  }
});

export default router;
