<template>
  <div class="property-detail-page">
    <GlobalHeader />

    <!-- Share Modal -->
    <transition name="fade">
      <div v-if="showShareModal" class="modal-overlay" @click="showShareModal = false">
        <div class="share-modal" @click.stop>
          <div class="share-modal-header">
            <h3>Share this place</h3>
            <button class="close-button" @click="showShareModal = false">×</button>
          </div>

          <div class="share-modal-preview">
            <img
              :src="property?.image || 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png'"
              :alt="property?.UnparsedAddress"
              class="preview-image"
            >
            <div class="preview-info">
              <p class="preview-title">{{ property?.UnparsedAddress }}</p>
              <p class="preview-details">
                {{ property?.PropertyType }} • ${{ formatPrice(property?.ListPrice) }}
              </p>
            </div>
          </div>

          <div class="share-options">
            <button class="share-option" @click="copyLink">
              <i class="fas fa-link"></i>
              <span>Copy Link</span>
            </button>
            <button class="share-option" @click="shareViaEmail">
              <i class="fas fa-envelope"></i>
              <span>Email</span>
            </button>
            <button class="share-option" @click="shareViaWhatsApp">
              <i class="fab fa-whatsapp"></i>
              <span>WhatsApp</span>
            </button>
            <button class="share-option" @click="shareViaFacebook">
              <i class="fab fa-facebook"></i>
              <span>Facebook</span>
            </button>
            <button class="share-option" @click="shareViaTwitter">
              <i class="fab fa-twitter"></i>
              <span>Twitter</span>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <div class="content-wrapper">
      <div v-if="loading" class="skeleton-loader">
        <!-- Main Content Skeleton -->
        <div class="main-content">
          <!-- Property Gallery Skeleton -->
          <section class="gallery-section">
            <div class="main-image-skeleton">
              <!-- Image placeholder -->
              <div class="image-placeholder animate-pulse"></div>
              
              <!-- Action Buttons Skeleton -->
              <div class="action-buttons-skeleton">
                <div class="action-button-skeleton animate-pulse"></div>
                <div class="action-button-skeleton animate-pulse"></div>
              </div>
              
              <!-- Status Badges Skeleton -->
              <div class="floating-badges-skeleton">
                <div class="status-badge-skeleton animate-pulse"></div>
                <div class="transaction-type-badge-skeleton animate-pulse"></div>
              </div>
              
              <!-- Gallery Button Skeleton -->
              <div class="gallery-button-skeleton animate-pulse"></div>
            </div>
          </section>

          <!-- Essential Info Skeleton -->
          <section class="essential-info-skeleton">
            <div class="price-section-skeleton">
              <div class="price-skeleton animate-pulse"></div>
              <div class="mls-info-skeleton">
                <div class="mls-line-skeleton animate-pulse"></div>
                <div class="mls-line-skeleton animate-pulse"></div>
              </div>
            </div>

            <div class="address-section-skeleton">
              <div class="address-title-skeleton animate-pulse"></div>
              <div class="address-subtitle-skeleton animate-pulse"></div>
            </div>

            <!-- Key Details Grid Skeleton -->
            <div class="key-details-skeleton">
              <div class="detail-grid-skeleton">
                <div class="detail-item-skeleton animate-pulse">
                  <div class="detail-icon-skeleton"></div>
                  <div class="detail-value-skeleton"></div>
                  <div class="detail-label-skeleton"></div>
                </div>
                <div class="detail-item-skeleton animate-pulse">
                  <div class="detail-icon-skeleton"></div>
                  <div class="detail-value-skeleton"></div>
                  <div class="detail-label-skeleton"></div>
                </div>
                <div class="detail-item-skeleton animate-pulse">
                  <div class="detail-icon-skeleton"></div>
                  <div class="detail-value-skeleton"></div>
                  <div class="detail-label-skeleton"></div>
                </div>
                <div class="detail-item-skeleton animate-pulse">
                  <div class="detail-icon-skeleton"></div>
                  <div class="detail-value-skeleton"></div>
                  <div class="detail-label-skeleton"></div>
                </div>
              </div>
            </div>
          </section>

          <!-- Property Details Grid Skeleton -->
          <div class="details-grid-skeleton">
            <!-- Left Column Skeleton -->
            <div class="left-column-skeleton">
              <!-- Property Description Skeleton -->
              <section class="detail-section-skeleton">
                <div class="section-title-skeleton animate-pulse"></div>
                <div class="text-content-skeleton">
                  <div class="text-line-skeleton animate-pulse"></div>
                  <div class="text-line-skeleton animate-pulse"></div>
                  <div class="text-line-skeleton animate-pulse"></div>
                  <div class="text-line-skeleton animate-pulse"></div>
                  <div class="text-line-skeleton animate-pulse"></div>
                </div>
              </section>

              <!-- Property Features Skeleton -->
              <section class="detail-section-skeleton">
                <div class="section-title-skeleton animate-pulse"></div>
                <div class="features-grid-skeleton">
                  <div class="feature-group-skeleton">
                    <div class="feature-title-skeleton animate-pulse"></div>
                    <div class="feature-list-skeleton">
                      <div class="feature-item-skeleton animate-pulse"></div>
                      <div class="feature-item-skeleton animate-pulse"></div>
                      <div class="feature-item-skeleton animate-pulse"></div>
                      <div class="feature-item-skeleton animate-pulse"></div>
                    </div>
                  </div>
                  <div class="feature-group-skeleton">
                    <div class="feature-title-skeleton animate-pulse"></div>
                    <div class="feature-list-skeleton">
                      <div class="feature-item-skeleton animate-pulse"></div>
                      <div class="feature-item-skeleton animate-pulse"></div>
                      <div class="feature-item-skeleton animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <!-- Right Column Skeleton -->
            <div class="right-column-skeleton">
              <!-- Building Details Skeleton -->
              <section class="detail-section-skeleton">
                <div class="section-title-skeleton animate-pulse"></div>
                <div class="details-list-skeleton">
                  <div class="detail-row-skeleton animate-pulse">
                    <div class="detail-label-skeleton"></div>
                    <div class="detail-value-skeleton"></div>
                  </div>
                  <div class="detail-row-skeleton animate-pulse">
                    <div class="detail-label-skeleton"></div>
                    <div class="detail-value-skeleton"></div>
                  </div>
                  <div class="detail-row-skeleton animate-pulse">
                    <div class="detail-label-skeleton"></div>
                    <div class="detail-value-skeleton"></div>
                  </div>
                  <div class="detail-row-skeleton animate-pulse">
                    <div class="detail-label-skeleton"></div>
                    <div class="detail-value-skeleton"></div>
                  </div>
                  <div class="detail-row-skeleton animate-pulse">
                    <div class="detail-label-skeleton"></div>
                    <div class="detail-value-skeleton"></div>
                  </div>
                </div>
              </section>

              <!-- Lot Details Skeleton -->
              <section class="detail-section-skeleton">
                <div class="section-title-skeleton animate-pulse"></div>
                <div class="details-list-skeleton">
                  <div class="detail-row-skeleton animate-pulse">
                    <div class="detail-label-skeleton"></div>
                    <div class="detail-value-skeleton"></div>
                  </div>
                  <div class="detail-row-skeleton animate-pulse">
                    <div class="detail-label-skeleton"></div>
                    <div class="detail-value-skeleton"></div>
                  </div>
                </div>
              </section>

              <!-- Financial Details Skeleton -->
              <section class="detail-section-skeleton">
                <div class="section-title-skeleton animate-pulse"></div>
                <div class="details-list-skeleton">
                  <div class="detail-row-skeleton animate-pulse">
                    <div class="detail-label-skeleton"></div>
                    <div class="detail-value-skeleton"></div>
                  </div>
                  <div class="detail-row-skeleton animate-pulse">
                    <div class="detail-label-skeleton"></div>
                    <div class="detail-value-skeleton"></div>
                  </div>
                  <div class="detail-row-skeleton animate-pulse">
                    <div class="detail-label-skeleton"></div>
                    <div class="detail-value-skeleton"></div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="error" class="error-state">{{ error }}</div>
      <div v-else-if="!property" class="not-found-state">Property not found</div>

      <template v-else>
        <!-- Main Content -->
        <div class="main-content">
          <!-- Property Gallery -->
          <section class="gallery-section">
            <div class="main-image">
              <img
                :src="propertyImage || property.image"
                :alt="property.UnparsedAddress"
                @error="handleImageError"
              >
              <!-- Action Buttons -->
              <div class="action-buttons">
                <button class="action-button share-btn" @click="showShareModal = true">
                  <i class="fas fa-share-alt"></i>
                  Share
                </button>
                <button class="action-button save-btn" @click="handleSave">
                  <i class="fas fa-bookmark"></i>
                  Save
                </button>
              </div>
              <!-- Status Badges -->
              <div class="floating-badges">
                <div class="status-badge" :class="property.StandardStatus.toLowerCase()">
                  <i class="fas" :class="property.StandardStatus === 'Active' ? 'fa-check-circle' : 'fa-clock'"></i>
                  {{ property.StandardStatus }}
                </div>
                <div class="transaction-type-badge">
                  <i class="fas fa-home"></i>
                  {{ property.TransactionType }}
                </div>
              </div>
              <!-- Gallery Button -->
              <router-link
                :to="`/property/${route.params.listingKey}/gallery`"
                class="gallery-button"
              >
                <i class="fas fa-images"></i>
                View Full Property Gallery
              </router-link>
            </div>
          </section>

          <!-- Essential Info -->
          <section class="essential-info">
            <div class="price-section">
              <h1 class="price">
                ${{ formatPrice(property.ListPrice) }}
                <span v-if="property.ListPriceUnit">{{ property.ListPriceUnit }}</span>
              </h1>
              <div class="mls-info">
                <span>MLS® {{ property.ListingKey }}</span>
                <span>{{ property.ListAOR }}</span>
              </div>
            </div>

            <div class="address-section">
              <h2>{{ property.UnparsedAddress }}</h2>
              <p>{{ property.City }}, {{ property.StateOrProvince }} {{ property.PostalCode }}</p>
            </div>

            <!-- Key Details -->
            <div class="key-details">
              <div v-if="isResidential" class="detail-grid">
                <div class="detail-item">
                  <span class="icon">🛏️</span>
                  <span class="value">{{ property.BedroomsTotal || 0 }}</span>
                  <span class="label">Beds</span>
                </div>
                <div class="detail-item">
                  <span class="icon">🚿</span>
                  <span class="value">{{ property.BathroomsTotalInteger || 0 }}</span>
                  <span class="label">Baths</span>
                </div>
                <div class="detail-item">
                  <span class="icon">📏</span>
                  <span class="value">{{ property.LivingAreaRange || 'N/A' }}</span>
                  <span class="label">Sq Ft</span>
                </div>
                <div class="detail-item">
                  <span class="icon">🚗</span>
                  <span class="value">{{ property.ParkingTotal || 0 }}</span>
                  <span class="label">Parking</span>
                </div>
              </div>

              <div v-else-if="isCommercial" class="detail-grid">
                <div class="detail-item">
                  <span class="icon">🏢</span>
                  <span class="value">{{ property.BuildingAreaTotal || 'N/A' }}</span>
                  <span class="label">{{ property.BuildingAreaUnits }}</span>
                </div>
                <div class="detail-item">
                  <span class="icon">💼</span>
                  <span class="value">{{ property.PropertyUse || 'N/A' }}</span>
                  <span class="label">Usage</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Property Details Grid -->
          <div class="details-grid">
            <!-- Left Column -->
            <div class="left-column">
              <!-- Property Description -->
              <section class="detail-section">
                <h3>About This Property</h3>
                <p>{{ property.PublicRemarks }}</p>
              </section>

              <!-- Property Features -->
              <section class="detail-section" v-if="hasFeatures">
                <h3>Property Features</h3>
                <div class="features-grid">
                  <div v-if="property.PropertyFeatures?.length" class="feature-group">
                    <h4>Amenities</h4>
                    <ul>
                      <li v-for="feature in property.PropertyFeatures" :key="feature">
                        {{ feature }}
                      </li>
                    </ul>
                  </div>

                  <div v-if="property.InteriorFeatures?.length" class="feature-group">
                    <h4>Interior</h4>
                    <ul>
                      <li v-for="feature in property.InteriorFeatures" :key="feature">
                        {{ feature }}
                      </li>
                    </ul>
                  </div>

                  <div v-if="property.ExteriorFeatures?.length" class="feature-group">
                    <h4>Exterior</h4>
                    <ul>
                      <li v-for="feature in property.ExteriorFeatures" :key="feature">
                        {{ feature }}
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <!-- Waterfront Features -->
              <section class="detail-section" v-if="property.WaterfrontYN">
                <h3>Waterfront Details</h3>
                <div class="waterfront-details">
                  <div class="detail-row">
                    <span class="label">Water Body:</span>
                    <span class="value">{{ property.WaterBodyName }} ({{ property.WaterBodyType }})</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Waterfront:</span>
                    <span class="value">{{ property.Waterfront?.[0] }}</span>
                  </div>
                  <div class="detail-row" v-if="property.WaterFrontageFt">
                    <span class="label">Frontage:</span>
                    <span class="value">{{ property.WaterFrontageFt }} ft</span>
                  </div>
                  <div class="waterfront-features" v-if="property.WaterfrontFeatures?.length">
                    <h4>Features:</h4>
                    <ul>
                      <li v-for="feature in property.WaterfrontFeatures" :key="feature">
                        {{ feature }}
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            <!-- Right Column -->
            <div class="right-column">
              <!-- Building Details -->
              <section class="detail-section">
                <h3>Building Details</h3>
                <div class="details-list">
                  <div class="detail-row" v-if="property.ApproximateAge">
                    <span class="label">Age:</span>
                    <span class="value">{{ property.ApproximateAge }}</span>
                  </div>
                  <div class="detail-row" v-if="property.ArchitecturalStyle?.length">
                    <span class="label">Style:</span>
                    <span class="value">{{ property.ArchitecturalStyle.join(', ') }}</span>
                  </div>
                  <div class="detail-row" v-if="property.ConstructionMaterials?.length">
                    <span class="label">Construction:</span>
                    <span class="value">{{ property.ConstructionMaterials.join(', ') }}</span>
                  </div>
                  <div class="detail-row" v-if="property.Basement?.length">
                    <span class="label">Basement:</span>
                    <span class="value">{{ property.Basement.join(', ') }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Heating:</span>
                    <span class="value">{{ property.HeatType }} ({{ property.HeatSource }})</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Cooling:</span>
                    <span class="value">{{ property.Cooling?.join(', ') || 'None' }}</span>
                  </div>
                </div>
              </section>

              <!-- Lot Details -->
              <section class="detail-section" v-if="hasLotDetails">
                <h3>Lot Details</h3>
                <div class="details-list">
                  <div class="detail-row">
                    <span class="label">Dimensions:</span>
                    <span class="value">{{ property.LotWidth }} x {{ property.LotDepth }} {{ property.LotSizeUnits }}</span>
                  </div>
                  <div class="detail-row" v-if="property.LotFeatures?.length">
                    <span class="label">Features:</span>
                    <span class="value">{{ property.LotFeatures.join(', ') }}</span>
                  </div>
                </div>
              </section>

              <!-- Financial Details -->
              <section class="detail-section">
                <h3>Financial Information</h3>
                <div class="details-list">
                  <div class="detail-row">
                    <span class="label">List Price:</span>
                    <span class="value">${{ formatPrice(property.ListPrice) }}</span>
                  </div>
                  <div class="detail-row" v-if="property.TaxAnnualAmount">
                    <span class="label">Annual Taxes:</span>
                    <span class="value">${{ formatPrice(property.TaxAnnualAmount) }} ({{ property.TaxYear }})</span>
                  </div>
                  <div class="detail-row" v-if="property.AssociationFee">
                    <span class="label">Association Fee:</span>
                    <span class="value">${{ property.AssociationFee }}/month</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePropertyStore } from '@/stores/propertyStore';
