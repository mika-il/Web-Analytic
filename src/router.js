import Vue from "vue";
import Router from "vue-router";
import store from "./store/store";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Dashboard.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/user_activity",
      name: "UserActivity",
      component: () => import("@/views/UserActivity.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/access_log",
      name: "Access",
      component: () => import("@/views/Access.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue")
    },
    {
      path: "/ys_login/:token",
      name: "YS-Login",
      component: () => import("@/views/YS-Login.vue")
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("@/views/Logout.vue")
    },
    {
      path: "/report/:group_id",
      name: "report",
      component: () => import("@/views/Report.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/client_report",
      name: "client_report",
      component: () => import("@/views/ClientReport.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/hr_activity",
      name: "hr_activity",
      component: () => import("@/views/HrActivity.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/resource_log",
      name: "resource",
      component: () => import("@/views/ResourceLog.vue"),
      meta: {
        requiresAuth: true
      }
    },
    // {
    //   path: "/user_activity/:group_id",
    //   name: "report",
    //   component: () => import("@/views/TestReport.vue"),
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters["Auth/isLoggedIn"]) {
      next();
      return;
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
