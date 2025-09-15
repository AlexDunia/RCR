<template>
  <div class="create-agent-bg">
    <div class="create-agent-container">
      <h2 class="create-agent-title">Create Agent Profile</h2>
      <form @submit.prevent="handleSubmit" class="create-agent-form">
        <div v-if="error" class="error-message">{{ error }}</div>
        <div v-if="success" class="success-message">{{ success }}</div>
        <div class="form-group">
          <label>Full Name</label>
          <input v-model="form.fullName" type="text" required placeholder="Enter full name" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="form.email" type="email" required placeholder="Enter email address" />
        </div>
        <div class="form-group">
          <label>Phone Number</label>
          <input v-model="form.phone" type="tel" required placeholder="Enter phone number" />
        </div>
        <div class="form-group">
          <label>Alternate Phone Number</label>
          <input v-model="form.altPhone" type="tel" placeholder="Enter alternate phone number" />
        </div>
        <div class="form-group">
          <label>Agency/Company Name</label>
          <input v-model="form.agencyName" type="text" required placeholder="Enter agency/company name" />
        </div>
        <div class="form-group">
          <label>Agency/Company Description</label>
          <textarea v-model="form.agencyDesc" rows="3" required placeholder="Describe the agency/company"></textarea>
        </div>
        <div class="form-group">
          <label>Agency/Company Address</label>
          <input v-model="form.agencyAddress" type="text" required placeholder="Enter agency/company address" />
        </div>
        <button type="submit" class="submit-btn" :disabled="isLoading">
          {{ isLoading ? 'Creating...' : 'Create Agent' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  altPhone: '',
  agencyName: '',
  agencyDesc: '',
  agencyAddress: ''
});
const error = ref('');
const success = ref('');
const isLoading = ref(false);

async function handleSubmit() {
  isLoading.value = true;
  error.value = '';
  success.value = '';

  try {
    const response = await fetch('/api/auth/agents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(form)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors ? Object.values(data.errors).join(', ') : 'Failed to create agent');
    }

    success.value = data.message;
    form.fullName = '';
    form.email = '';
    form.phone = '';
    form.altPhone = '';
    form.agencyName = '';
    form.agencyDesc = '';
    form.agencyAddress = '';
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.create-agent-bg {
  background-color: #f4f4f9;
  padding: 2rem;
}
.create-agent-container {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.create-agent-title {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}
.create-agent-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.form-group label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}
.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
.submit-btn {
  background-color: #007bff;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}
.submit-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
.error-message {
  color: red;
  text-align: center;
}
.success-message {
  color: green;
  text-align: center;
}
</style>
