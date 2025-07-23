import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { clerkPlugin } from '@clerk/vue';

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const app = createApp(App);

app.use(router);
app.use(clerkPlugin, {
  publishableKey: clerkPublishableKey,
  router,
});

app.mount('#app');