import { useAuthStore } from '@/stores/authStore';
import GlobalHeader from '@/components/GlobalHeader.vue';

const route = useRoute();
const router = useRouter();
const propertyStore = usePropertyStore();
const authStore = useAuthStore();
const loading = ref(false);
const error = ref(null);
const showShareModal = ref(false);
const propertyImage = ref(null); // Add reactive property for image URL

const property = computed(() => {
  const listingKey = route.params.listingKey;
  // First check in search results, then in trebData
  return propertyStore.searchResults?.find(p => p.ListingKey === listingKey) || 
         propertyStore.trebData?.data?.value?.find(p => p.ListingKey === listingKey) || null;
});

const isResidential = computed(() => {
  return property.value?.PropertyType?.includes('Residential');
});

const isCommercial = computed(() => {
  return property.value?.PropertyType?.includes('Commercial');
});

const hasFeatures = computed(() => {
  return property.value?.PropertyFeatures?.length ||
         property.value?.InteriorFeatures?.length ||
         property.value?.ExteriorFeatures?.length;
});

const hasLotDetails = computed(() => {
  return property.value?.LotWidth && property.value?.LotDepth;
});

const formatPrice = (price) => {
  return price ? new Intl.NumberFormat('en-US').format(price) : 'N/A';
};

const handleImageError = (event) => {
  // Don't set a fallback image - just hide the image if it fails to load
  event.target.style.display = 'none';
};

