import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';

const routes = [
  { path: '/', component: Login },
  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter: async (to, from, next) => {
      const waitForClerk = () =>
        new Promise((resolve) => {
          const interval = setInterval(() => {
            if (window.Clerk && window.Clerk.loaded) {
              clearInterval(interval);
              resolve();
            }
          }, 50);
        });

      await waitForClerk();

      if (window.Clerk?.user) {
        next();
      } else {
        next('/');
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;