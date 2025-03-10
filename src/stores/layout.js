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
