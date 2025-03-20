<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const documents = ref([]);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    // Simulate API call with timeout
    setTimeout(() => {
      documents.value = [
        {
          id: 1,
          title: 'Buyer Representation Agreement',
          type: 'PDF',
          status: 'Completed',
          date: '2023-04-12',
          size: '1.2 MB'
        },
        {
          id: 2,
          title: 'Seller Disclosure Form',
          type: 'PDF',
          status: 'Pending',
          date: '2023-04-10',
          size: '850 KB'
        },
        {
          id: 3,
          title: 'MLS Listing Agreement',
          type: 'DOCX',
          status: 'Draft',
          date: '2023-04-08',
          size: '620 KB'
        }
      ];
      isLoading.value = false;
    }, 500);
  } catch (err) {
    console.error('Failed to load documents:', err);
    error.value = 'Failed to load documents. Please try again.';
    isLoading.value = false;
  }
});

const viewDocument = (id) => {
  router.push(`/receipts-docs/document/${id}`);
};

const editDocument = (id) => {
  router.push(`/profile/documents/edit/${id}`);
};
</script>

<template>
  <div class="profile-documents">
    <h2>My Documents</h2>

    <div v-if="isLoading" class="loading-state">
      Loading your documents...
    </div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else-if="documents.length === 0" class="empty-documents">
      You don't have any documents yet.
    </div>

    <div v-else class="documents-table">
      <table>
        <thead>
          <tr>
            <th>Document</th>
            <th>Type</th>
            <th>Status</th>
            <th>Date</th>
            <th>Size</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doc in documents" :key="doc.id">
            <td>{{ doc.title }}</td>
            <td>{{ doc.type }}</td>
            <td>
              <span
                class="doc-status"
                :class="{
                  'completed': doc.status === 'Completed',
                  'pending': doc.status === 'Pending',
                  'draft': doc.status === 'Draft'
                }"
              >
                {{ doc.status }}
              </span>
            </td>
            <td>{{ doc.date }}</td>
            <td>{{ doc.size }}</td>
            <td class="actions">
              <button class="view-btn" @click="viewDocument(doc.id)">View</button>
              <button class="edit-btn" @click="editDocument(doc.id)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.profile-documents {
  padding: 20px;
}

.loading-state,
.error-message,
.empty-documents {
  padding: 20px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-top: 20px;
}

.error-message {
  color: #e53935;
  background-color: #ffebee;
}

.documents-table {
  margin-top: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f9f9f9;
  font-weight: 600;
  color: #333;
}

tr:last-child td {
  border-bottom: none;
}

tr:hover {
  background-color: #f5f5f5;
}

.doc-status {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.doc-status.completed {
  background-color: #e8f5e9;
  color: #4caf50;
}

.doc-status.pending {
  background-color: #fff8e1;
  color: #ff9800;
}

.doc-status.draft {
  background-color: #e3f2fd;
  color: #2196f3;
}

.actions {
  display: flex;
  gap: 8px;
}

.view-btn,
.edit-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  transition: background-color 0.2s;
}

.view-btn {
  background-color: #e3f2fd;
  color: #1976d2;
}

.view-btn:hover {
  background-color: #bbdefb;
}

.edit-btn {
  background-color: #f5f5f5;
  color: #333;
}

.edit-btn:hover {
  background-color: #e0e0e0;
}
</style>
