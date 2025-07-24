<template>
  <div class="dashboard">
    <!-- Sidebar Dropdown -->
    <transition name="dropdown">
      <div v-if="isSidebarOpen" class="sidebar-dropdown">
        <ul class="sidebar-links">
          <li>PROFILE</li>
          <li>CONNECT ME</li>
          <li>SETTINGS</li>
          <li>ABOUT </li>
          <li>CONTACT US</li>
        </ul>
      </div>
    </transition>

    <!-- Top bar -->
    <SignedIn>
      <div class="top-black-bar">
        <button class="menu-icon" @click="toggleSidebar">
          <span :class="{ bar: true, top: true, active: isSidebarOpen }"></span>
          <span :class="{ bar: true, middle: true, active: isSidebarOpen }"></span>
          <span :class="{ bar: true, bottom: true, active: isSidebarOpen }"></span>
        </button>

        <div class="center-section">
          <img src="@/assets/happyfox.png" alt="Logo" class="university-logo" />
          <div class="university-text-group">
            <span class="university-title">FOX UNIVERSITY</span>
            <span class="university-subtitle">connects with you</span>
          </div>
        </div>

        <div class="right-section">
          <span class="welcome-text">Welcome {{ firstName }}</span>
          <img :src="profileImageUrl" alt="Profile" class="profile-pic" @click="togglePopup" />
          <div v-if="showPopup" class="popup-menu">
            <button class="logout-button" @click="logout">Logout</button>
          </div>
        </div>
      </div>
    </SignedIn>

    <!-- Hero Banner -->
    <div class="hero-banner">
      <img :src="foxImage" alt="Hero" class="hero-image" />
      <div class="hero-overlay">
        <div class="play-button">▶</div>
        <div class="hero-title">Here</div>
        <p class="hero-subtext">
          Three friends confront the grieving process through shared rituals and memories made among nature
        </p>
      </div>
    </div>

    <SignedOut>
      <p>You are not signed in. Redirecting to login...</p>
    </SignedOut>
  </div>
</template>

<script setup>
import { SignedIn, SignedOut, useUser, useClerk } from '@clerk/vue';
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import foxImage from '@/assets/fox_uni1.jpeg';

const { user } = useUser();
const clerk = useClerk();
const router = useRouter();

const firstName = computed(() => user.value?.firstName || 'User');
const profileImageUrl = computed(() => user.value?.imageUrl || 'https://via.placeholder.com/40');

onMounted(() => {
  if (!user.value) router.push('/');
});

const showPopup = ref(false);
const isSidebarOpen = ref(false);

const togglePopup = () => (showPopup.value = !showPopup.value);
const toggleSidebar = () => (isSidebarOpen.value = !isSidebarOpen.value);

const logout = async () => {
  await clerk.value.signOut();
  router.push('/');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.dashboard {
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  background-color: #f9fafb;
  position: relative;
}

/* --- DROPDOWN SIDEBAR --- */
.sidebar-dropdown {
  background: white;
  position: absolute;
  top: 70px;
  left: 0;
  width: 70%; /* ⬅️ Change this to desired width */
  max-width: 400px; /* ⬅️ Optional: set a max width */
  z-index: 1000;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.2);
  animation: dropdownFade 0.3s ease forwards;
  border-radius: 0 0 12px 0;
  max-height: 500px;
}



.sidebar-links {
  list-style: none;
  margin: 0;
  padding: 1rem 1.5rem;
}

.sidebar-links li {
  padding: 1rem 0;
  font-weight: 600;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

/* Dropdown Transition */
.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  max-height: 0;
}
.dropdown-enter-to, .dropdown-leave-from {
  opacity: 1;
  max-height: 300px;
}
.dropdown-enter-active, .dropdown-leave-active {
  transition: all 0.35s ease;
}

/* --- TOP BLACK BAR --- */
.top-black-bar {
  background-color: #000;
  color: white;
  padding: 1.2rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1100;
}

/* --- MENU ICON --- */
.menu-icon {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 24px;
  width: 30px;
  padding: 0;
  z-index: 1200;
}

.bar {
  width: 100%;
  height: 3px;
  background-color: white;
  border-radius: 2px;
  transition: all 0.4s ease;
}

.top.active {
  transform: rotate(45deg) translate(5px, 5px);
}

.middle.active {
  opacity: 0;
}

.bottom.active {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* --- CENTER LOGO AND TITLE --- */
.center-section {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
}

.university-logo {
  height: 64px;
  transform: translateY(6px);
}

.university-text-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.1;
}

.university-title {
  font-size: clamp(1.6rem, 2.5vw, 2.2rem);
  font-weight: 600;
}

.university-subtitle {
  font-size: clamp(0.8rem, 1.4vw, 1.1rem);
  font-style: italic;
  opacity: 0.85;
  padding-left: 2px;
}

/* --- RIGHT PROFILE SECTION --- */
.right-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 10;
}

.welcome-text {
  font-size: 1rem;
  font-weight: 500;
}

.profile-pic {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.profile-pic:hover {
  transform: scale(1.1);
}

.popup-menu {
  position: absolute;
  top: 110%;
  right: 0;
  background: white;
  color: black;
  padding: 0.8rem 1rem;
  border-radius: 6px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
  z-index: 99;
  min-width: 100px;
}

.logout-button {
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  width: 100%;
  transition: background 0.3s ease;
}

.logout-button:hover {
  background: #c53030;
}

/* --- HERO SECTION --- */
.hero-banner {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  z-index: 1;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: white;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  z-index: 2;
}

.play-button {
  font-size: 2.5rem;
  background: rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 50%;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.play-button:hover {
  background: rgba(255, 255, 255, 0.6);
  color: #000;
  transform: scale(1.1);
}

.hero-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  animation: fadeInUp 0.8s ease-in-out;
}

.hero-subtext {
  font-size: 1rem;
  max-width: 600px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .top-black-bar {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .right-section {
    flex-direction: column;
  }

  .center-section {
    position: static;
    transform: none;
    margin-bottom: 0.5rem;
  }
}
</style>
