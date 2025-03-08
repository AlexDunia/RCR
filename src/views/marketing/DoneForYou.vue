<template>
  <div class="done-for-you-container">
    <div class="marketing-tools-header">
      <h1 class="marketing-tools-title">Done for You</h1>
      <p class="marketing-tools-subtitle">Access our pre-made templates and automated solutions for quick implementation.</p>
    </div>

    <div class="marketing-tabs">
      <button
        v-for="(info, key) in ['success', 'checklist', 'done', 'social']"
        :key="key"
        :class="['marketing-tab', { active: currentTab === key }]"
        @click="handleTabChange(key)"
      >
        {{ getTabTitle(key) }}
      </button>
    </div>

    <!-- Done For You content will go here -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTab = ref('done');

const getTabTitle = (key) => {
  const titles = {
    success: 'Success Plan',
    checklist: 'My Checklist',
    done: 'Done for You',
    social: 'Social Platforms'
  };
  return titles[key];
};

const handleTabChange = (key) => {
  currentTab.value = key;
  switch (key) {
    case 'success':
      router.push('/RCR/marketing-tools/success-plan');
      break;
    case 'checklist':
      router.push('/RCR/marketing-tools/checklist');
      break;
    case 'done':
      router.push('/RCR/marketing-tools/done-for-you');
      break;
    case 'social':
      router.push('/RCR/marketing-tools/social-platforms');
      break;
  }
};
</script>

<style scoped>
.done-for-you-container {
  padding: 2rem;
}

.marketing-tools-header {
  margin-bottom: 2rem;
  padding: 2rem 0;
  border-bottom: 1px solid #E5E7EB;
}

.marketing-tools-title {
  font-size: 2rem;
  font-weight: 600;
  color: #1E3A8A;
  margin-bottom: 0.75rem;
}

.marketing-tools-subtitle {
  font-size: 1.125rem;
  color: #6B7280;
  max-width: 600px;
}

.marketing-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.marketing-tab {
  padding: 0.75rem 1.5rem;
  border: none;
  background: transparent;
  color: #6B7280;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.marketing-tab.active {
  color: #2563EB;
  border-bottom: 2px solid #2563EB;
}
</style>
