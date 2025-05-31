<template>
  <div class="role-selector-header">
    <select v-model="currentRoleValue" @change="onRoleChange" class="role-dropdown">
      <option value="admin">Admin</option>
      <option value="agent">Agent</option>
      <option value="client">Client</option>
      <option value="ai">AI</option>
    </select>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoleStore } from '@/stores/roleStore';

const roleStore = useRoleStore();
const currentRole = computed(() => roleStore.currentRole);
const currentRoleValue = ref(currentRole.value);

const onRoleChange = () => {
  roleStore.setRole(currentRoleValue.value);
  window.location.reload();
};
</script>

<style scoped>
.role-selector-header {
  display: flex;
  align-items: center;
  margin-left: 18px;
}

.role-dropdown {
  padding: 6px 16px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #222;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: border 0.2s;
  outline: none;
  box-shadow: none;
}
.role-dropdown:focus {
  border-color: #0066cc;
}
</style>
