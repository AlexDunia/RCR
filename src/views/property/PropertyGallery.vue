<template>
  <div class="property-gallery-page">
    <!-- Enhanced Fixed Header -->
    <header class="gallery-header" :class="{ 'header-scrolled': isScrolled }">
      <div class="header-content">
        <button class="back-nav" @click="$router.back()">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Back to Property</span>
        </button>
        <div class="header-title">
          <h1>Property Gallery</h1>
          <div class="property-meta" v-if="propertyDetails">
            <p class="property-name">{{ propertyDetails.propertyName || 'Luxury Property' }}</p>
            <p class="property-address">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {{ propertyDetails.address }}
            </p>
          </div>
        </div>

      </div>

      <!-- Gallery Navigation -->
      <nav class="gallery-nav" v-if="categories.length > 1">
        <button
          v-for="cat in categories"
          :key="cat"
          :class="['nav-item', { active: currentCategory === cat }]"
          @click="setCategory(cat)"
        >
          {{ cat }}
        </button>
      </nav>
    </header>

    <main class="gallery-content">
      <!-- Enhanced Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="loader-ring"></div>
        <p>Loading your gallery...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p>{{ error }}</p>
        <button class="retry-button" @click="retryLoading">Try Again</button>
      </div>

      <div v-else-if="images.length === 0" class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
        <p>No images available for this property yet.</p>
      </div>

      <div v-else class="image-grid" :class="{ 'grid-animated': !loading }">
        <div
          v-for="(image, index) in filteredImages"
          :key="image.MediaKey"
          class="image-container"
          :style="{ '--delay': `${index * 0.1}s` }"
          @click="openModal(index)"
        >
          <div class="square-wrapper">
            <img
              :src="image.MediaURL"
              :alt="`Property image ${image.Order}`"
              loading="lazy"
            />
            <div class="image-overlay">
              <div class="overlay-content">
                <span class="image-number">{{ index + 1 }} / {{ images.length }}</span>
                <span class="image-category" v-if="image.category">{{ image.category }}</span>
              </div>
              <button class="expand-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Enhanced Modal with Transitions -->
    <transition name="modal-fade">
      <div v-if="isModalOpen" class="modal" @click.self="closeModal">
        <div class="modal-header">
          <div class="modal-title" v-if="propertyDetails">
            <h3>{{ propertyDetails.propertyName || 'Property Gallery' }}</h3>
            <p>{{ propertyDetails.address }}</p>
          </div>
          <button class="close-button" @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <transition-group name="slide-fade" mode="out-in">
          <div class="modal-content" :key="currentImageIndex">
            <img
              :src="images[currentImageIndex].MediaURL"
              :alt="`Property image ${images[currentImageIndex].Order}`"
              @load="imageLoaded = true"
            />
          </div>
        </transition-group>

        <div class="modal-footer">
          <div class="modal-controls">
            <button class="nav-button prev" @click="prevImage" :disabled="currentImageIndex === 0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>

            <div class="modal-counter">
              <span class="current">{{ currentImageIndex + 1 }}</span>
              <span class="separator">/</span>
              <span class="total">{{ images.length }}</span>
            </div>

            <button class="nav-button next" @click="nextImage" :disabled="currentImageIndex === images.length - 1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>

          <div class="image-info">
            <span class="category" v-if="currentImage?.category">{{ currentImage.category }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { usePropertyStore } from '@/stores/propertyStore';
import { useRoute } from 'vue-router';
import { computed, onMounted, ref, onUnmounted, watch } from 'vue';

export default {
  name: 'PropertyGallery',
  setup() {
    const route = useRoute();
    const propertyStore = usePropertyStore();
    const listingKey = computed(() => route.params.listingKey);
    const isModalOpen = ref(false);
    const currentImageIndex = ref(0);
    const isScrolled = ref(false);
    const imageLoaded = ref(false);
    const currentCategory = ref('All');
    const isSlideshow = ref(false);
    let slideshowInterval;

    // Mock categories - replace with actual categories from your data
    const categories = computed(() => {
      const cats = ['All', ...new Set(images.value.map(img => img.category).filter(Boolean))];
      return cats.length > 1 ? cats : [];
    });

    const filteredImages = computed(() => {
      if (currentCategory.value === 'All') return images.value;
      return images.value.filter(img => img.category === currentCategory.value);
    });

    const currentImage = computed(() => images.value[currentImageIndex.value]);

    onMounted(() => {
      if (!propertyStore.getTrebMediaByListingKey(listingKey.value).length) {
        propertyStore.getTrebMedia(listingKey.value);
      }
      if (!propertyStore.currentProperty) {
        propertyStore.fetchPropertyDetails(listingKey.value);
      }

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('keydown', handleKeydown);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeydown);
      stopSlideshow();
    });

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 20;
    };

    const images = computed(() =>
      propertyStore.getTrebMediaByListingKey(listingKey.value)
    );
    const loading = computed(() => propertyStore.loading);
    const error = computed(() => propertyStore.error);
    const propertyDetails = computed(() => propertyStore.currentProperty);

    const setCategory = (category) => {
      currentCategory.value = category;
      currentImageIndex.value = 0;
    };

    const toggleSlideshow = () => {
      isSlideshow.value = !isSlideshow.value;
      if (isSlideshow.value) {
        startSlideshow();
      } else {
        stopSlideshow();
      }
    };

    const startSlideshow = () => {
      if (!slideshowInterval) {
        slideshowInterval = setInterval(() => {
          if (currentImageIndex.value < images.value.length - 1) {
            nextImage();
          } else {
            currentImageIndex.value = 0;
          }
        }, 3000);
      }
    };

    const stopSlideshow = () => {
      if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
      }
      isSlideshow.value = false;
    };

    const openModal = (index) => {
      currentImageIndex.value = index;
      isModalOpen.value = true;
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      isModalOpen.value = false;
      document.body.style.overflow = 'auto';
      stopSlideshow();
    };

    const prevImage = () => {
      if (currentImageIndex.value > 0) {
        currentImageIndex.value--;
      }
    };

    const nextImage = () => {
      if (currentImageIndex.value < images.value.length - 1) {
        currentImageIndex.value++;
      }
    };

    const handleKeydown = (e) => {
      if (!isModalOpen.value) return;

      switch(e.key) {
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'Escape':
          closeModal();
          break;
      }
    };

    const retryLoading = () => {
      propertyStore.getTrebMedia(listingKey.value);
    };

    watch(isModalOpen, (newValue) => {
      if (!newValue) {
        stopSlideshow();
      }
    });

    return {
      listingKey,
      images,
      filteredImages,
      loading,
      error,
      isModalOpen,
      currentImageIndex,
      propertyDetails,
      isScrolled,
      imageLoaded,
      categories,
      currentCategory,
      currentImage,
      isSlideshow,
      openModal,
      closeModal,
      prevImage,
      nextImage,
      retryLoading,
      setCategory,
      toggleSlideshow
    };
  },
};
</script>

