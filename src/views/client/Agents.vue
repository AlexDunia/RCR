<template>
  <div class="client-agents">
    <h1>Find a Real Estate Agent</h1>
    <div class="search-bar">
      <input type="text" placeholder="Search agents by name, specialty, or location..." />
      <button class="search-btn">Search</button>
    </div>

    <div class="agents-grid">
      <div v-for="(agent, index) in agents" :key="index" class="agent-card">
        <div class="agent-image" :style="{ backgroundImage: `url(${agent.photo})` }"></div>
        <div class="agent-details">
          <h2 class="agent-name">{{ agent.name }}</h2>
          <p class="agent-title">{{ agent.title }}</p>
          <div class="agent-stats">
            <div class="stat">
              <span class="stat-value">{{ agent.listings }}</span>
              <span class="stat-label">Listings</span>
            </div>
            <div class="stat">
              <span class="stat-value">{{ agent.experience }}</span>
              <span class="stat-label">Years Exp.</span>
            </div>
            <div class="stat">
              <span class="stat-value">{{ agent.rating }}/5</span>
              <span class="stat-label">Rating</span>
            </div>
          </div>
          <p class="agent-bio">{{ agent.bio }}</p>
          <div class="agent-actions">
            <router-link :to="`/client/agents/${agent.id}`" class="view-profile-btn">View Profile</router-link>
            <button class="contact-btn">Contact Agent</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, defineComponent } from 'vue';

// Define component name
defineComponent({
  name: 'ClientAgents'
});

// Sample agents data
const agents = reactive([
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Senior Real Estate Agent',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    listings: 24,
    experience: 8,
    rating: 4.9,
    bio: 'Specializing in luxury properties and waterfront homes. Sarah has helped over 100 families find their dream homes in the past 8 years.'
  },
  {
    id: 2,
    name: 'Michael Roberts',
    title: 'Luxury Property Specialist',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    listings: 18,
    experience: 12,
    rating: 4.7,
    bio: 'With over a decade of experience in the luxury real estate market, Michael specializes in high-end properties and investment opportunities.'
  },
  {
    id: 3,
    name: 'Jennifer Martinez',
    title: 'First-time Homebuyer Specialist',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    listings: 15,
    experience: 5,
    rating: 4.8,
    bio: 'Jennifer is passionate about helping first-time homebuyers navigate the complex process of purchasing their first property with confidence.'
  }
]);
</script>

<style scoped>
.client-agents {
  padding: 24px;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #2c3e50;
}

.search-bar {
  display: flex;
  margin-bottom: 30px;
}

.search-bar input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

.search-btn {
  padding: 12px 24px;
  background-color: #006064;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-btn:hover {
  background-color: #00474a;
}

.agents-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

.agent-card {
  display: flex;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.agent-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
}

.agent-image {
  width: 200px;
  background-size: cover;
  background-position: center;
}

.agent-details {
  flex: 1;
  padding: 24px;
}

.agent-name {
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #2c3e50;
}

.agent-title {
  font-size: 16px;
  color: #666;
  margin: 0 0 16px 0;
}

.agent-stats {
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 20px;
  font-weight: 600;
  color: #006064;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.agent-bio {
  font-size: 15px;
  line-height: 1.5;
  color: #4a4a4a;
  margin-bottom: 24px;
}

.agent-actions {
  display: flex;
  gap: 12px;
}

.view-profile-btn, .contact-btn {
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.view-profile-btn {
  background-color: white;
  border: 1px solid #006064;
  color: #006064;
  text-decoration: none;
}

.view-profile-btn:hover {
  background-color: #f0f7f7;
}

.contact-btn {
  background-color: #006064;
  border: none;
  color: white;
}

.contact-btn:hover {
  background-color: #00474a;
}

@media (max-width: 768px) {
  .agent-card {
    flex-direction: column;
  }

  .agent-image {
    width: 100%;
    height: 200px;
  }
}
</style>