// Share functionality
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
    showShareModal.value = false;
  } catch (err) {
    console.error('Failed to copy link:', err);
  }
};

const shareViaEmail = () => {
  if (!property.value) return;

  const subject = `Check out this property: ${property.value.UnparsedAddress}`;
  const price = property.value.ListPrice ? `$${formatPrice(property.value.ListPrice)}` : 'Price not available';
  const body = `Check out this property I found on Real City!\n\n` +
    `${property.value.UnparsedAddress}\n` +
    `Price: ${price}\n\n` +
    `View more details here: ${window.location.href}`;

  // For Gmail
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // For Outlook
  const outlookUrl = `https://outlook.office.com/mail/deeplink/compose?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Create a small popup menu for email client selection
  const emailMenu = document.createElement('div');
  emailMenu.className = 'email-client-menu';
  emailMenu.innerHTML = `
    <div class="email-client-options">
      <button class="email-client-option" data-client="gmail">
        <i class="fab fa-google"></i>
        Gmail
      </button>
      <button class="email-client-option" data-client="outlook">
        <i class="fab fa-microsoft"></i>
        Outlook
      </button>
      <button class="email-client-option" data-client="default">
        <i class="fas fa-envelope"></i>
        Default Email
      </button>
    </div>
  `;

  // Style the menu
  emailMenu.style.position = 'absolute';
  emailMenu.style.zIndex = '1001';
  emailMenu.style.background = 'white';
  emailMenu.style.borderRadius = '12px';
  emailMenu.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  emailMenu.style.padding = '8px';

  // Get the email button position
  const emailBtn = event.currentTarget;
  const rect = emailBtn.getBoundingClientRect();
  emailMenu.style.top = `${rect.bottom + window.scrollY + 5}px`;
  emailMenu.style.left = `${rect.left + window.scrollX}px`;

  // Add click handlers
  emailMenu.addEventListener('click', (e) => {
    const client = e.target.closest('.email-client-option')?.dataset.client;
    if (client) {
      switch (client) {
        case 'gmail':
          window.open(gmailUrl, '_blank');
          break;
        case 'outlook':
          window.open(outlookUrl, '_blank');
          break;
        case 'default':
          window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          break;
      }
      document.body.removeChild(emailMenu);
      showShareModal.value = false;
    }
  });

  // Close menu when clicking outside
  const closeMenu = (e) => {
    if (!emailMenu.contains(e.target) && e.target !== emailBtn) {
      document.body.removeChild(emailMenu);
      document.removeEventListener('click', closeMenu);
    }
  };

  document.addEventListener('click', closeMenu);
  document.body.appendChild(emailMenu);
};

const shareViaWhatsApp = () => {
  const text = `Check out this property on Real City: ${window.location.href}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  showShareModal.value = false;
};

