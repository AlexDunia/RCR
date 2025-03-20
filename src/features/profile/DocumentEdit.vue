<!-- src/features/profile/DocumentEdit.vue -->
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const documentId = route.params.id;
const document = ref(null);
const isLoading = ref(true);
const error = ref(null);
const isSaving = ref(false);

onMounted(async () => {
  try {
    // In a real app, you'd fetch the document by ID from an API
    // For now we're using mock data

    // Simulate API call with timeout
    setTimeout(() => {
      document.value = {
        id: documentId,
        title: 'Buyer Representation Agreement',
        description: 'Agreement between agent and buyer for representation in real estate transactions',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget fermentum aliquam, nisl nisl aliquet nisl, eget egestas nisl nisl eget nisl.',
        status: 'Draft',
        date: '2023-04-12',
        tags: ['buyer', 'representation', 'agreement']
      };
      isLoading.value = false;
    }, 500);
  } catch (err) {
    console.error(`Failed to load document with ID ${documentId}:`, err);
    error.value = 'Failed to load document. Please try again.';
    isLoading.value = false;
  }
});

const saveDocument = async () => {
  try {
    isSaving.value = true;

    // In a real app, you'd save the document to an API
    // await updateDocument(documentId, document.value);

    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 800));

    // Navigate back to documents list
    router.push('/profile/documents');
  } catch (err) {
    console.error('Failed to save document:', err);
    error.value = 'Failed to save document. Please try again.';
  } finally {
    isSaving.value = false;
  }
};

const cancelEdit = () => {
  router.push('/profile/documents');
};
</script>

<template>
  <div class="document-edit">
    <h2>Edit Document</h2>

    <div v-if="isLoading" class="loading-state">
      Loading document...
    </div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <form v-else @submit.prevent="saveDocument" class="document-form">
      <div class="form-group">
        <label for="title">Document Title</label>
        <input
          id="title"
          v-model="document.title"
          type="text"
          required
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="document.description"
          rows="2"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="content">Content</label>
        <textarea
          id="content"
          v-model="document.content"
          rows="10"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="status">Status</label>
        <select id="status" v-model="document.status">
          <option value="Draft">Draft</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div class="form-group">
        <label for="tags">Tags (comma separated)</label>
        <input
          id="tags"
          :value="document.tags.join(', ')"
          @input="e => document.tags = e.target.value.split(',').map(tag => tag.trim())"
          type="text"
        />
      </div>

      <div class="form-actions">
        <button type="button" class="cancel-button" @click="cancelEdit">Cancel</button>
        <button type="submit" class="save-button" :disabled="isSaving">
          {{ isSaving ? 'Saving...' : 'Save Document' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.document-edit {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading-state, .error-message {
  padding: 20px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin: 20px 0;
}

.error-message {
  color: #e53935;
  background-color: #ffebee;
}

.document-form {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #555;
  font-size: 14px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
}

.form-group textarea {
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.cancel-button {
  padding: 10px 20px;
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.save-button {
  padding: 10px 20px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.save-button:hover {
  background-color: #1565c0;
}

.save-button:disabled {
  background-color: #90caf9;
  cursor: not-allowed;
}
</style>
