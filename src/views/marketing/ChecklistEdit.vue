<template>
  <div class="checklist-edit">
    <div v-if="checklist" class="form-container">
      <h1>Edit Checklist</h1>

      <form @submit.prevent="handleSave" class="edit-form">
        <div class="form-group">
          <label for="title">Checklist Title</label>
          <input
            type="text"
            id="title"
            v-model="checklist.title"
            placeholder="Enter checklist title"
            required
          >
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="checklist.description"
            placeholder="Enter checklist description"
            rows="4"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="dueDate">Due Date</label>
          <input
            type="datetime-local"
            id="dueDate"
            v-model="checklist.dueDate"
          >
        </div>

        <div class="status-group">
          <label>Status</label>
          <div class="status-options">
            <label class="status-option">
              <input
                type="radio"
                v-model="checklist.status"
                value="draft"
              >
              <span class="status-label draft">Draft</span>
            </label>
            <label class="status-option">
              <input
                type="radio"
                v-model="checklist.status"
                value="completed"
              >
              <span class="status-label completed">Completed</span>
            </label>
          </div>
        </div>

        <div class="items-section">
          <h2>Checklist Items</h2>
          <div
            v-for="(item, index) in checklist.items"
            :key="index"
            class="checklist-item"
          >
            <div class="item-content">
              <label class="checkbox-container">
                <input
                  type="checkbox"
                  v-model="item.completed"
                >
                <span class="checkmark"></span>
              </label>
              <input
                type="text"
                v-model="item.text"
                placeholder="Enter item description"
                required
              >
              <button
                type="button"
                class="remove-item"
                @click="removeItem(index)"
                aria-label="Remove item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <button
            type="button"
            class="add-item"
            @click="addItem"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Item
          </button>
        </div>

        <div class="danger-zone">
          <h2>Danger Zone</h2>
          <button
            type="button"
            class="delete-btn"
            @click="deleteChecklist"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete Checklist
          </button>
        </div>

        <div class="form-actions">
          <button
            type="button"
            class="cancel-btn"
            @click="cancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="save-btn"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>

    <div v-else class="not-found">
      <svg xmlns="http://www.w3.org/2000/svg" class="not-found-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2>Checklist Not Found</h2>
      <p>The checklist you're trying to edit doesn't exist or has been deleted.</p>
      <button @click="goBack" class="back-btn">Return to Checklists</button>
    </div>

    <ConfirmationModal
      v-model="showSaveModal"
      title="Save Changes"
      message="Do you want to save your changes to this checklist?"
      type="update"
      confirm-text="Save"
      @confirm="saveChecklist"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ConfirmationModal from '@/ui/ConfirmationModal.vue';
import { useMarketingStore } from '@/stores/marketingStore';

const router = useRouter();
const route = useRoute();
const checklist = ref(null);
const originalChecklist = ref(null);
const showSaveModal = ref(false);
const showModal = ref(false);
const modalConfig = ref({
  title: '',
  message: '',
  type: '',
  confirmText: '',
  onConfirm: null
});

const marketingStore = useMarketingStore();

onMounted(async () => {
  try {
    // Use the marketing store to fetch the checklist
    await marketingStore.checklists.fetchChecklists();
    const existingChecklist = marketingStore.checklists.marketingChecklists.find(c => c.id === route.params.id);

    if (existingChecklist) {
      checklist.value = { ...existingChecklist };
      originalChecklist.value = JSON.stringify(existingChecklist);
    }
  } catch (error) {
    console.error('Error loading checklist:', error);
  }
});

const hasChanges = () => {
  return originalChecklist.value !== JSON.stringify(checklist.value);
};

const addItem = () => {
  checklist.value.items.push({ text: '', completed: false });
};

const removeItem = (index) => {
  checklist.value.items.splice(index, 1);
  if (checklist.value.items.length === 0) {
    addItem();
  }
};

const handleSave = (e) => {
  e.preventDefault();
  if (hasChanges()) {
    showSaveModal.value = true;
  } else {
    router.push(`/RCR/marketing-tools/checklist/${checklist.value.id}`);
  }
};

const saveChecklist = () => {
  try {
    // Find and update the checklist in the store
    const checklistsArray = marketingStore.checklists.marketingChecklists;
    const index = checklistsArray.findIndex(c => c.id === checklist.value.id);

    if (index !== -1) {
      // Update existing checklist
      const updatedChecklist = {
        ...checklist.value,
        items: checklist.value.items.filter(item => item.text.trim() !== ''),
        lastModified: new Date().toISOString() // Add last modified timestamp
      };

      // Update the checklist in the array
      checklistsArray[index] = updatedChecklist;

      // Save back to localStorage with the correct key
      localStorage.setItem('marketingChecklists', JSON.stringify(checklistsArray));

      // Update the route
      router.push('/marketing-tools/checklist');
    }
  } catch (error) {
    console.error('Error saving checklist:', error);
  }
};

