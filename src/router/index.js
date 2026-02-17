import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FormView from "../views/FormView.vue";
import NewFormView from "@/views/NewFormView.vue";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import cartView from "@/views/CartView.vue";
import { authGuard } from "@/middleware/authGuard";
import TableView from "@/views/TableView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/signup",
      name: "Signup",
      component: SignupView,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/form",
      name: "form",
      component: FormView,
      meta:{requiresAuth:true}
    },
    {
      path: "/newform",
      name: "New Form",
      component: NewFormView,
      meta:{requiresAuth:true}
    },
    {
      path: "/edit-user/:id",
      name: "editUser",
      component: () => import("@/views/NewFormView.vue"),
      props: true,
      meta:{requiresAuth:true}
    },
    {
      path: "/cart",
      name: "cart",
      component: cartView,
      meta:{requiresAuth:true}
    },
    {
      path:"/table",
      name:"table",
      component:TableView,
      meta:{requiresAuth:true}
    }
  ],
});

router.beforeEach(authGuard)

export default router;
