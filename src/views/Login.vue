<template>
  <div class="login-container">
    <SignIn redirectUrl="/dashboard" />
  </div>
</template>

<script setup>
import { SignIn, useClerk } from '@clerk/vue';
import { onMounted } from 'vue';

// ✅ Temporary logout to ensure login box appears
const { signOut } = useClerk();

onMounted(async () => {
  await signOut();
});
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>