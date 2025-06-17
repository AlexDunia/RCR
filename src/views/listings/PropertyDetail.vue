<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePropertyStore } from "@/stores/propertyStore";
import { useNavigationStore } from "@/stores/navigation";

const route = useRoute();
const router = useRouter();
const propertyStore = usePropertyStore();
const navigationStore = useNavigationStore();

// Loading and error states
const isLoading = computed(() => propertyStore.loading);
const error = computed(() => propertyStore.error);

// Get property details based on the route parameter
const property = computed(() => propertyStore.currentProperty);

// Set active page and fetch property on mount
onMounted(async () => {
  navigationStore.setActivePage("Manage Listings");
  try {
    await propertyStore.fetchPropertyById(Number(route.params.id));
  } catch (err) {
    console.error('Failed to fetch property:', err);
  }
});

const showModal = ref(false);
const shareImage = ref(null);
const mainImage = ref(null); // Track the main image for updates

// Initialize main image with the property's main image
onMounted(() => {
  if (property.value) {
    mainImage.value = property.value.image;
  }
});

// Toggle favorite
const toggleFavorite = async () => {
  if (!property.value) return;
  try {
    await propertyStore.toggleFavorite(property.value.id);
  } catch (err) {
    console.error('Failed to toggle favorite:', err);
  }
};

const openShareModal = (img) => {
  shareImage.value = img;
  showModal.value = true;
};

const closeShareModal = () => {
  showModal.value = false;
};

