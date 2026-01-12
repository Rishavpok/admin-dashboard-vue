import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/admin",
      meta: { requireAuth: true },
    },
    {
      path: "/admin",
      component: () => import("@/layouts/AdminLayout.vue"),
      meta: { requireAuth: true },
      children :  [
        {
          path : "dashboard",
          component :() => import("@/pages/dashboard/DashboardView.vue")
        },
         {
          path : "users",
          component :() => import("@/pages/users/UserList.vue")
        }
      ]
    },
    {
      path: "/auth",
      component: () => import("@/layouts/AuthLayout.vue"), // lazy load
      name : "auth",
      children : [
        {
          path : "/login",
          name : "login",
          component: () => import("@/pages/auth/Login.vue"), // lazy load
        },
            {
          path : "/register",
          name : "register",
          component: () => import("@/pages/auth/Register.vue"), // lazy load
        }
      ]
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const needsAuth = to.matched.some((r) => r.meta.requireAuth);

  if (to.name === "login" && isLoggedIn) {
    next({ name: "home" });
    return;
  }

  if (needsAuth && !isLoggedIn) {
    next({ name: "login" });
    return;
  }

  next();
});

export default router;
