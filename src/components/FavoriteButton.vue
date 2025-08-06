<template>
  <div
    class="favorite-button"
    :class="{
      'favorite-button--loading': loading,
      'favorite-button--favorited': isFavorited,
      'favorite-button--disabled': disabled
    }"
    @click="handleClick"
    :title="buttonTitle"
  >
    <i v-if="loading" class="fas fa-spinner fa-spin"></i>
    <i v-else :class="heartIconClass"></i>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFavouritesStore } from '@/stores/favouritesStore'

const props = defineProps({
  // Property data (for properties)
  property: {
    type: Object,
    default: null
  },
  // Agent ID (for agents)
  agentId: {
    type: [Number, String],
    default: null
  },
  // Property type: 'local' or 'treb'
  propertyType: {
    type: String,
    default: 'local',
    validator: (value) => ['local', 'treb'].includes(value)
  },
  // Disable the button
  disabled: {
    type: Boolean,
    default: false
  },
  // Custom size: 'sm', 'md', 'lg'
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

const emit = defineEmits(['toggle', 'error'])

const favouritesStore = useFavouritesStore()

// Computed properties
const isFavorited = computed(() => {
  if (props.agentId) {
    return favouritesStore.isAgentFavourite(props.agentId)
  }

  if (props.property) {
    if (props.propertyType === 'treb') {
      return favouritesStore.isTrebPropertyFavourite(props.property.ListingKey)
    }
    return favouritesStore.isPropertyFavourite(props.property.id)
  }

  return false
})

const loading = computed(() => favouritesStore.loading)

const heartIconClass = computed(() => {
  return isFavorited.value ? 'fas fa-heart' : 'far fa-heart'
})

const buttonTitle = computed(() => {
  if (loading.value) return 'Loading...'
  if (disabled.value) return 'Not available'
  return isFavorited.value ? 'Remove from favorites' : 'Add to favorites'
})

// Methods
const handleClick = async () => {
  if (disabled.value || loading.value) return

  try {
    if (props.agentId) {
      // Handle agent favorite
      favouritesStore.toggleFavouriteAgent(props.agentId)
      emit('toggle', { agentId: props.agentId, isFavorited: !isFavorited.value })
    } else if (props.property) {
      // Handle property favorite
      if (props.propertyType === 'treb') {
        await favouritesStore.toggleFavouriteTrebProperty(props.property)
        emit('toggle', {
          property: props.property,
          propertyType: 'treb',
          isFavorited: !isFavorited.value
        })
      } else {
        await favouritesStore.toggleFavouriteProperty(props.property)
        emit('toggle', {
          property: props.property,
          propertyType: 'local',
          isFavorited: !isFavorited.value
        })
      }
    }
  } catch (error) {
    console.error('Error toggling favorite:', error)
    emit('error', error)
  }
}
</script>

<style scoped>
.favorite-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.favorite-button:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.favorite-button--loading {
  cursor: not-allowed;
  opacity: 0.7;
}

.favorite-button--favorited {
  background: rgba(255, 255, 255, 0.95);
  border-color: #e53e3e;
}

.favorite-button--favorited i {
  color: #e53e3e;
}

.favorite-button--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.favorite-button--disabled:hover {
  transform: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Size variants */
.favorite-button {
  width: 32px;
  height: 32px;
}

.favorite-button.size-sm {
  width: 24px;
  height: 24px;
}

.favorite-button.size-lg {
  width: 40px;
  height: 40px;
}

.favorite-button i {
  font-size: 14px;
  color: #666;
  transition: color 0.2s ease;
}

.favorite-button.size-sm i {
  font-size: 12px;
}

.favorite-button.size-lg i {
  font-size: 18px;
}

.favorite-button:hover i {
  color: #e53e3e;
}

.favorite-button--favorited:hover i {
  color: #c53030;
}

/* Animation for heart icon */
.favorite-button i.fas {
  animation: heartBeat 0.3s ease-in-out;
}

@keyframes heartBeat {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

/* Loading spinner */
.favorite-button i.fa-spinner {
  color: #666;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .favorite-button {
    width: 28px;
    height: 28px;
  }

  .favorite-button i {
    font-size: 12px;
  }
}
</style>
