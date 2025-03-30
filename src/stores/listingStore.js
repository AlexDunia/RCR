import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useListingStore = defineStore('listingStore', () => {
  // State
  const listings = ref([
    {
      id: 101,
      agentId: 5, // Sarah Johnson
      title: 'Modern Downtown Apartment',
      address: '123 Main St, Downtown',
      price: 450000,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      type: 'Apartment',
      status: 'For Sale',
      description: 'Beautiful modern apartment in the heart of downtown with amazing views.',
      photos: [
        'https://res.cloudinary.com/example/image/upload/v123456/listing101_1.jpg',
        'https://res.cloudinary.com/example/image/upload/v123456/listing101_2.jpg'
      ],
      features: ['Hardwood Floors', 'Stainless Steel Appliances', 'Balcony']
    },
    {
      id: 102,
      agentId: 8, // Michael Chen
      title: 'Suburban Family Home',
      address: '456 Oak Street, Pleasantville',
      price: 650000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2400,
      type: 'Single Family',
      status: 'For Sale',
      description: 'Spacious family home in a quiet neighborhood with excellent schools.',
      photos: [
        'https://res.cloudinary.com/example/image/upload/v123456/listing102_1.jpg',
        'https://res.cloudinary.com/example/image/upload/v123456/listing102_2.jpg'
      ],
      features: ['Finished Basement', 'Large Backyard', 'Two-Car Garage']
    },
    {
      id: 103,
      agentId: 5, // Sarah Johnson
      title: 'Luxury Waterfront Condo',
      address: '789 Harbor View, Bayfront',
      price: 1200000,
      bedrooms: 3,
      bathrooms: 3.5,
      sqft: 2200,
      type: 'Condo',
      status: 'For Sale',
      description: 'Stunning waterfront condo with panoramic views and luxury finishes throughout.',
      photos: [
        'https://res.cloudinary.com/example/image/upload/v123456/listing103_1.jpg',
        'https://res.cloudinary.com/example/image/upload/v123456/listing103_2.jpg'
      ],
      features: ['Private Balcony', 'Pool Access', 'Concierge Service']
    },
    {
      id: 105,
      agentId: 8, // Michael Chen
      title: 'Mountain Retreat Cabin',
      address: '241 Pine Ridge, Mountain View',
      price: 520000,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      type: 'Cabin',
      status: 'For Sale',
      description: 'Cozy mountain cabin with breathtaking views and modern amenities.',
      photos: [
        'https://res.cloudinary.com/example/image/upload/v123456/listing105_1.jpg',
        'https://res.cloudinary.com/example/image/upload/v123456/listing105_2.jpg'
      ],
      features: ['Stone Fireplace', 'Large Deck', 'Hot Tub']
    }
  ])

  // Getters
  const getListingById = (id) => {
    return listings.value.find(listing => listing.id === id)
  }

  const getAllListings = () => {
    return listings.value
  }

  const getFeaturedListings = () => {
    return listings.value.slice(0, 3) // Return first 3 listings as featured
  }

  // Get listings by agent ID
  const getListingsByAgentId = (agentId) => {
    return listings.value.filter(listing => listing.agentId === agentId)
  }

  // Actions
  function addListing(listing) {
    const newListing = {
      id: generateListingId(),
      agentId: listing.agentId || null, // Ensure agent ID is included
      ...listing
    }

    listings.value.push(newListing)
    return newListing.id
  }

  function updateListing(id, updates) {
    const index = listings.value.findIndex(listing => listing.id === id)

    if (index !== -1) {
      listings.value[index] = {
        ...listings.value[index],
        ...updates
      }
      return true
    }

    return false
  }

  function deleteListing(id) {
    const index = listings.value.findIndex(listing => listing.id === id)

    if (index !== -1) {
      listings.value.splice(index, 1)
      return true
    }

    return false
  }

  // Helper method to generate unique listing ID
  function generateListingId() {
    return Math.max(0, ...listings.value.map(listing => listing.id)) + 1
  }

  return {
    // State
    listings,

    // Getters
    getListingById,
    getAllListings,
    getFeaturedListings,
    getListingsByAgentId,

    // Actions
    addListing,
    updateListing,
    deleteListing
  }
})
