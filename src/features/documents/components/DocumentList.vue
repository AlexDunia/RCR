<template>
  <div class="documents-list">
    <document-card
      v-for="document in documentsList"
      :key="document.id"
      :document="document"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import DocumentCard from './DocumentCard.vue';
import { sortDocumentsByDate } from '../DocumentService';

const props = defineProps({
  documents: {
    type: Array,
    required: true,
    default: () => []
  },
  sortByDate: {
    type: Boolean,
    default: true
  }
});

const documentsList = computed(() => {
  if (props.sortByDate) {
    return sortDocumentsByDate(props.documents);
  }
  return props.documents;
});
</script>

<style scoped>
.documents-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
