<template>
  <router-link
    :to="{ name: 'DocumentDetail', params: { id: document.id }}"
    class="document-item"
  >
    <div class="document-info">
      <span class="document-badge" :class="document.type">{{ document.type }}</span>
      <h4 class="document-name">{{ title }}</h4>
      <p class="document-date">{{ formattedDate }}</p>
    </div>
    <div class="document-arrow">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue';
import { formatDocumentDate, getDocumentTitle } from '../DocumentService';

const props = defineProps({
  document: {
    type: Object,
    required: true
  }
});

const title = computed(() => getDocumentTitle(props.document));
const formattedDate = computed(() => formatDocumentDate(props.document.createdAt));
</script>

<style scoped>
.document-item {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 17px;
  text-decoration: none;
}

.document-item:hover {
  background-color: #f9fafb;
  border-color: #2563EB;
}

.document-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  text-transform: uppercase;
}

.document-badge.buyer-rep {
  background-color: #dbeafe;
  color: #1e40af;
}

.document-badge.seller-rep {
  background-color: #dcfce7;
  color: #166534;
}

.document-badge.mls {
  background-color: #fef3c7;
  color: #92400e;
}

.document-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
  margin: 0.5rem 0 0.25rem;
  margin-top:14px;
  margin-bottom:14px;
}

.document-date {
  font-size: 0.75rem;
  color: #6b7280;
}

.document-arrow {
  color: #9ca3af;
}
</style>
