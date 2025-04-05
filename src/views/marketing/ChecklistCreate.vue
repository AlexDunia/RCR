<template>
  <div class="checklist-create">
    <div class="form-container">
      <h1>Create New Checklist</h1>

      <form @submit.prevent="saveChecklist" class="create-form">
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
            :min="todayDate.replace(/T.*$/, 'T00:00')"
          >
        </div>

        <div class="items-section">
          <h2>Checklist Items</h2>
          <div
            v-for="(item, index) in checklist.items"
            :key="index"
            class="checklist-item"
          >
            <div class="item-content">
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
            Create Checklist
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDateValidation } from '@/composables/useDateValidation';
import { useMarketingStore } from '@/stores/marketingStore'; // Import the marketing store

const router = useRouter();
const marketingStore = useMarketingStore(); // Use the marketing store

const checklist = ref({
  title: '',
  description: '',
  dueDate: '',
  items: [{ text: '', completed: false }],
  status: 'draft',
  progress: 0,
  creationDate: new Date().toISOString(),
  completed: false
});

const { todayDate, isValidFutureDateTime } = useDateValidation()

const addItem = () => {
  checklist.value.items.push({ text: '', completed: false });
};

const removeItem = (index) => {
  checklist.value.items.splice(index, 1);
  if (checklist.value.items.length === 0) {
    addItem();
  }
};

const validateDueDate = () => {
  if (checklist.value.dueDate) {
    const [date, time] = checklist.value.dueDate.split('T')
    if (!isValidFutureDateTime(date, time)) {
      alert('Due date cannot be in the past')
      return false
    }
  }
  return true
}

const saveChecklist = async () => {
  if (!validateDueDate()) {
    return
  }

  try {
    // Log the current state before saving
    console.log('Current checklist to save:', checklist.value);

    // Create new checklist object with all required fields
    const newChecklist = {
      ...checklist.value,
      items: checklist.value.items
        .filter(item => item.text.trim() !== '')
        .map(item => ({
          text: item.text,
          completed: false
        })),
      creationDate: new Date().toISOString(),
      status: 'draft',
      progress: 0
    };

    // Use the marketing store to save the checklist
    await marketingStore.checklists.saveChecklist(newChecklist);
    console.log('Checklist saved successfully using marketingStore');

    // Navigate back to checklist list
    router.push('/marketing-tools/checklist');
  } catch (error) {
    console.error('Error saving checklist:', error);
    alert('There was an error saving your checklist. Please try again.');
  }
};

const cancel = () => {
  router.push('/marketing-tools/checklist');
};
</script>

<style scoped>
.checklist-create {
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

.create-form {
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

@media (max-width: 640px) {
  .checklist-create {
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
}
</style>
