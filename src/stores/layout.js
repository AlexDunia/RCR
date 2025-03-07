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
      this.hideSidebar = hideSidebar ?? false;
      this.hideHeader = hideHeader ?? false;
      this.background = background ?? '#F4F4F4';

      // Force reactivity update
      this.$patch({
        hideSidebar: this.hideSidebar,
        hideHeader: this.hideHeader,
        background: this.background
      });
    }
  }
});
