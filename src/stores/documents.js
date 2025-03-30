import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDocumentStore = defineStore('documents', () => {
  // State
  const documents = ref([
    {
      id: '1',
      name: 'Buyer Rep Agreement',
      type: 'buyer-rep',
      buyerName: 'Lucas Belmar',
      buyerEmail: 'lucasbelmar@example.com',
      phoneNumber: '555-123-4567',
      propertyType: 'Single Family Home',
      budgetRange: '$200,000-$500,000',
      description: 'Standard buyer representation agreement outlining terms and conditions.',
      createdAt: '2024-03-15',
      clientId: 1, // Alex Dunia
      files: [
        {
          id: '1',
          name: 'BuyerRepAgreement-Final.pdf',
          type: 'application/pdf',
          size: 1024 * 1024 * 1.5
        }
      ],
      agents: [
        {
          id: 1,
          name: 'Pristia Candra',
          email: 'pristia@example.com',
          avatar: '/img/avatars/pristia.jpg',
          experience: '3y experiences'
        }
      ]
    },
    {
      id: '2',
      name: 'Seller Rep Agreement',
      type: 'seller-rep',
      sellerName: 'Sarah Wilson',
      sellerEmail: 'sarah.wilson@example.com',
      phoneNumber: '555-456-7890',
      propertyType: 'Single Family Home',
      propertyAddress: '456 Elm Street, Columbia, CA 90001',
      listingPrice: '$750,000',
      description: 'Seller representation agreement for property listing.',
      createdAt: '2024-03-14',
      clientId: 2, // Jane Smith
      files: [],
      agents: []
    },
    {
      id: '3',
      name: 'MLS Listing Agreement',
      type: 'mls',
      propertyAddress: '123 Main Street, Columbia, CA 90001',
      listingPrice: '$895,000',
      bedrooms: '4',
      bathrooms: '3',
      squareFootage: '2,800',
      propertyDescription: 'Beautiful single-family home with open floor plan, updated kitchen, and large backyard. Perfect for families looking for extra space and modern amenities.',
      description: 'MLS listing agreement for 123 Main Street property.',
      createdAt: '2024-03-10',
      clientId: 1, // Alex Dunia
      files: [
        {
          id: '3',
          name: 'MLSListingAgreement.pdf',
          type: 'application/pdf',
          size: 1024 * 1024 * 2.5
        }
      ],
      agents: [
        {
          id: 5,
          name: 'Sarah Johnson',
          email: 'sarah.johnson@realestateagency.com',
          avatar: 'https://res.cloudinary.com/example/image/upload/v123456/sarah_johnson.jpg',
          experience: '10y experiences'
        }
      ]
    },
    {
      id: '4',
      name: 'Buyer Rep Agreement',
      type: 'buyer-rep',
      buyerName: 'Alex Dunia',
      buyerEmail: 'alex.dunia@example.com',
      phoneNumber: '555-987-6543',
      propertyType: 'Condo',
      budgetRange: '$300,000-$600,000',
      description: 'Buyer representation agreement for new property search.',
      createdAt: '2024-03-12',
      clientId: 1, // Alex Dunia
      files: [
        {
          id: '4',
          name: 'BuyerRepAgreement.pdf',
          type: 'application/pdf',
          size: 1024 * 1024 * 3.2
        }
      ],
      agents: [
        {
          id: 5,
          name: 'Sarah Johnson',
          email: 'sarah.johnson@realestateagency.com',
          avatar: 'https://res.cloudinary.com/example/image/upload/v123456/sarah_johnson.jpg',
          experience: '10y experiences'
        }
      ]
    },
    {
      id: '5',
      name: 'Seller Rep Agreement',
      type: 'seller-rep',
      sellerName: 'Alex Dunia',
      sellerEmail: 'alex.dunia@example.com',
      phoneNumber: '555-987-6543',
      propertyType: 'Townhouse',
      propertyAddress: '456 Oak Avenue, Portland, OR 97205',
      listingPrice: '$625,000',
      description: 'Seller representation agreement for property at 456 Oak Avenue.',
      createdAt: '2024-03-05',
      clientId: 1, // Alex Dunia
      files: [
        {
          id: '6',
          name: 'SellerRepAgreement.pdf',
          type: 'application/pdf',
          size: 1024 * 1024 * 0.8
        }
      ],
      agents: []
    }
  ])

  // Getters
  const getDocument = (id) => {
    // Convert id to string if it's a number, to handle different ID formats
    const docId = typeof id === 'number' ? id.toString() : id
    return documents.value.find(doc => doc.id === docId)
  }

  const getAllDocuments = () => {
    return documents.value
  }

  // Get documents by client ID
  const getDocumentsByClientId = (clientId) => {
    return documents.value.filter(doc => doc.clientId === clientId)
  }

  // Actions
  function addDocument(document) {
    const newDocument = {
      id: generateDocumentId(),
      createdAt: new Date().toISOString().split('T')[0],
      files: [],
      agents: [],
      ...document
    }

    documents.value.push(newDocument)
    return newDocument.id
  }

  function updateDocument(id, updates) {
    // Convert id to string if it's a number
    const docId = typeof id === 'number' ? id.toString() : id
    const index = documents.value.findIndex(doc => doc.id === docId)

    if (index !== -1) {
      documents.value[index] = {
        ...documents.value[index],
        ...updates
      }
      return true
    }

    return false
  }

  function deleteDocument(id) {
    // Convert id to string if it's a number
    const docId = typeof id === 'number' ? id.toString() : id
    const index = documents.value.findIndex(doc => doc.id === docId)

    if (index !== -1) {
      documents.value.splice(index, 1)
      return true
    }

    return false
  }

  // Helper method to generate unique document ID
  function generateDocumentId() {
    const ids = documents.value.map(doc => parseInt(doc.id)).filter(id => !isNaN(id))
    return (Math.max(0, ...ids) + 1).toString()
  }

  return {
    // State
    documents,

    // Getters
    getDocument,
    getAllDocuments,
    getDocumentsByClientId,

    // Actions
    addDocument,
    updateDocument,
    deleteDocument
  }
})
