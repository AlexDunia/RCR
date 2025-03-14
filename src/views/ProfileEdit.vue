<template>
  <div class="profile-edit-container p-6 bg-gray-50">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
      <div class="flex justify-between items-center px-6 py-4 border-b border-gray-100">
        <h1 class="text-xl font-semibold text-gray-900">Edit Profile</h1>
        <div class="space-x-3">
          <button
            @click="router.back()"
            class="px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="saveChanges"
            class="px-4 py-2 bg-[#0D47A1] text-white text-sm font-medium rounded hover:bg-blue-800 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>

      <form @submit.prevent="saveChanges" class="p-6">
        <div class="mb-8">
          <div class="flex items-center">
            <div class="relative">
              <img
                :src="formData.avatar || '/path-to-default-avatar.jpg'"
                class="w-[70px] h-[70px] rounded-full mr-4 object-cover border-2 border-white shadow-sm"
                alt="Profile Picture"
              />
            </div>
            <button
              type="button"
              class="ml-4 px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Change Photo
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-x-16 gap-y-6">
          <!-- Left Column -->
          <div class="space-y-6">
            <FormField
              label="Full name"
              v-model="formData.fullName"
              type="text"
            />
            <FormField
              label="Phone number"
              v-model="formData.phoneNumber"
              type="tel"
            />
            <FormField
              label="Agency/Company name"
              v-model="formData.companyName"
              type="text"
            />
            <FormField
              label="Country of residence"
              v-model="formData.address"
              type="text"
            />
          </div>

          <!-- Right Column -->
          <div class="space-y-6">
            <FormField
              label="Email"
              v-model="formData.email"
              type="email"
            />
            <FormField
              label="Alternate phone number"
              v-model="formData.alternatePhone"
              type="tel"
            />
            <div>
              <label class="block text-[14px] font-medium text-gray-600 mb-1.5">
                Agency/Company description
              </label>
              <textarea
                v-model="formData.companyDescription"
                rows="3"
                class="w-full p-3 text-[14px] text-gray-900 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- More Section -->
        <div class="mt-8 pt-6 border-t border-gray-100">
          <h2 class="text-xl font-semibold mb-6 text-gray-900">More</h2>
          <div class="grid grid-cols-2 gap-x-16">
            <FormField
              label="RECO number"
              v-model="formData.recoNumber"
              type="text"
            />
            <FormField
              label="TREBB number"
              v-model="formData.trebbNumber"
              type="text"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineComponent } from 'vue'
import { useRouter } from 'vue-router'

// Components
const FormField = defineComponent({
  props: {
    label: { type: String, required: true },
    modelValue: { type: String, required: true },
    type: { type: String, default: 'text' }
  },
  emits: ['update:modelValue'],
  template: `
    <div>
      <label class="block text-[14px] font-medium text-gray-600 mb-1.5">
        {{ label }}
      </label>
      <input
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full p-3 text-[14px] text-gray-900 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  `
})

// Router
const router = useRouter()

// State
const formData = ref({
  fullName: 'Alex Dunia',
  role: 'Senior Real Estate Agent',
  email: 'helloduniamedia@gmail.com',
  phoneNumber: '08108725914',
  alternatePhone: '08108725914',
  companyName: 'Soft branded real estate foundations limited.',
  companyDescription: 'A real housing estate that wants your convenience, comfort and happiness.',
  address: '123 Main Street, Los Angeles, CA 90001',
  recoNumber: '97639377946139476',
  trebbNumber: '97639377946139476',
  avatar: '/path-to-avatar.jpg'
})

// Methods
const saveChanges = async () => {
  try {
    // Here you would typically make an API call to save the changes
    await new Promise(resolve => setTimeout(resolve, 500))
    router.push('/profile')
  } catch (error) {
    console.error('Failed to save changes:', error)
  }
}
</script>

<style scoped>
.profile-edit-container {
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
}

/* Ensure consistent font rendering */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
