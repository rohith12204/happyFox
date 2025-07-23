<template>
  <div class="dashboard">
    <SignedIn>
      <h2>Welcome, User ID: {{ userId }}</h2>
    </SignedIn>

    <SignedOut>
      <p>You are not signed in. Redirecting to login...</p>
    </SignedOut>
  </div>
</template>

<script setup>
import { SignedIn, SignedOut, useAuth } from '@clerk/vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const { userId } = useAuth();
const router = useRouter();

onMounted(() => {
  if (!userId) {
    router.push('/');
  }
});
</script>
