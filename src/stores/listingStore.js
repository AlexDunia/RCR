import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useListingStore = defineStore('listingStore', () => {
  // State
  const listings = ref([
    {
      id: 101,
      agentId: 5, // Sarah Johnson
      title: 'Modern Downtown Apartment',
      address: '123 Main St, Downtown, Columbia',
      price: 450000,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      type: 'Apartment',
      status: 'For Sale',
      description: 'Beautiful modern apartment in the heart of downtown with amazing views.',
      photos: [
        'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548284/Rectangle_227_ncwnmz.png'
      ],
      features: ['Hardwood Floors', 'Stainless Steel Appliances', 'Balcony']
    },
    {
      id: 102,
      agentId: 8, // Michael Chen
      title: 'Suburban Family Home',
      address: '456 Oak Street, Pleasantville, New York',
      price: 650000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2400,
      type: 'Single Family',
      status: 'For Sale',
      description: 'Spacious family home in a quiet neighborhood with excellent schools.',
      photos: [
        'https://res.cloudinary.com/dnuhjsckk/image/upload/v1743087291/Designer_8_1_fjvyi0.png'
      ],
      features: ['Finished Basement', 'Large Backyard', 'Two-Car Garage']
    },
    {
      id: 103,
      agentId: 10, // Jessica Ramirez
      title: 'Luxury Waterfront Condo',
      address: '789 Harbor View, Bayfront, Miami',
      price: 1200000,
      bedrooms: 3,
      bathrooms: 3.5,
      sqft: 2200,
      type: 'Condo',
      status: 'For Sale',
      description: 'Stunning waterfront condo with panoramic views and luxury finishes throughout.',
      photos: [
        'https://res.cloudinary.com/dnuhjsckk/image/upload/v1739548295/newtwoimage1_2_ti4hfi.png'
      ],
      features: ['Private Balcony', 'Pool Access', 'Concierge Service']
    },
    {
      id: 105,
      agentId: 12, // David Thompson
      title: 'Mountain Retreat Cabin',
      address: '241 Pine Ridge, Mountain View, Los Angeles',
      price: 520000,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      type: 'Cabin',
      status: 'For Sale',
      description: 'Cozy mountain cabin with breathtaking views and modern amenities.',
      photos: [
        'https://res.cloudinary.com/dnuhjsckk/image/upload/v1718259997/house1_eogyom.jpg'
      ],
      features: ['Stone Fireplace', 'Large Deck', 'Hot Tub']
    },
    {
      id: 106,
      agentId: 15, // Olivia Wilson
      title: 'Contemporary Urban Loft',
      address: '567 Wacker Drive, Downtown, Chicago',
      price: 690000,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1650,
      type: 'Loft',
      status: 'For Sale',
      description: 'Stylish urban loft with high ceilings, exposed brick and modern amenities.',
      photos: [
        'https://res.cloudinary.com/example/image/upload/v123456/listing106_1.jpg',
        'https://res.cloudinary.com/example/image/upload/v123456/listing106_2.jpg'
      ],
      features: ['Industrial Design', 'Gourmet Kitchen', 'Building Gym']
    },
    {
      id: 107,
      agentId: 5, // Sarah Johnson
      title: 'Lakefront Estate',
      address: '321 Lake Shore Dr, Columbia',
      price: 1750000,
      bedrooms: 5,
      bathrooms: 4.5,
      sqft: 4800,
      type: 'Luxury Estate',
      status: 'For Sale',
      description: 'Magnificent estate with direct lake access and panoramic water views.',
      photos: [
        'https://res.cloudinary.com/example/image/upload/v123456/listing107_1.jpg',
        'https://res.cloudinary.com/example/image/upload/v123456/listing107_2.jpg'
      ],
      features: ['Private Dock', 'Wine Cellar', 'Home Theater']
    },
    {
      id: 108,
      agentId: 8, // Michael Chen
      title: 'Penthouse Apartment',
      address: '888 Fifth Avenue, Manhattan, New York',
      price: 3200000,
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2800,
      type: 'Penthouse',
      status: 'For Sale',
      description: 'Luxurious penthouse with 360-degree views of the city skyline.',
      photos: [
        'https://res.cloudinary.com/example/image/upload/v123456/listing108_1.jpg',
        'https://res.cloudinary.com/example/image/upload/v123456/listing108_2.jpg'
      ],
      features: ['Private Elevator', 'Rooftop Terrace', 'Smart Home System']
    },
    {
      id: 109,
      agentId: 10, // Jessica Ramirez
      title: 'Historic Art Deco Home',
      address: '742 Ocean Drive, South Beach, Miami',
      price: 875000,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1950,
      type: 'Historic Home',
      status: 'For Sale',
      description: 'Beautifully restored Art Deco home with original details and modern updates.',
      photos: [
        'https://res.cloudinary.com/example/image/upload/v123456/listing109_1.jpg',
        'https://res.cloudinary.com/example/image/upload/v123456/listing109_2.jpg'
      ],
      features: ['Original Tile Work', 'Tropical Garden', 'Period Details']
    },
    {
      id: 110,
      agentId: 12, // David Thompson
      title: 'Hollywood Hills Mansion',
      address: '1250 Sunset Plaza Dr, Hollywood Hills, Los Angeles',
      price: 4950000,
      bedrooms: 6,
      bathrooms: 7,
      sqft: 6500,
      type: 'Mansion',
      status: 'For Sale',
      description: 'Spectacular mansion with stunning city views and resort-style amenities.',
      photos: [
        'https://res.cloudinary.com/example/image/upload/v123456/listing110_1.jpg',
        'https://res.cloudinary.com/example/image/upload/v123456/listing110_2.jpg'
      ],
      features: ['Infinity Pool', 'Home Gym', 'Wine Cellar']
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
