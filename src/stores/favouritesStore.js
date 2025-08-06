import { defineStore } from 'pinia';
import { useAuthStore } from './authStore';

export const useFavouritesStore = defineStore('favourites', {
  state: () => ({
    favouriteAgents: [],
    favouriteProperties: [],
    favouriteTrebProperties: [],
    loading: false,
    error: null
  }),

  getters: {
    isAgentFavourite: (state) => (agentId) => {
      return state.favouriteAgents.includes(agentId);
    },
    isPropertyFavourite: (state) => (propertyId) => {
      return state.favouriteProperties.some(property => property.id === propertyId);
    },
    isTrebPropertyFavourite: (state) => (listingKey) => {
      return state.favouriteTrebProperties.some(property => property.ListingKey === listingKey);
    },
    getAllFavouriteAgents: (state) => {
      return state.favouriteAgents;
    },
    getAllFavouriteProperties: (state) => {
      return state.favouriteProperties;
    },
    getAllFavouriteTrebProperties: (state) => {
      return state.favouriteTrebProperties;
    },
    getAllFavourites: (state) => {
      return {
        local: state.favouriteProperties,
        treb: state.favouriteTrebProperties
      };
    }
  },

  actions: {
    initFavourites() {
      const storedAgents = localStorage.getItem('favourite-agents');
      const storedProperties = localStorage.getItem('favourite-properties');
      const storedTrebProperties = localStorage.getItem('favourite-treb-properties');
      if (storedAgents) {
        this.favouriteAgents = JSON.parse(storedAgents);
      }
      if (storedProperties) {
        this.favouriteProperties = JSON.parse(storedProperties);
      }
      if (storedTrebProperties) {
        this.favouriteTrebProperties = JSON.parse(storedTrebProperties);
      }
    },

    toggleFavouriteAgent(agentId) {
      const index = this.favouriteAgents.indexOf(agentId);
      if (index > -1) {
        this.favouriteAgents.splice(index, 1);
      } else {
        this.favouriteAgents.push(agentId);
      }
      this.saveFavouriteAgents();
    },

    async toggleFavouriteProperty(propertyData) {
      try {
        this.loading = true;
        this.error = null;
        console.log('Starting toggleFavouriteProperty for:', propertyData.id);
        const existingIndex = this.favouriteProperties.findIndex(property => property.id === propertyData.id);
        if (existingIndex > -1) {
          console.log('Removing property from favorites');
          this.favouriteProperties.splice(existingIndex, 1);
          await this.toggleFavoriteAPI(propertyData.id, 'local');
          console.log('Successfully toggled favorite via API');
        } else {
          console.log('Adding property to favorites');
          const favoriteProperty = {
            ...propertyData,
            favoritedAt: new Date().toISOString(),
            propertyType: 'local'
          };
          this.favouriteProperties.push(favoriteProperty);
          await this.toggleFavoriteAPI(propertyData.id, 'local');
          console.log('Successfully toggled favorite via API');
        }
        this.saveFavouriteProperties();
        console.log('Saved to localStorage. Current favorites:', this.favouriteProperties.length);
      } catch (error) {
        this.error = error.message || 'Failed to toggle favorite';
        console.error('Error toggling favorite:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async toggleFavouriteTrebProperty(trebPropertyData) {
      try {
        this.loading = true;
        this.error = null;
        console.log('Starting toggleFavouriteTrebProperty for:', trebPropertyData.ListingKey);
        const existingIndex = this.favouriteTrebProperties.findIndex(property => property.ListingKey === trebPropertyData.ListingKey);
        if (existingIndex > -1) {
          console.log('Removing TREB property from favorites');
          this.favouriteTrebProperties.splice(existingIndex, 1);
          await this.toggleFavoriteAPI(trebPropertyData.ListingKey, 'treb');
          console.log('Successfully toggled TREB favorite via API');
        } else {
          console.log('Adding TREB property to favorites');
          const favoriteTrebProperty = {
            ...trebPropertyData,
            favoritedAt: new Date().toISOString(),
            propertyType: 'treb'
          };
          this.favouriteTrebProperties.push(favoriteTrebProperty);
          await this.toggleFavoriteAPI(trebPropertyData.ListingKey, 'treb');
          console.log('Successfully toggled TREB favorite via API');
        }
        this.saveFavouriteTrebProperties();
        console.log('Saved TREB properties to localStorage. Current favorites:', this.favouriteTrebProperties.length);
      } catch (error) {
        this.error = error.message || 'Failed to toggle TREB favorite';
        console.error('Error toggling TREB favorite:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    saveFavouriteAgents() {
      localStorage.setItem('favourite-agents', JSON.stringify(this.favouriteAgents));
    },

    saveFavouriteProperties() {
      console.log('Saving local properties to localStorage:', this.favouriteProperties.length, 'properties');
      localStorage.setItem('favourite-properties', JSON.stringify(this.favouriteProperties));
      console.log('Local properties saved successfully');
    },

    saveFavouriteTrebProperties() {
      console.log('Saving TREB properties to localStorage:', this.favouriteTrebProperties.length, 'properties');
      localStorage.setItem('favourite-treb-properties', JSON.stringify(this.favouriteTrebProperties));
      console.log('TREB properties saved successfully');
    },

    clearAllFavourites() {
      this.favouriteAgents = [];
      this.favouriteProperties = [];
      this.favouriteTrebProperties = [];
      localStorage.removeItem('favourite-agents');
      localStorage.removeItem('favourite-properties');
      localStorage.removeItem('favourite-treb-properties');
    },

    getPropertyById(propertyId) {
      const localProperty = this.favouriteProperties.find(property => property.id === propertyId);
      if (localProperty) return localProperty;
      const trebProperty = this.favouriteTrebProperties.find(property => property.ListingKey === propertyId);
      return trebProperty || null;
    },

    async toggleFavoriteAPI(propertyId, propertyType = 'local') {
      try {
        const authStore = useAuthStore();
        const response = await fetch('/api/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authStore.token}`
          },
          body: JSON.stringify({
            property_id: propertyId,
            property_type: propertyType
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Successfully toggled favorite via API:', data);
        return data;
      } catch (error) {
        console.error('Error toggling favorite via API:', error);
        throw error;
      }
    }
  }
});
