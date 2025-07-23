<template>
  <div class="dashboard">
    <SignedIn>
      <div class="header">
        <h2>Welcome, User ID: {{ userId }}</h2>
        <button class="logout-button" @click="logout">Logout</button>
      </div>
    </SignedIn>

    <SignedOut>
      <p>You are not signed in. Redirecting to login...</p>
    </SignedOut>
  </div>
</template>

<script setup>
import { SignedIn, SignedOut, useAuth, useClerk } from '@clerk/vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const { userId } = useAuth();
const clerk = useClerk(); // 👈 reactive ref
const router = useRouter();

onMounted(() => {
  if (!userId) {
    router.push('/');
  }
});

const logout = async () => {
  await clerk.value.signOut(); // ✅ this is correct for @clerk/vue@1.8.12
  router.push('/');
};
</script>


<style scoped>
.dashboard {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logout-button {
  padding: 8px 16px;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #c53030;
}
</style>