const shareViaFacebook = () => {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  showShareModal.value = false;
};

const shareViaTwitter = () => {
  const text = `Check out this property on Real City: ${property.value?.UnparsedAddress}`;
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  showShareModal.value = false;
};

const handleSave = () => {
  if (!authStore.isAuthenticated) {
    // Store the current URL to redirect back after login
    localStorage.setItem('redirectAfterLogin', window.location.pathname);
    router.push('/login');
    return;
  }
  // Handle save functionality for authenticated users
  // You'll need to implement this based on your requirements
  console.log('Saving property...');
};

onMounted(async () => {
  // Always start with loading state
  loading.value = true;
  error.value = null;
  
  try {
    // Always fetch TREB data on page load/refresh to ensure we have the data
    if (!propertyStore.trebData) {
      await propertyStore.getTrebData();
    }
    
    // Wait a bit for the computed property to update after data is loaded
    await nextTick();
    
    // Add a small delay to ensure data is fully processed
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Check if property exists after fetching data
    if (!property.value) {
      // Property not found even after fetching data
      error.value = 'Property not found';
      loading.value = false;
      return;
    }
    
    // Always fetch media for the property to get the actual image
    if (property.value) {
      try {
        await propertyStore.getTrebMedia(route.params.listingKey);
        // Get the first image from media array
        const media = propertyStore.getTrebMediaByListingKey(route.params.listingKey);
        if (media && media.length > 0) {
          propertyImage.value = media[0].MediaURL;
        }
      } catch (err) {
        console.error('Failed to fetch property media:', err);
      }
    }
  } catch (err) {
    error.value = err.message || 'Failed to load property details';
  } finally {
    // Add a minimum loading time for better UX
    setTimeout(() => {
      loading.value = false;
    }, 1000); // Show loader for at least 1 second
  }
});

