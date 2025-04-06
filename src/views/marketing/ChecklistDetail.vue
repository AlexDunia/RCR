<template>
  <div class="checklist-detail">
    <!-- Admin View Banner (only visible to admins) -->
    <div v-if="isAdmin && !isOwner" class="admin-view-banner">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="admin-icon">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
      <div class="admin-view-message">
        <strong>Admin View Mode</strong>
        <span>You are viewing this checklist as an administrator. Changes are disabled.</span>
      </div>
    </div>

    <!-- Debug info - you can remove this in production -->
    <div class="debug-info" style="background: #f0f0f0; padding: 10px; margin-bottom: 10px; font-family: monospace;">
      <p>Route ID: {{ route.params.id }}</p>
      <p>Checklist loaded: {{ checklist !== null }}</p>
      <p>Checklist ID: {{ checklist?.id }}</p>
      <p>User Role: {{ roleStore.currentRole }}</p>
      <p>Can Edit: {{ canEdit }}</p>
      <p>Can Modify Items: {{ canModifyItems }}</p>
    </div>

    <div class="header">
      <button class="back-btn" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="icon">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        {{ isAdmin ? 'Back to Checklist Overview' : 'Back to Checklists' }}
      </button>
      <div class="actions" v-if="checklist && canEdit">
        <button class="edit-btn" @click="editChecklist" v-if="!checklist.completed && !isAdmin">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="icon">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
          Edit
        </button>
        <button class="delete-btn" @click="deleteChecklist" v-if="!isAdmin">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="icon">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          Delete
        </button>
      </div>
    </div>

    <div v-if="checklist" class="content">
      <div class="checklist-header">
        <h1>{{ checklist.title }}</h1>
        <div class="meta">
          <span class="date">Created: {{ formatDate(checklist.creationDate) }}</span>
          <span
            class="status-badge"
            :class="checklist.status"
          >
            {{ checklist.status }}
          </span>
          <span
            v-if="isOverdue(checklist)"
            class="status-badge overdue"
          >
            Overdue
          </span>

          <!-- Add creator badge if available -->
          <div v-if="checklist.creator" class="creator-badge">
            <span class="creator-label">Created by:</span>
            <span class="creator-name">{{ checklist.creator.name }}</span>
            <span class="creator-role" :class="checklist.creator.role">{{ checklist.creator.role }}</span>
          </div>
        </div>
      </div>

      <div class="progress-section" v-if="!checklist.completed">
        <div class="progress-info">
          <span class="progress-text">{{ checklist.progress }}% Complete</span>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: checklist.progress + '%' }"></div>
          </div>
        </div>
        <div v-if="checklist.dueDate" class="due-date">
          Due: {{ formatDate(checklist.dueDate) }}
          <span v-if="isOverdue(checklist)" class="overdue-text">
            ({{ getDaysOverdue(checklist) }} days overdue)
          </span>
        </div>
      </div>

      <!-- Show plan information if this is a converted plan -->
      <div v-if="checklist.convertedFromPlan" class="converted-plan-info">
        <div class="plan-badge">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="plan-icon">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <span>Converted from Marketing Plan:</span>
          <a @click.prevent="viewOriginalPlan" class="plan-link">{{ checklist.convertedFromPlan.title }}</a>
        </div>
      </div>

      <div class="items-section">
        <h2>Checklist Items</h2>
        <div class="items-list">
          <div
            v-for="(item, index) in checklist.items"
            :key="index"
            class="checklist-item"
            :class="{ completed: item.completed }"
          >
            <div class="item-content">
              <input
                type="checkbox"
                :checked="item.completed"
                @change="toggleItem(index)"
                :disabled="checklist.completed || !canModifyItems"
              >
              <span class="item-text">{{ item.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="not-found-icon">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 21a9 9 0 110-18 9 9 0 010 18z" />
      </svg>
      <h2>Checklist Not Found</h2>
      <p>The checklist you're looking for doesn't exist or has been deleted.</p>
      <button class="back-btn" @click="goBack">Return to Checklists</button>
    </div>

    <button @click="saveEdit" class="btn-save" v-if="canModifyItems">Save Changes</button>

    <ConfirmationModal
      v-model="showModal"
      :title="modalConfig.title"
      :message="modalConfig.message"
      :type="modalConfig.type"
      :confirm-text="modalConfig.confirmText"
      @confirm="handleSaveConfirm"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ConfirmationModal from '@/ui/ConfirmationModal.vue';
import { useMarketingStore } from '@/stores/marketingStore';
import { useRoleStore } from '@/stores/roleStore';

const router = useRouter();
const route = useRoute();
const marketingStore = useMarketingStore();
const roleStore = useRoleStore();
const checklist = ref(null);
const showModal = ref(false);
const modalConfig = ref({
  title: '',
  message: '',
  type: '',
  confirmText: ''
});

// Check if current user is an admin (for read-only mode)
const isAdmin = computed(() => roleStore.currentRole === 'admin');

// Check if the current user is the owner of the checklist
const isOwner = computed(() => {
  if (!checklist.value || !checklist.value.creator) return false;
  return checklist.value.creator.name === roleStore.getCurrentUser().name;
});

// Determine if the user can edit this checklist
const canEdit = computed(() => {
  // If user is the creator or if they're an admin, they can view
  return isOwner.value || isAdmin.value;
});

// Determine if the user can modify checklist items (only owner, not admin)
const canModifyItems = computed(() => {
  return isOwner.value && !checklist.value?.completed;
});

onMounted(async () => {
  console.log('Component mounted, loading checklist...');
  await loadChecklist();
});

const loadChecklist = async () => {
  try {
    // Fetch checklists from the store
    await marketingStore.checklists.fetchChecklists();
    console.log('All checklists:', marketingStore.checklists.marketingChecklists);
    console.log('Current route ID:', route.params.id);

    // Find the checklist with matching ID
    const found = marketingStore.checklists.marketingChecklists.find(c => String(c.id) === String(route.params.id));
    console.log('Found checklist:', found);

    if (found) {
      checklist.value = found;
      console.log('Checklist loaded successfully');
    } else {
      console.warn('Checklist not found');
      checklist.value = null;
    }
  } catch (error) {
    console.error('Error loading checklist:', error);
    checklist.value = null;
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const isOverdue = (checklist) => {
  if (!checklist.dueDate) return false;
  return new Date(checklist.dueDate) < new Date();
};

const getDaysOverdue = (checklist) => {
  if (!checklist.dueDate) return 0;
  const diff = new Date() - new Date(checklist.dueDate);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

const toggleItem = async (index) => {
  // Only allow toggling if user can modify (not admin in view mode)
  if (!checklist.value || checklist.value.completed || !canModifyItems.value) return;

  // Toggle the item's completed status directly
  checklist.value.items[index].completed = !checklist.value.items[index].completed;

  // Update progress
  const completedItems = checklist.value.items.filter(item => item.completed).length;
  checklist.value.progress = Math.round((completedItems / checklist.value.items.length) * 100);

  // Update checklist status based on progress
  const wasAlreadyCompleted = checklist.value.status === 'completed';
  if (checklist.value.progress === 100) {
    checklist.value.status = 'completed';

    // If this is a conversion from a marketing plan and was just completed
    if (!wasAlreadyCompleted && checklist.value.convertedFromPlan) {
      // Update the marketing plan status to Completed
      await updateOriginalPlanStatus('Completed');
    }
  } else {
    checklist.value.status = 'draft';

    // If this was previously completed and now is not, update the marketing plan status
    if (wasAlreadyCompleted && checklist.value.convertedFromPlan) {
      // Update the marketing plan status to Active
      await updateOriginalPlanStatus('Active');
    }
  }

  // Save the checklist with updated status
  await saveEdit();
};

// Helper function to update the status of the original marketing plan
const updateOriginalPlanStatus = async (newStatus) => {
  if (!checklist.value.convertedFromPlan) return;

  try {
    // Get plan ID from the checklist
    const planId = checklist.value.convertedFromPlan.id;

    // Fetch marketing plans
    const plans = marketingStore.plans.marketingPlans;

    // Find the original plan by ID
    const planIndex = plans.findIndex(p => String(p.index) === String(planId));

    if (planIndex !== -1) {
      // Update the plan status
      plans[planIndex].status = newStatus;

      // Save the updated plans to localStorage
      localStorage.setItem('marketingPlans', JSON.stringify(plans));

      console.log(`Original marketing plan status updated to ${newStatus}`);
    } else {
      console.warn('Original marketing plan not found');
    }
  } catch (error) {
    console.error('Error updating original plan status:', error);
  }
};

const goBack = () => {
  showModal.value = true;
  modalConfig.value = {
    title: 'Leave Checklist',
    message: 'Do you want to return to the checklist list?',
    type: 'default',
    confirmText: 'Leave',
    onConfirm: () => {
      // Redirect based on user role
      if (isAdmin.value) {
        router.push('/marketing-tools/admin-checklists');
      } else {
        router.push('/marketing-tools/checklist');
      }
    }
  };
};

const editChecklist = () => {
  router.push(`/marketing-tools/checklist/${checklist.value.id}/edit`);
};

const deleteChecklist = () => {
  showModal.value = true;
  modalConfig.value = {
    title: 'Delete Checklist',
    message: 'Are you sure you want to delete this checklist? This action cannot be undone.',
    type: 'danger',
    confirmText: 'Delete',
    onConfirm: () => {
      try {
        // Get all checklists from the store
        const checklistsArray = marketingStore.checklists.marketingChecklists;

        // Filter out the current checklist
        const filteredChecklists = checklistsArray.filter(c => c.id !== checklist.value.id);

        // Save back to localStorage with the correct key
        localStorage.setItem('marketingChecklists', JSON.stringify(filteredChecklists));

        // Navigate back to the checklist list
        router.push('/marketing-tools/checklist');
      } catch (error) {
        console.error('Error deleting checklist:', error);
      }
    }
  };
};

const saveEdit = async () => {
  if (!checklist.value) return;

  try {
    // Get all checklists from the store
    const checklistsArray = marketingStore.checklists.marketingChecklists;

    // Find the index of the current checklist
    const index = checklistsArray.findIndex(c => c.id === checklist.value.id);

    if (index !== -1) {
      // Update the checklist in the array
      checklistsArray[index] = {
        ...checklist.value,
        lastModified: new Date().toISOString()
      };

      // Save back to localStorage with the correct key
      localStorage.setItem('marketingChecklists', JSON.stringify(checklistsArray));

      console.log('Checklist saved successfully');
    }
  } catch (error) {
    console.error('Error saving checklist:', error);
  }
};

const handleSaveConfirm = async () => {
  try {
    // Save the checklist changes to local storage
    const checklists = JSON.parse(localStorage.getItem('checklists') || '[]');
    const index = checklists.findIndex(c => c.id === checklist.value.id);
    if (index !== -1) {
      checklists[index] = checklist.value;
      localStorage.setItem('checklists', JSON.stringify(checklists));
      showModal.value = false;
      router.push('/RCR/marketing-tools/checklist');
    }
  } catch (error) {
    console.error('Error saving checklist:', error);
  }
};

const viewOriginalPlan = () => {
  if (checklist.value && checklist.value.convertedFromPlan) {
    // Navigate to the original plan
    router.push(`/marketing-tools/plan/${checklist.value.convertedFromPlan.id}`);
  }
};
</script>

<style scoped>
.checklist-detail {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: none;
  border: 1px solid #E5E7EB;
  border-radius: 0.375rem;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: #F3F4F6;
}

.actions {
  display: flex;
  gap: 1rem;
}

.edit-btn,
.delete-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.edit-btn {
  background: #BFDBFE;
  color: #2563EB;
  border: none;
}

.delete-btn {
  background: #FEE2E2;
  color: #EF4444;
  border: none;
}

.edit-btn:hover {
  background: #93C5FD;
}

.delete-btn:hover {
  background: #FCA5A5;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
}

.content {
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.checklist-header {
  margin-bottom: 2rem;
}

.checklist-header h1 {
  font-size: 1.875rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.date {
  color: #6B7280;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: capitalize;
}

.status-badge.draft {
  background: #EFF6FF;
  color: #2563EB;
}

.status-badge.completed {
  background: #ECFDF5;
  color: #059669;
}

.status-badge.overdue {
  background: #FEE2E2;
  color: #EF4444;
}

.progress-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #F9FAFB;
  border-radius: 0.5rem;
}

.progress-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-text {
  font-size: 1.125rem;
  font-weight: 500;
  color: #059669;
}

.progress-bar {
  height: 0.5rem;
  background: #E5E7EB;
  border-radius: 0.25rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #059669;
  transition: width 0.3s ease;
}

.due-date {
  margin-top: 1rem;
  color: #6B7280;
}

.overdue-text {
  color: #EF4444;
  font-weight: 500;
}

.items-section {
  margin-top: 2rem;
}

.items-section h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.checklist-item {
  padding: 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.checklist-item:hover {
  background: #F9FAFB;
}

.checklist-item.completed {
  background: #F9FAFB;
  border-color: #D1D5DB;
}

.item-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.item-text {
  color: #374151;
}

.completed .item-text {
  color: #9CA3AF;
  text-decoration: line-through;
}

.not-found {
  text-align: center;
  padding: 4rem 2rem;
  background: #F9FAFB;
  border-radius: 0.75rem;
}

.not-found-icon {
  width: 4rem;
  height: 4rem;
  color: #9CA3AF;
  margin-bottom: 1.5rem;
}

.not-found h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.not-found p {
  color: #6B7280;
  margin-bottom: 1.5rem;
}

.btn-save {
  display: block;
  margin-top: 2rem;
  padding: 0.75rem 1rem;
  background: #2563EB;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-save:hover {
  background: #1E40AF;
}

@media (max-width: 640px) {
  .checklist-detail {
    padding: 1rem;
  }

  .header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .actions {
    justify-content: stretch;
  }

  .edit-btn,
  .delete-btn {
    flex: 1;
    justify-content: center;
  }
}

/* Add these styles to your existing CSS */
.creator-badge {
  display: inline-flex;
  align-items: center;
  background-color: #f3f4f6;
  padding: 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  margin-left: 0.5rem;
}

.creator-label {
  color: #6b7280;
  margin-right: 0.5rem;
}

.creator-name {
  font-weight: 500;
  margin-right: 0.5rem;
}

.creator-role {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.creator-role.admin {
  background-color: #374151;
  color: white;
}

.creator-role.agent {
  background-color: #2563eb;
  color: white;
}

/* Add new styles for admin view mode */
.admin-view-banner {
  background-color: #fdf2f8;
  border-left: 4px solid #db2777;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 0.375rem;
}

.admin-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #db2777;
  flex-shrink: 0;
}

.admin-view-message {
  display: flex;
  flex-direction: column;
}

.admin-view-message strong {
  color: #db2777;
  margin-bottom: 0.25rem;
}

.admin-view-message span {
  color: #9d174d;
  font-size: 0.875rem;
}

.converted-plan-info {
  background-color: #f0f9ff;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1.5rem 0;
}

.plan-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #0369a1;
  font-size: 0.9rem;
}

.plan-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #0284c7;
}

.plan-link {
  color: #0284c7;
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
}

.plan-link:hover {
  color: #0369a1;
}

/* Style for checkbox in read-only mode */
input[type="checkbox"]:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Style for the creator badge */
.creator-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f8fafc;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.creator-label {
  color: #64748b;
}

.creator-name {
  font-weight: 500;
  color: #334155;
}

.creator-role {
  display: inline-block;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-weight: 500;
  font-size: 0.7rem;
  text-transform: uppercase;
}

.creator-role.admin {
  background-color: #fee2e2;
  color: #b91c1c;
}

.creator-role.agent {
  background-color: #e0f2fe;
  color: #0369a1;
}

.creator-role.client {
  background-color: #f0fdf4;
  color: #166534;
}
</style>