const shareOn = (platform) => {
  const url = window.location.href; // Current URL of the property page
  let shareUrl;

  switch (platform) {
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`;
      break;
    case 'gmail':
      shareUrl = `https://mail.google.com/mail/?view=cm&to=&su=Check+this+property&body=${encodeURIComponent(url)}`;
      break;
    case 'whatsapp':
      shareUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
      break;
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      break;
    case 'telegram':
      shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}`;
      break;
    case 'copyLink':
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
      });
      return; // No new tab for copy link
  }

  // Open in a new tab for all other platforms
  window.open(shareUrl, '_blank');
};

// Function to update the main image when a thumbnail is clicked
const updateMainImage = (newImage) => {
  mainImage.value = newImage;
};
</script>

<template>
  <!-- Loading State -->
  <div v-if="isLoading" class="loading">
    Loading property details...
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="error">
    {{ error }}
  </div>

  <!-- Property Details -->
  <div v-else-if="property" class="property-detail">
    <div class="property-main">
      <div class="property-image-container">
        <!-- Main Image -->
        <img
          :src="mainImage || property.image"
          :alt="property.name"
          class="property-image"
        />
        <div class="icon-container">
          <button
            class="icon-btn love-btn"
            :class="{ loved: property.isFavorite }"
            @click="toggleFavorite"
          >
            <svg class="love-icon" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
          <button class="icon-btn share-btn" @click="openShareModal(mainImage || property.image)">
            <svg class="share-icon" viewBox="0 0 24 24">
              <path d="M18 16.08c-1.76 0-3.29.77-4.32 1.97L8.91 15.7c.07-.32.09-.66.09-1 0-.34-.03-.68-.09-1l4.77-2.35c1.03 1.2 2.56 1.97 4.32 1.97 3.04 0 5.5-2.46 5.5-5.5S21.04 2 18 2s-5.5 2.46-5.5 5.5c0 .34.03.68.09 1L7.82 10.85C6.79 9.65 5.26 8.88 3.5 8.88 0.46 8.88-2 11.34-2 14.38s2.46 5.5 5.5 5.5c1.76 0 3.29-.77 4.32-1.97l4.77 2.35c-.07.32-.09.66-.09 1 0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5-2.46-5.5-5.5-5.5z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="property-info">
        <h2 class="property-title">{{ property.name }}</h2>
        <div class="property-address-type">
          <p class="property-address">{{ property.address }}</p>
          <p class="property-type">Type: {{ property.type }}</p>
          <p class="property-status">Status: {{ property.status }}</p>
          <p class="property-price">Price: ${{ property.price.toLocaleString() }}</p>
        </div>
        <div class="property-specs">
          <div v-if="property.bedrooms" class="property-spec-item">
            Bedroom <br> {{ property.bedrooms }}
          </div>
          <div v-if="property.bathrooms" class="property-spec-item">
            Bathroom <br> {{ property.bathrooms }}
          </div>
          <div v-if="property.size" class="property-spec-item">
            Square Feet<br> {{ property.size }} ft²
          </div>
        </div>
        <br/>
        <h3 class="property-title">Description</h3>
        <p class="property-description">
          {{ property.description }}
        </p>
      </div>
    </div>

    <!-- Thumbnail Loop (Carousel-like) -->
    <div v-if="property.images && property.images.length > 0" class="thumbnail-loop">
      <div v-for="(img, index) in property.images" :key="index" class="thumbnail-loop-item">
        <img :src="img" :alt="`${property.name} - Image ${index + 1}`" class="thumbnail-loop-image" @click="updateMainImage(img)" />
      </div>
    </div>
  </div>

  <div v-else class="not-found">
    <p>Property not found.</p>
    <button class="back-btn" @click="router.push('/listings')">Back to Listings</button>
  </div>

  <!-- Share Modal -->
  <div v-if="showModal" class="modal-overlay" @click="closeShareModal">
    <div class="modal-content" @click.stop>
      <button class="close-btn" @click="closeShareModal">✖</button>
      <div class="share-options">
        <button class="share-btn linkedin" @click="shareOn('linkedin')">
          <svg class="share-icon" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.025-3.05-1.864-3.05-1.864 0-2.149 1.455-2.149 2.96v5.694h-3v-11h3v1.561c.497-.944 1.785-1.561 3.174-1.561 3.396 0 4.023 2.23 4.023 5.137v6.263z"/></svg>
          LinkedIn
        </button>
        <button class="share-btn gmail" @click="shareOn('gmail')">
          <svg class="share-icon" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          Gmail
        </button>
        <button class="share-btn whatsapp" @click="shareOn('whatsapp')">
          <svg class="share-icon" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.492-9.944 10.028-9.944s10.028 4.494 10.028 9.944c0 5.46-4.493 9.944-10.025 9.944z"/></svg>
          WhatsApp
        </button>
        <button class="share-btn facebook" @click="shareOn('facebook')">
          <svg class="share-icon" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
          Facebook
        </button>
        <button class="share-btn telegram" @click="shareOn('telegram')">
          <svg class="share-icon" viewBox="0 0 24 24"><path d="M9.417 15.181l-.397 5.584c.034.05.099.145.244.145.133 0 .254-.104.354-.29l2.993-3.935-3.194-1.504zM14.976 10.11l-6.243 3.378 14.054-8.098-.711 12.451-7.1-3.729zM3.172 5.172c.56.56 1.537.57 2.254-.153l9.597-7.44 2.253 2.985-11.782 8.55-2.322-2.955z"/></svg>
          Telegram
        </button>
        <button class="share-btn copy-link" @click="shareOn('copyLink')">
          <svg class="share-icon" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
          Copy Link
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Property Details */
.property-detail {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.property-main {
  display: flex;
  gap: 50px;
  margin: auto;
  justify-content: space-between;
}

.property-image-container {
  position: relative;
}

.property-image {
  width: 550px;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
}

/* Thumbnail Loop (Carousel-like) */
.thumbnail-loop {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 15px;
  background: #F5F5F5;
  border-radius: 10px;
}

.thumbnail-loop-item {
  flex: 1 1 calc(16.66% - 20px);
  max-width: calc(16.66% - 20px);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.thumbnail-loop-item:hover {
  transform: scale(1.05);
}

.thumbnail-loop-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
}

/* Icon Container */
.icon-container {
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  gap: 10px;
}

.icon-btn {
  background: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.icon-btn:hover {
  transform: scale(1.1);
}

.love-icon,
.share-icon {
  width: 24px;
  height: 24px;
  fill: #666;
}

.love-btn.loved .love-icon {
  fill: red;
}

/* Property Info */
.property-info {
  flex: 1;
  max-width: 500px;
}

.property-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

.property-address-type {
  margin-bottom: 20px;
}

.property-address,
.property-type,
.property-status,
.property-price {
  margin: 5px 0;
  color: #666;
}

.property-specs {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.property-spec-item {
  flex: 1;
  text-align: center;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
  font-size: 14px;
  color: #666;
}

.property-description {
  color: #666;
  line-height: 1.6;
}

/* Loading and Error States */
.loading,
.error,
.not-found {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 20px;
}

.error {
  color: #d32f2f;
}

.back-btn {
  margin-top: 20px;
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

/* Share Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  width: 90%;
  max-width: 500px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
}

.share-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin-top: 20px;
}

.share-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: transform 0.2s;
}

.share-btn:hover {
  transform: translateY(-2px);
}

.linkedin { background: #0077B5; color: white; }
.gmail { background: #EA4335; color: white; }
.whatsapp { background: #25D366; color: white; }
.facebook { background: #1877F2; color: white; }
.telegram { background: #0088CC; color: white; }
.copy-link { background: #f5f5f5; color: #333; }

.share-btn svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
}
</style>
