import { defineStore } from 'pinia'

export const useHeaderStore = defineStore('header', {
  state: () => ({
    title: 'Dashboard', // Default title
  }),
  actions: {
    setTitle(newTitle) {
      this.title = newTitle
    },
  },
})
