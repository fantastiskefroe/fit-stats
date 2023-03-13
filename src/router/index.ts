import {createRouter, createWebHistory} from 'vue-router'
import DashboardView from "@/views/DashboardView.vue";
import RemainingView from "@/views/RemainingView.vue";
import GroupedView from "@/views/GroupedView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/grouped',
      name: 'grouped',
      component: GroupedView
    },
    {
      path: '/remaining',
      name: 'remaining',
      component: RemainingView
    },
  ],
});

export default router;
