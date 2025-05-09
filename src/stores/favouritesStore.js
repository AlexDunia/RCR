import { defineStore } from 'pinia';

export const useFavouritesStore = defineStore('favourites', {
  state: () => ({
    favouriteAgents: [],    // Array of agent IDs
    favouriteProperties: [] // Array of property IDs
  }),

  getters: {
    // Check if an agent is favorited
    isAgentFavourite: (state) => (agentId) => {
      return state.favouriteAgents.includes(agentId);
    },

    // Check if a property is favorited
    isPropertyFavourite: (state) => (propertyId) => {
      return state.favouriteProperties.includes(propertyId);
    },

    // Get all favorite agents
    getAllFavouriteAgents: (state) => {
      return state.favouriteAgents;
    },

    // Get all favorite properties
    getAllFavouriteProperties: (state) => {
      return state.favouriteProperties;
    }
  },

  actions: {
    // Initialize favorites from localStorage
    initFavourites() {
      const storedAgents = localStorage.getItem('favourite-agents');
      const storedProperties = localStorage.getItem('favourite-properties');

      if (storedAgents) {
        this.favouriteAgents = JSON.parse(storedAgents);
      }

      if (storedProperties) {
        this.favouriteProperties = JSON.parse(storedProperties);
      }
    },

    // Toggle an agent as favorite
    toggleFavouriteAgent(agentId) {
      const index = this.favouriteAgents.indexOf(agentId);

      if (index > -1) {
        // Remove from favorites
        this.favouriteAgents.splice(index, 1);
      } else {
        // Add to favorites
        this.favouriteAgents.push(agentId);
      }

      // Save to localStorage
      this.saveFavouriteAgents();
    },

    // Toggle a property as favorite
    toggleFavouriteProperty(propertyId) {
      const index = this.favouriteProperties.indexOf(propertyId);

      if (index > -1) {
        // Remove from favorites
        this.favouriteProperties.splice(index, 1);
      } else {
        // Add to favorites
        this.favouriteProperties.push(propertyId);
      }

      // Save to localStorage
      this.saveFavouriteProperties();
    },

    // Save agents to localStorage
    saveFavouriteAgents() {
      localStorage.setItem('favourite-agents', JSON.stringify(this.favouriteAgents));
    },

    // Save properties to localStorage
    saveFavouriteProperties() {
      localStorage.setItem('favourite-properties', JSON.stringify(this.favouriteProperties));
    },

    // Clear all favorites
    clearAllFavourites() {
      this.favouriteAgents = [];
      this.favouriteProperties = [];
      localStorage.removeItem('favourite-agents');
      localStorage.removeItem('favourite-properties');
    }
  }
});