// Watch for route changes to handle navigation from other pages
watch(() => route.params.listingKey, async (newListingKey, oldListingKey) => {
  if (newListingKey !== oldListingKey) {
    // Reset state for new property
    loading.value = true;
    error.value = null;
    propertyImage.value = null;
    
    try {
      // If property is not found in either searchResults or trebData, try to fetch TREB data
      if (!property.value && !propertyStore.trebData) {
        await propertyStore.getTrebData();
      }
      
      // Always fetch media for the property to get the actual image
      if (property.value) {
        try {
          await propertyStore.getTrebMedia(route.params.listingKey);
          // Get the first image from media array
          const media = propertyStore.getTrebMediaByListingKey(route.params.listingKey);
          if (media && media.length > 0) {
            propertyImage.value = media[0].MediaURL;
          }
        } catch (err) {
          console.error('Failed to fetch property media:', err);
        }
      }
      
      // If still no property found, show error
      if (!property.value) {
        error.value = 'Property not found';
      }
    } catch (err) {
      error.value = err.message || 'Failed to load property details';
    } finally {
      // Add a minimum loading time for better UX
      setTimeout(() => {
        loading.value = false;
      }, 1000); // Show loader for at least 1 second
    }
  }
});

// Watch for property changes to manage loading state
watch(property, (newProperty) => {
  if (newProperty && loading.value) {
    // Property found, keep loading for minimum time then stop
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
}, { immediate: true });

// Watch for TREB data changes to handle property finding after data loads
watch(() => propertyStore.trebData, (newTrebData) => {
  if (newTrebData && loading.value && !property.value) {
    // TREB data loaded, check if property exists now
    setTimeout(() => {
      if (!property.value) {
        error.value = 'Property not found';
      }
      loading.value = false;
    }, 500);
  }
}, { immediate: true, deep: true });
</script>

<style scoped>
.property-detail-page {
  min-height: 100vh;
  background: #f8fafc;
}

.content-wrapper {
  padding-top: 80px; /* Height of the GlobalHeader */
  min-height: calc(100vh - 80px); /* Viewport height minus header height */
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%);
  padding: 120px 20px;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.2;
  animation: pattern-move 20s linear infinite;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.hero-content h1 {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #ffffff, #e2e8f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: text-glow 2s ease-in-out infinite alternate;
}

.hero-content .subtitle {
  font-size: 1.75rem;
  color: #e2e8f0;
  margin-bottom: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem;
}

.gallery-section {
  position: relative;
  margin-bottom: 2rem;
}

.main-image {
  width: 100%;
  height: calc(100vh - 140px); /* Viewport height minus header and some padding */
  max-height: 600px; /* Maximum height to ensure it doesn't get too tall */
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.floating-badges {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  gap: 1rem;
  z-index: 2;
}

.status-badge, .transaction-type-badge {
  padding: 0.75rem 1.5rem;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 0.875rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-badge i, .transaction-type-badge i {
  font-size: 1rem;
}

.status-badge.active {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
}

.status-badge.active i {
  color: white;
}

.transaction-type-badge {
  color: #1E40AF;
}

.transaction-type-badge i {
  color: #1E40AF;
}

.gallery-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 0.75rem 1.5rem;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 0.875rem;
  background: rgba(255, 255, 255, 0.95);
  color: #1a1a1a;
  text-decoration: none;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 2;
}

.gallery-button i {
  font-size: 1rem;
}

.gallery-button:hover {
  background: #1E40AF;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.gallery-button:hover i {
  transform: scale(1.1);
}

@keyframes pattern-move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100px 100px;
  }
}

