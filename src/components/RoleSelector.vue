<template>
  <div class="role-selector">
    <div class="role-selector__content">
      <h3>Testing: Switch User Role</h3>
      <div class="user-info">
        <label>
          Test User Name:
          <input
            type="text"
            v-model="userName"
            @change="updateUserName"
            placeholder="Your Name"
            class="user-name-input"
          />
        </label>
      </div>
      <div class="role-options">
        <label :class="['role-option', { active: currentRole === 'admin' }]">
          <input
            type="radio"
            value="admin"
            v-model="currentRole"
            @change="changeRole('admin')"
          />
          Admin
        </label>
        <label :class="['role-option', { active: currentRole === 'agent' }]">
          <input
            type="radio"
            value="agent"
            v-model="currentRole"
            @change="changeRole('agent')"
          />
          Agent
        </label>
      </div>
      <div class="permissions-info">
        <div v-if="currentRole === 'admin'">
          <p><strong>Admin Permissions:</strong> Can view and manage all marketing content but cannot access agent social profiles.</p>
        </div>
        <div v-else>
          <p><strong>Agent Permissions:</strong> Has full access to all marketing features including social profiles.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoleStore } from '@/stores/roleStore';

const roleStore = useRoleStore();
const currentRole = computed(() => roleStore.currentRole);
const userName = ref(roleStore.getCurrentUser().name || '');

onMounted(() => {
  console.log('RoleSelector mounted - Current role:', roleStore.currentRole);
});

const changeRole = (role) => {
  // Use the roleStore to change roles
  roleStore.setRole(role);

  // Force page reload to apply new permissions
  alert(`Role changed to ${role}. The page will now reload.`);
  window.location.reload();
};

const updateUserName = () => {
  if (userName.value.trim()) {
    // This would ideally update user info in the roleStore
    // For now we're just updating the UI
  }
};
</script>

<style scoped>
.role-selector {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #e5e7eb;
  overflow: hidden;
  width: 280px;
}

.role-selector__content {
  padding: 1rem;
}

h3 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.user-info {
  margin-bottom: 1rem;
}

.user-name-input {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  margin-top: 0.25rem;
  font-size: 0.875rem;
}

.role-options {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.role-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  background-color: #f3f4f6;
  cursor: pointer;
  transition: all 0.2s;
}

.role-option.active {
  background-color: #dbeafe;
  color: #1d4ed8;
}

.role-option input {
  margin: 0;
}

.permissions-info {
  font-size: 0.75rem;
  color: #4b5563;
  background-color: #f9fafb;
  padding: 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
}

.permissions-info p {
  margin: 0;
}
</style>
