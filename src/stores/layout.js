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
      console.log(`Setting layout: hideSidebar=${hideSidebar}, hideHeader=${hideHeader}, background=${background}`);

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

      console.log(`Layout updated: hideSidebar=${this.hideSidebar}, hideHeader=${this.hideHeader}`);
    },

    // Add a method to reset the layout to default values
    resetLayout() {
      console.log('Resetting layout to default values');

      this.setLayout({
        hideSidebar: false,
        hideHeader: false,
        background: '#F4F4F4'
      });
    }
  }
});