@keyframes text-glow {
  from {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
  to {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  }
}

.essential-info {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.price-section {
  margin-bottom: 1rem;
}

.price {
  font-size: 2.5rem;
  font-weight: 700;
  color: #0f172a;
}

.price span {
  font-size: 1rem;
  color: #64748b;
}

.mls-info {
  color: #64748b;
  font-size: 0.875rem;
}

.address-section h2 {
  font-size: 1.5rem;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.address-section p {
  color: #64748b;
}

.key-details {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
}

.detail-item {
  text-align: center;
}

.detail-item .icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.detail-item .value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f172a;
  display: block;
}

.detail-item .label {
  color: #64748b;
  font-size: 0.875rem;
}

.details-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.detail-section {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.detail-section h3 {
  font-size: 1.25rem;
  color: #0f172a;
  margin-bottom: 1.5rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-group h4 {
  color: #64748b;
  margin-bottom: 1rem;
}

.feature-group ul {
  list-style: none;
  padding: 0;
}

.feature-group li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
  color: #0f172a;
}

.details-list .detail-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.details-list .label {
  color: #64748b;
}

.details-list .value {
  color: #0f172a;
  font-weight: 500;
}

.loading-state {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 1024px) {
  .details-grid {
    grid-template-columns: 1fr;
  }

  .main-image {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .property-detail-page {
    padding: 1rem;
  }

  .detail-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .main-image {
    height: calc(100vh - 120px);
    max-height: 400px;
  }

  .price {
    font-size: 2rem;
  }

  .content-wrapper {
    padding-top: 60px; /* Adjusted for mobile header height if different */
  }
}

@media (max-width: 640px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .main-image {
    height: 250px;
  }
}

.action-buttons {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 12px;
  z-index: 10;
}

.action-button {
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.action-button i {
  font-size: 1rem;
}

.share-btn {
  color: #0066cc;
}

.save-btn {
  color: #1a1a1a;
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.share-modal {
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  padding: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  animation: modal-pop 0.3s ease-out;
}

.share-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.share-modal-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #64748b;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s;
}

.close-button:hover {
  background: #f1f5f9;
  color: #1a1a1a;
}

.share-modal-preview {
  background: #f8fafc;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  align-items: center;
}

.preview-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}

.preview-info {
  flex: 1;
}

.preview-title {
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 4px 0;
}

.preview-details {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0;
}

.share-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}

.share-option {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: #1a1a1a;
  cursor: pointer;
  transition: all 0.2s;
}

.share-option:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-2px);
}

.share-option i {
  font-size: 1.2rem;
}

/* Animation */
@keyframes modal-pop {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .share-modal {
    width: 95%;
    padding: 20px;
  }

  .share-options {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    top: 16px;
    right: 16px;
    gap: 8px;
  }

  .action-button {
    padding: 10px 16px;
    font-size: 0.8rem;
  }
}

.email-client-menu {
  min-width: 200px;
}

.email-client-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.email-client-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: none;
  background: #f8fafc;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #1a1a1a;
  width: 100%;
  text-align: left;
  transition: all 0.2s ease;
}

