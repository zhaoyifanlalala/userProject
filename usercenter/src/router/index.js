import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () =>import("../views/login.vue")
  },
  // {
  //   path: "/login",
  //   name: "login",
  //   component: () => import("../views/login.vue")
  // },
  {
    path: "/regist",
    name: "regist",
    component: () => import("../views/regist.vue")
  },
  {
    path: "/user",
    name: "user",
    redirect: "/user/userinfo",
    component: () => import("../views/user.vue"),
    children:[
      {
        path:"userinfo",
        name:"userInfo",
        component: () => import("../views/userInfo.vue")
      },
      {
        path:"points",
        name:"points",
        component: () => import("../views/points.vue")
      },
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (!(to.name == "login" || to.name == "regist")) {
    const isLogin = JSON.parse(localStorage.getItem("userInfo")) || "";
    if (!isLogin) {
      next({
        name: "login"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
