// src/store/propertyStore.js
import { defineStore } from 'pinia'

export const usePropertyStore = defineStore('propertyStore', {
  state: () => ({
    properties: [
      {
        id: 1,
        name: 'Cedar Grove Estates',
        location: 'Austin, Texas',
        address: '123 Cedar Grove, Austin, TX 78701',
        price: '$25,000',
        bedrooms: 3,
        bathrooms: 6,
        size: 1700,
        type: 'Residential',
        image:
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
        description: 'A beautiful residential estate located in Austin, Texas.',
        images: [
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1718259997/house1_eogyom.jpg',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1718259997/house1_eogyom.jpg',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png'
        ]
      },
      {
        id: 2,
        name: 'Willow Creek Villa',
        location: 'Boulder, Colorado',
        address: '456 Willow Creek, Boulder, CO 80301',
        price: '$35,000',
        bedrooms: 4,
        bathrooms: 5,
        size: 2000,
        type: 'Commercial',
        image:
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
        description: 'A spacious commercial villa in Boulder, Colorado.',
        images: [
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1718259997/house1_eogyom.jpg',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1718259997/house1_eogyom.jpg',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png'
        ]
      },
      {
        id: 3,
        name: 'Maple Leaf Cottage',
        location: 'Portland, Oregon',
        address: '789 Maple Leaf, Portland, OR 97201',
        price: '$45,000',
        bedrooms: 5,
        bathrooms: 4,
        size: 2500,
        type: 'Residential',
        image:
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
        description: 'A cozy residential cottage in Portland, Oregon.',
        images: [
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1718259997/house1_eogyom.jpg',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1718259997/house1_eogyom.jpg',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png'
        ]
      },
      {
        id: 4,
        name: 'Pine Hill Mansion',
        location: 'Seattle, Washington',
        address: '101 Pine Hill, Seattle, WA 98101',
        price: '$55,000',
        bedrooms: 6,
        bathrooms: 7,
        size: 3000,
        type: 'Luxury',
        image:
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
        description: 'A luxurious mansion located in Seattle, Washington.',
        images: [
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1718259997/house1_eogyom.jpg',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1718259997/house1_eogyom.jpg',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png'
        ]
      },
      {
        id: 5,
        name: 'Oakwood Apartments',
        location: 'San Francisco, California',
        address: '202 Oakwood, San Francisco, CA 94101',
        price: '$65,000',
        bedrooms: 2,
        bathrooms: 2,
        size: 1200,
        type: 'Apartment',
        image:
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
        description: 'Modern apartments in the heart of San Francisco, California.',
        images: [
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1718259997/house1_eogyom.jpg',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1718259997/house1_eogyom.jpg',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png'
        ]
      },
      {
        id: 6,
        name: 'Birchwood Residence',
        location: 'Denver, Colorado',
        address: '303 Birchwood, Denver, CO 80201',
        price: '$75,000',
        bedrooms: 3,
        bathrooms: 3,
        size: 1500,
        type: 'Residential',
        image:
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
        description: 'A charming residence in Denver, Colorado.',
        images: [
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1718259997/house1_eogyom.jpg',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1718259997/house1_eogyom.jpg',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png'
        ]
      },
      {
        id: 7,
        name: 'Spruce Villa',
        location: 'Salt Lake City, Utah',
        address: '404 Spruce Villa, Salt Lake City, UT 84101',
        price: '$85,000',
        bedrooms: 4,
        bathrooms: 4,
        size: 1800,
        type: 'Villa',
        image:
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
        description: 'A beautiful villa in Salt Lake City, Utah.',
        images: [
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1718259997/house1_eogyom.jpg',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1718259997/house1_eogyom.jpg',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png',
          'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png'
        ]
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
