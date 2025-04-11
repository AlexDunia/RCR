// stores/layout.js
import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    hideSidebar: false,
    hideHeader: false,
    background: '#f4f4f4'
  }),

  actions: {
    setLayout({ hideSidebar, hideHeader, background }) {
      // Set new values
      this.hideSidebar = hideSidebar ?? false;
      this.hideHeader = hideHeader ?? false;
      this.background = background ?? '#F4F4F4';

      // Force reactivity update with a direct patch
      this.$patch({
        hideSidebar: this.hideSidebar,
        hideHeader: this.hideHeader,
        background: this.background
      });
    },

    // Add individual setters for more granular control
    setSidebarVisibility(isVisible) {
      this.hideSidebar = !isVisible;
    },

    // Force sidebar to be visible and persist this setting
    forceSidebarVisible() {
      // Set state
      this.hideSidebar = false;

      // Store in localStorage for persistence
      localStorage.setItem('forceSidebarVisible', 'true');

      // Force reactivity update
      this.$patch({
        hideSidebar: false
      });

      console.log('Sidebar visibility forced to visible');
    },

    // Check if sidebar should be forced visible
    checkForcedSidebar() {
      if (localStorage.getItem('forceSidebarVisible') === 'true') {
        // Ensure state is updated
        this.hideSidebar = false;
        return true;
      }
      return false;
    },

    setHeaderVisibility(isVisible) {
      this.hideHeader = !isVisible;
    },

    setBackgroundColor(color) {
      this.background = color || '#F4F4F4';
    },

    resetBackgroundColor() {
      this.background = '#F4F4F4';
    },

    // Add a method to reset the layout to default values
    resetLayout() {
      this.setLayout({
        hideSidebar: false,
        hideHeader: false,
        background: '#F4F4F4'
      });
    }
  }
});
