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
        isFavorite: true,
        status: 'For Sale',
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=60',
        description: 'A beautiful residential estate located in Austin, Texas.',
        images: [
          'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=60',
          'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&auto=format&fit=crop&q=60',
          'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=800&auto=format&fit=crop&q=60',
          'https://images.unsplash.com/photo-1592928302636-c83cf1e1c887?w=800&auto=format&fit=crop&q=60',
          'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=60',
          'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&auto=format&fit=crop&q=60'
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
        isFavorite: false,
        status: 'For Rent',
        image: 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=800&auto=format&fit=crop&q=60',
        description: 'A spacious commercial villa in Boulder, Colorado.',
        images: [
          'https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=800&auto=format&fit=crop&q=60',
          'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&auto=format&fit=crop&q=60',
          'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=800&auto=format&fit=crop&q=60',
          'https://images.unsplash.com/photo-1592928302636-c83cf1e1c887?w=800&auto=format&fit=crop&q=60'
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
        isFavorite: true,
        status: 'New',
        image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&auto=format&fit=crop&q=60',
        description: 'A cozy residential cottage in Portland, Oregon.',
        images: [
          'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&auto=format&fit=crop&q=60',
          'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&auto=format&fit=crop&q=60',
          'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=800&auto=format&fit=crop&q=60',
          'https://images.unsplash.com/photo-1592928302636-c83cf1e1c887?w=800&auto=format&fit=crop&q=60'
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
        image: 'https://images.unsplash.com/photo-1592595896616-c37162298647?w=800&auto=format&fit=crop&q=60',
        description: 'A luxurious mansion located in Seattle, Washington.',
        images: [
          'https://images.unsplash.com/photo-1592595896616-c37162298647?w=800&auto=format&fit=crop&q=60',
          'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&auto=format&fit=crop&q=60',
          'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=800&auto=format&fit=crop&q=60',
          'https://images.unsplash.com/photo-1592928302636-c83cf1e1c887?w=800&auto=format&fit=crop&q=60'
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
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60',
        description: 'Modern apartments in the heart of San Francisco, California.',
        images: [
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60',
          'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&auto=format&fit=crop&q=60',
          'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=800&auto=format&fit=crop&q=60',
          'https://images.unsplash.com/photo-1592928302636-c83cf1e1c887?w=800&auto=format&fit=crop&q=60'
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
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=60',
        description: 'A charming residence in Denver, Colorado.',
        images: [
          'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=60',
          'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&auto=format&fit=crop&q=60',
          'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=800&auto=format&fit=crop&q=60',
          'https://images.unsplash.com/photo-1592928302636-c83cf1e1c887?w=800&auto=format&fit=crop&q=60'
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
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60',
        description: 'A beautiful villa in Salt Lake City, Utah.',
        images: [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60',
          'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&auto=format&fit=crop&q=60',
          'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=800&auto=format&fit=crop&q=60',
          'https://images.unsplash.com/photo-1592928302636-c83cf1e1c887?w=800&auto=format&fit=crop&q=60'
        ]
      },
      // More properties can be added dynamically
    ],
    currentIndex: 0, // For carousel navigation
  }),

  getters: {
    visibleProperties: (state) =>
      state.properties.slice(state.currentIndex, state.currentIndex + 4),

    favoriteProperties: (state) =>
      state.properties.filter(property => property.isFavorite),
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
    toggleFavorite(propertyId) {
      const property = this.properties.find(p => p.id === propertyId);
      if (property) {
        property.isFavorite = !property.isFavorite;
      }
    },
  },
})
