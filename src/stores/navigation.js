import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    activeMenu: 'dashboard', // Tracks the selected sidebar menu
    activePage: 'Manage Listings', // Tracks the current page title
  }),
  actions: {
    setActiveMenu(menu) {
      this.activeMenu = menu
    },
    setActivePage(page) {
      this.activePage = page
    },
  },
})
