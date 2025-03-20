<template>
  <div class="listings-container">
    <!-- Tab Navigation -->
    <div class="tab-navigation">
      <router-link to="/add-listing" class="tab-link">
        <span class="icon">+</span> Add Listing
      </router-link>

      <router-link to="/view-listings" class="tab-link active">
        <span class="icon">🏠</span> View Listings
      </router-link>

      <router-link to="/pending-approvals" class="tab-link">
        <span class="icon">⏱️</span> Pending Approvals
      </router-link>

      <router-link to="/drafts" class="tab-link">
        <span class="icon">📄</span> Drafts
      </router-link>
    </div>

    <div class="tab-indicator"></div>

    <!-- Content Area -->
    <div class="content-area">
      <div class="header">
        <div>
          <h2>Your Properties</h2>
          <p>A list of all properties on your profile</p>
        </div>

        <div class="search">
          <input type="text" placeholder="Search..." />
          <span class="search-icon">🔍</span>
        </div>
      </div>

      <PropertyList />
    </div>
  </div>
</template>

<script setup>
import PropertyList from "@/features/agents/AgentPersonalListingsView.vue";
</script>

<style scoped>
.listings-container {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.tab-navigation {
  display: flex;
  gap: 16px;
  margin-bottom: 4px;
}

.tab-link {
  padding: 8px 16px;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  color: #6b7280;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.tab-link.active {
  background-color: #f3f4f6;
  color: #1d4ed8;
  border-color: #c7d2fe;
}

.tab-indicator {
  height: 1px;
  background-color: #e5e7eb;
  margin: 16px 0;
}

.content-area {
  margin-top: 24px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header h2 {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
}

.header p {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.search {
  position: relative;
  width: 300px;
}

.search input {
  width: 100%;
  padding: 8px 16px;
  padding-right: 40px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: #f9fafb;
  font-size: 14px;
}

.search-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}
</style>
