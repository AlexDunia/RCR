<template>
  <div class="marketing-tools">
    <MarketingHeader />
    <MarketingNavigation />
    <div class="content-area">
      <div class="success-plans" v-if="isSuccessPlanRoute">
        <div class="grid-container">
          <div v-for="(plan, index) in marketingPlans" :key="index" class="plan-card" @click="viewPlan(index)">
            <h3>{{ plan.title }}</h3>
            <p class="date">Created: {{ new Date(plan.creationDate).toLocaleDateString() }}</p>
            <p class="description">{{ plan.strategyOverview }}</p>
            <div class="card-footer">
              <span class="status" :class="plan.status.toLowerCase()">{{ plan.status }}</span>
              <button class="view-btn">View plan</button>
            </div>
          </div>
          <div class="plan-card add-new" @click="createNewPlan">
            <div class="add-content">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="add-icon">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <h3>Create New Plan</h3>
            </div>
          </div>
        </div>
      </div>
      <router-view v-else></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import MarketingHeader from '@/components/marketing/MarketingHeader.vue';
import MarketingNavigation from '@/components/marketing/MarketingNavigation.vue';

const router = useRouter();
const route = useRoute();
const marketingPlans = ref(JSON.parse(localStorage.getItem('marketingPlans') || '[]'));

const isSuccessPlanRoute = computed(() => {
  return route.path === '/marketing-tools';
});

const viewPlan = (index) => {
  router.push(`/marketing-tools/plan/${index}`);
};

const createNewPlan = () => {
  router.push('/marketing-tools/create');
};
</script>

<style scoped>
.marketing-tools {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.content-area {
  background: #FFFFFF;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.plan-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 0.75rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.plan-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.plan-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1E3A8A;
  margin-bottom: 0.5rem;
}

.date {
  font-size: 0.875rem;
  color: #6B7280;
  margin-bottom: 1rem;
}

.description {
  color: #4B5563;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.status.draft {
  background: #EFF6FF;
  color: #2563EB;
}

.status.active {
  background: #ECFDF5;
  color: #059669;
}

.status.archived {
  background: #F3F4F6;
  color: #6B7280;
}

.view-btn {
  background: none;
  border: none;
  color: #2563EB;
  font-weight: 500;
  cursor: pointer;
}

.add-new {
  border: 2px dashed #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.add-new:hover {
  border-color: #2563EB;
}

.add-content {
  text-align: center;
  color: #6B7280;
}

.add-icon {
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 1rem;
}

.add-new h3 {
  color: #6B7280;
}
</style>
