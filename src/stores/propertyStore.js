// src/store/propertyStore.js
import { defineStore } from 'pinia'

export const usePropertyStore = defineStore('propertyStore', {
  state: () => ({
    properties: [
      {
        id: 1,
        name: 'Cedar Grove Estates',
        location: 'Austin, Texas',
        price: '$25,000',
        image:
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
      },
      {
        id: 2,
        name: 'Willow Creek Villa',
        location: 'Boulder, Colorado',
        price: '$35,000',
        image:
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
      },
      {
        id: 3,
        name: 'Willow Creek Villa',
        location: 'Boulder, Colorado',
        price: '$35,000',
        image:
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
      },
      {
        id: 4,
        name: 'Willow Creek Villa',
        location: 'Boulder, Colorado',
        price: '$35,000',
        image:
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
      },
      {
        id: 5,
        name: 'Willow Crelqjdobvooubo',
        location: 'Boulder, Colorado',
        price: '$35,000',
        image:
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
      },
      {
        id: 6,
        name: 'Alex Residence',
        location: 'Boulder, Colorado',
        price: '$35,000',
        image:
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
      },
      {
        id: 7,
        name: 'Alex Residence',
        location: 'Boulder, Colorado',
        price: '$35,000',
        image:
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
      },
      // More properties can be added dynamically
    ],
    currentIndex: 0, // For carousel navigation
  }),

  getters: {
    visibleProperties: (state) =>
      state.properties.slice(state.currentIndex, state.currentIndex + 4),
  },

  actions: {
    nextSlide() {
      if (this.currentIndex + 4 < this.properties.length) {
        this.currentIndex += 4
      }
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex -= 4
      }
    },
  },
})
