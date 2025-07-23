<template>
  <div class="dashboard">
    <SignedIn>
      <div class="navbar">
        <div class="welcome-text">
          Welcome {{ firstName }}
        </div>
        <div class="user-section">
          <img :src="profileImageUrl" alt="Profile Picture" class="profile-pic" />
          <button class="logout-button" @click="logout">Logout</button>
        </div>
      </div>
    </SignedIn>

    <SignedOut>
      <p>You are not signed in. Redirecting to login...</p>
    </SignedOut>
  </div>
</template>

<script setup>
import { SignedIn, SignedOut, useUser, useClerk } from '@clerk/vue';
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const { user } = useUser();
const clerk = useClerk();
const router = useRouter();

const firstName = computed(() => user.value?.firstName || 'User');
const profileImageUrl = computed(() => user.value?.imageUrl || 'https://via.placeholder.com/40');

onMounted(() => {
  if (!user.value) {
    router.push('/');
  }
});

const logout = async () => {
  await clerk.value.signOut();
  router.push('/');
};
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background-color: #f9fafb;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.navbar {
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2rem;
  border-radius: 8px;
  margin: 1rem;
}

.welcome-text {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.profile-pic {
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-color: black;
  border-radius: 10px; 
}


.logout-button {
  padding: 8px 14px;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #c53030;
}
</style>
