<script setup>
import { computed } from "vue";
import { useHeaderStore } from "@/stores/headerStore";

const headerStore = useHeaderStore();

const title = computed(() => headerStore.title);
</script>

<template>

  <!-- Do something where its like... if its not dashboard, show title,
   if its dashboard, do not show title -->
  <header class="header">
    <h1 v-if="title != 'Dashboard'">{{ title }}</h1>

    <div class="search-bar">
      <svg class="search-icon" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" stroke="black" stroke-width="1.5" fill="none" />
        <line x1="16" y1="16" x2="22" y2="22" stroke="black" stroke-width="1.5" />
      </svg>
      <input type="text" placeholder="Search..." />
    </div>


    <!-- Wrapping both icons in a flex container -->
    <div class="icon-wrapper">
      <!-- Message Icon -->
      <div class="icon-container">
        <svg viewBox="0 0 24 24">
          <path d="M4 4h16v12H4z" />
          <path d="M4 4l8 6 8-6" />
        </svg>
        <div class="notification-badge">50</div>
      </div>

      <!-- Bell Notification Icon -->
      <div class="icon-container">
        <svg viewBox="0 0 24 24">
          <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2z" />
          <path d="M18 16V10a6 6 0 1 0-12 0v6l-2 2h16l-2-2z" />
        </svg>
        <div class="notification-badge">99+</div>
      </div>
    </div>

    <!-- Profile Section -->
    <div class="profile-section">
      <img class="profile-image"
        src="https://res.cloudinary.com/dnuhjsckk/image/upload/v1739408381/Screenshot_2025-02-13_015617_mhjgby.png"
        alt="Profile" />
      <span class="profile-name">John Doe</span>
      <svg class="dropdown-icon" viewBox="0 0 24 24">
        <path d="M7 10l5 5 5-5z" />
      </svg>
    </div>

    <!-- <div class="actions">
      <button>🔔 Notifications</button>
      <button>⚙️ Settings</button>
    </div> -->
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: white;
  border-bottom: 1px solid #ddd;
  position: sticky;
  top: 0;
  z-index: 1000;
  /* Ensure it stays on top */
}

h1 {
  font-size: 24px;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #EAE8E8;
  /* No background */
  border-radius: 6px;
  /* Rounded corners */
  padding: 10px 16px;
  width: 320px;
  transition: border 0.2s ease-in-out;
}

/* Apply stroke to the search bar container when focused */
.search-bar:focus-within {
  border: 1.5px solid rgba(0, 102, 255, 0.3);
  /* Soft, light blue */
}

/* Input field: No background, no border */
input {
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  /* Take remaining space */
  font-size: 14px;
}

/* SVG Search Icon (Stroke only, no fill) */
.search-icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.actions button {
  margin-left: 10px;
  background: none;
  border: none;
  cursor: pointer;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
  /* Adjust this value to bring them closer */
}

.icon-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  /* Adjust for better spacing */
  height: 36px;
  background: #f0f0f0;
  /* Light grey background */
  border-radius: 50%;
}

.icon-container svg {
  width: 24px;
  /* Adjust size */
  height: 24px;
  stroke: rgb(51, 51, 51);
  fill: none;
  stroke-width: 1;
}

.notification-badge {
  position: absolute;
  top: -4px;
  /* Moves closer */
  right: -4px;
  /* Moves closer */
  min-width: 16px;
  height: 16px;
  background: red;
  color: white;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  line-height: 16px;
  padding: 0 5px;
  border-radius: 10px;
}


/* Profile side */
.profile-section {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.profile-image {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-name {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.dropdown-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.notification-badge {
  position: absolute;
  top: -4px;
  /* Move it slightly up */
  right: -4px;
  /* Move it closer to the icon */
  background-color: red;
  color: white;
  font-size: 10px;
  font-weight: bold;
  width: auto;
  min-width: 16px;
  /* Ensure it adapts to numbers like 99+ */
  height: 16px;
  padding: 2px 5px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
</style>