<style scoped>
.property-gallery-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.gallery-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  z-index: 100;
  padding: 1rem;
  transition: all 0.3s ease;
}

.header-scrolled {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.back-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #1a1a1a;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.back-nav:hover {
  background: #f0f0f0;
  transform: translateX(-2px);
}

.header-title {
  flex: 1;
}

.header-title h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: -0.5px;
}

.property-meta {
  margin-top: 0.25rem;
}

.property-name {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: #2563eb;
}

.property-address {
  margin: 0.25rem 0 0;
  color: #666;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.gallery-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.total-images {
  color: #666;
  font-size: 0.9rem;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  background: #2563eb;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.action-button:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}

.gallery-nav {
  max-width: 1400px;
  margin: 1rem auto 0;
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.5rem 0;
}

.nav-item {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  color: #666;
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: 20px;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.nav-item:hover {
  color: #2563eb;
  background: #f0f7ff;
}

.nav-item.active {
  background: #2563eb;
  color: white;
}

.gallery-content {
  padding: 120px 2rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #666;
  gap: 1.5rem;
  text-align: center;
}

.loader-ring {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.retry-button {
  padding: 0.75rem 1.5rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.retry-button:hover {
  background: #1d4ed8;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 30px;
}

.grid-animated .image-container {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
  animation-delay: var(--delay);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.image-container {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.image-container:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.square-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
}

.square-wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-container:hover img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  opacity: 0;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.image-container:hover .image-overlay {
  opacity: 1;
}

.overlay-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.image-number {
  font-size: 0.9rem;
  font-weight: 500;
}

.image-category {
  font-size: 0.8rem;
  opacity: 0.9;
}

.expand-button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.expand-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

/* Modal Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Modal styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  flex-direction: column;
  z-index: 1000;
}

.modal-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
}

.modal-title {
  color: white;
}

.modal-title h3 {
  margin: 0;
  font-size: 1.2rem;
}

.modal-title p {
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

.modal-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.modal-content img {
  max-width: 100%;
  max-height: calc(100vh - 200px);
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.modal-footer {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
}

.modal-controls {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.modal-counter {
  color: white;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.modal-counter .current {
  font-size: 1.2rem;
  font-weight: 600;
}

.modal-counter .separator {
  opacity: 0.5;
}

.close-button {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.nav-button {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  cursor: pointer;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.nav-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.nav-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.image-info {
  color: white;
}

.category {
  font-size: 0.9rem;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .gallery-content {
    padding: 100px 1rem 1rem;
  }

  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
  }

  .header-content {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .gallery-actions {
    width: 100%;
    justify-content: space-between;
  }

  .modal-header,
  .modal-footer {
    padding: 1rem;
  }

  .modal-content {
    padding: 1rem;
  }

  .nav-button {
    width: 40px;
    height: 40px;
  }

  .modal-controls {
    gap: 1rem;
  }
}
</style>