.email-client-option:hover {
  background: #e2e8f0;
}

.email-client-option i {
  font-size: 1.1rem;
}

.email-client-option[data-client="gmail"] i {
  color: #EA4335;
}

.email-client-option[data-client="outlook"] i {
  color: #0078D4;
}

.email-client-option[data-client="default"] i {
  color: #64748b;
}

/* Skeleton Loader Styles */
.skeleton-loader {
  padding-top: 80px;
  min-height: 100vh;
  background: #f8fafc;
}

.main-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem;
}

/* Gallery Section Skeleton */
.gallery-section {
  position: relative;
  margin-bottom: 2rem;
}

.main-image-skeleton {
  width: 100%;
  height: calc(100vh - 140px);
  max-height: 600px;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

.action-buttons-skeleton {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 12px;
  z-index: 10;
}

.action-button-skeleton {
  width: 80px;
  height: 40px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 12px;
  animation: shimmer 2s infinite;
}

.floating-badges-skeleton {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  gap: 1rem;
  z-index: 2;
}

.status-badge-skeleton,
.transaction-type-badge-skeleton {
  width: 80px;
  height: 32px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 1rem;
  animation: shimmer 2s infinite;
}

.gallery-button-skeleton {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 180px;
  height: 40px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 1rem;
  animation: shimmer 2s infinite;
}

/* Essential Info Skeleton */
.essential-info-skeleton {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.price-section-skeleton {
  margin-bottom: 1rem;
}

.price-skeleton {
  width: 200px;
  height: 40px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 8px;
  margin-bottom: 1rem;
  animation: shimmer 2s infinite;
}

.mls-info-skeleton {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.mls-line-skeleton {
  width: 120px;
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 2s infinite;
}

.address-section-skeleton {
  margin-bottom: 2rem;
}

.address-title-skeleton {
  width: 300px;
  height: 24px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  animation: shimmer 2s infinite;
}

.address-subtitle-skeleton {
  width: 200px;
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 2s infinite;
}

/* Key Details Grid Skeleton */
.key-details-skeleton {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

.detail-grid-skeleton {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
}

.detail-item-skeleton {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.detail-icon-skeleton {
  width: 32px;
  height: 32px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 50%;
  animation: shimmer 2s infinite;
}

.detail-value-skeleton {
  width: 60px;
  height: 20px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 2s infinite;
}

.detail-label-skeleton {
  width: 40px;
  height: 14px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 2s infinite;
}

/* Details Grid Skeleton */
.details-grid-skeleton {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.detail-section-skeleton {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-title-skeleton {
  width: 200px;
  height: 24px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  animation: shimmer 2s infinite;
}

.text-content-skeleton {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.text-line-skeleton {
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 2s infinite;
}

.text-line-skeleton:nth-child(1) { width: 100%; }
.text-line-skeleton:nth-child(2) { width: 90%; }
.text-line-skeleton:nth-child(3) { width: 85%; }
.text-line-skeleton:nth-child(4) { width: 70%; }
.text-line-skeleton:nth-child(5) { width: 60%; }

.features-grid-skeleton {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-group-skeleton {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-title-skeleton {
  width: 120px;
  height: 18px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 2s infinite;
}

.feature-list-skeleton {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature-item-skeleton {
  height: 14px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 2s infinite;
}

.feature-item-skeleton:nth-child(1) { width: 100%; }
.feature-item-skeleton:nth-child(2) { width: 90%; }
.feature-item-skeleton:nth-child(3) { width: 85%; }
.feature-item-skeleton:nth-child(4) { width: 80%; }

.details-list-skeleton {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-row-skeleton {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.detail-label-skeleton {
  width: 80px;
  height: 14px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 2s infinite;
}

.detail-value-skeleton {
  width: 120px;
  height: 14px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 2s infinite;
}

/* Shimmer Animation */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Responsive Design for Skeleton */
@media (max-width: 1024px) {
  .details-grid-skeleton {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .detail-grid-skeleton {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .main-image-skeleton {
    height: 400px;
  }
}

@media (max-width: 640px) {
  .detail-grid-skeleton {
    grid-template-columns: 1fr;
  }
  
  .main-image-skeleton {
    height: 250px;
  }
  
  .main-content {
    padding: 1rem;
  }
}
</style>