const deleteChecklist = async () => {
  showModal.value = true;
  modalConfig.value = {
    title: 'Delete Checklist',
    message: 'Are you sure you want to delete this checklist? This action cannot be undone.',
    type: 'delete',
    confirmText: 'Delete',
    onConfirm: () => {
      try {
        // Find and filter out the checklist
        const checklistsArray = marketingStore.checklists.marketingChecklists;
        const filteredChecklists = checklistsArray.filter(c => c.id !== checklist.value.id);

        // Save back to localStorage with the correct key
        localStorage.setItem('marketingChecklists', JSON.stringify(filteredChecklists));

        // Update the route
        router.push('/marketing-tools/checklist');
      } catch (error) {
        console.error('Error deleting checklist:', error);
      }
    }
  };
};

const cancel = () => {
  if (hasChanges()) {
    showModal.value = true;
    modalConfig.value = {
      title: 'Discard Changes',
      message: 'Are you sure you want to discard your changes?',
      type: 'warning',
      confirmText: 'Discard',
      onConfirm: () => {
        router.push(`/marketing-tools/checklist/${checklist.value.id}`);
      }
    };
  } else {
    router.push(`/marketing-tools/checklist/${checklist.value.id}`);
  }
};

const goBack = () => {
  router.push('/marketing-tools/checklist');
};
</script>

<style scoped>
.checklist-edit {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.form-container {
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 1.875rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 2rem;
  text-align: center;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 500;
  color: #374151;
}

input[type="text"],
input[type="datetime-local"],
textarea {
  padding: 0.75rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: all 0.2s ease;
}

input[type="text"]:focus,
input[type="datetime-local"]:focus,
textarea:focus {
  outline: none;
  border-color: #2563EB;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.status-group {
  margin-bottom: 1rem;
}

.status-options {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.status-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.status-option input[type="radio"] {
  display: none;
}

.status-label {
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.status-label.draft {
  background: #FEF3C7;
  color: #D97706;
}

.status-label.completed {
  background: #D1FAE5;
  color: #059669;
}

.status-option input[type="radio"]:checked + .status-label {
  box-shadow: 0 0 0 2px currentColor;
}

.items-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.checklist-item {
  margin-bottom: 0.5rem;
}

.item-content {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.checkbox-container {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  height: 1.5rem;
  width: 1.5rem;
  background-color: #fff;
  border: 2px solid #E5E7EB;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.checkbox-container:hover .checkmark {
  border-color: #2563EB;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: #2563EB;
  border-color: #2563EB;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 0.5rem;
  top: 0.25rem;
  width: 0.25rem;
  height: 0.5rem;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.remove-item {
  background: #FEE2E2;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.remove-item:hover {
  background: #FCA5A5;
}

.remove-item svg {
  width: 1.25rem;
  height: 1.25rem;
  color: #EF4444;
}

.add-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #EFF6FF;
  border: 1px dashed #2563EB;
  border-radius: 0.375rem;
  color: #2563EB;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: fit-content;
}

.add-item:hover {
  background: #DBEAFE;
}

.add-item svg {
  width: 1.25rem;
  height: 1.25rem;
}

.danger-zone {
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px dashed #EF4444;
  border-radius: 0.5rem;
  background: #FEF2F2;
}

.danger-zone h2 {
  color: #B91C1C;
  margin-bottom: 1rem;
}

.delete-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #EF4444;
  border: none;
  border-radius: 0.375rem;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.delete-btn:hover {
  background: #DC2626;
}

.delete-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.cancel-btn,
.save-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-btn {
  background: white;
  border: 1px solid #E5E7EB;
  color: #6B7280;
}

.cancel-btn:hover {
  background: #F3F4F6;
}

.save-btn {
  background: #2563EB;
  border: none;
  color: white;
}

.save-btn:hover {
  background: #1D4ED8;
}

.not-found {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.not-found-icon {
  width: 4rem;
  height: 4rem;
  color: #6B7280;
  margin-bottom: 1.5rem;
}

.not-found h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.not-found p {
  color: #6B7280;
  margin-bottom: 2rem;
}

@media (max-width: 640px) {
  .checklist-edit {
    padding: 1rem;
  }

  .form-container {
    padding: 1.5rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .cancel-btn,
  .save-btn {
    width: 100%;
  }

  .status-options {
    flex-direction: column;
  }
}
</style>
