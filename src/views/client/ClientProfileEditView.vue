<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-2xl font-bold text-gray-900">Edit Profile</h1>
          <button
            @click="router.back()"
            class="text-gray-600 hover:text-gray-900"
          >
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <form @submit.prevent="saveProfile" class="space-y-6">
          <!-- Avatar Upload -->
          <div class="flex items-center space-x-6">
            <div class="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
              <img
                :src="formData.avatar || defaultAvatar"
                alt="Profile"
                class="h-full w-full object-cover"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Profile Photo</label>
              <div class="mt-1 flex items-center space-x-4">
                <button
                  type="button"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Change
                </button>
                <button
                  type="button"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          <!-- Personal Information -->
          <div class="grid grid-cols-1 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                v-model="formData.fullName"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                v-model="formData.email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                v-model="formData.phoneNumber"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                v-model="formData.address"
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Property Type Interest</label>
              <select
                v-model="formData.propertyType"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="Single Family Home">Single Family Home</option>
                <option value="Condominium">Condominium</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Multi-Family">Multi-Family</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Budget Range</label>
              <select
                v-model="formData.budgetRange"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="$100,000 - $300,000">$100,000 - $300,000</option>
                <option value="$300,000 - $500,000">$300,000 - $500,000</option>
                <option value="$500,000 - $750,000">$500,000 - $750,000</option>
                <option value="$750,000 - $1,000,000">$750,000 - $1,000,000</option>
                <option value="$1,000,000+">$1,000,000+</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Preferred Locations</label>
              <input
                type="text"
                v-model="formData.preferredLocations"
                placeholder="e.g. Downtown, Suburbs, Waterfront"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              @click="router.back()"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              :disabled="isSaving"
            >
              {{ isSaving ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProfileStore } from '@/stores/profile';

const router = useRouter();
const profileStore = useProfileStore();
const isSaving = ref(false);
const defaultAvatar = 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_e7yggy.jpg';

const formData = ref({
  fullName: '',
  email: '',
  phoneNumber: '',
  address: '',
  propertyType: '',
  budgetRange: '',
  preferredLocations: '',
  avatar: ''
});

onMounted(async () => {
  await profileStore.fetchProfileData();
  const profile = profileStore.profileData;

  // Populate form with existing data
  formData.value = {
    fullName: profile.fullName || '',
    email: profile.email || '',
    phoneNumber: profile.phoneNumber || '',
    address: profile.address || '',
    propertyType: profile.propertyType || '',
    budgetRange: profile.budgetRange || '',
    preferredLocations: profile.preferredLocations || '',
    avatar: profile.avatar || defaultAvatar
  };
});

const saveProfile = async () => {
  try {
    isSaving.value = true;
    await profileStore.updateProfileData(formData.value);
    router.push('/client-profile');
  } catch (error) {
    console.error('Failed to save profile:', error);
    // Here you would typically show an error message to the user
  } finally {
    isSaving.value = false;
  }
};
</script>
