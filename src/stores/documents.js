import { defineStore } from 'pinia'
import { ref } from 'vue'
// Axios is imported but not used yet - will be used for Laravel API integration
// import axios from 'axios'

// API base URL will be configured when connecting to Laravel backend
// const API_BASE_URL = '/api'

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
          avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_e7yggy.jpg',
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
          avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790261/300_1_gdilxy.jpg',
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
          avatar: 'https://res.cloudinary.com/dnuhjsckk/image/upload/v1746790260/300_3_inul8p.jpg',
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

  // Loading state for API operations
  const loading = ref(false)
  const error = ref(null)

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

  // API Actions
  // Fetch all documents from API
  async function fetchDocuments() {
    loading.value = true
    error.value = null

    try {
      // When connecting to Laravel backend, uncomment and use this code:
      //
      // const response = await axios.get(`${API_BASE_URL}/documents`, {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Accept': 'application/json'
      //   }
      // })
      // documents.value = response.data.data // Adjust based on your API response format
      // return documents.value

      // For now, just simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      // We're keeping the mock data for now
      console.log('Fetched documents from mock data')
      return documents.value
    } catch (err) {
      console.error('Error fetching documents:', err)
      error.value = err.message || 'Failed to fetch documents'
      return []
    } finally {
      loading.value = false
    }
  }

  // Fetch a single document by ID
  async function fetchDocument(id) {
    loading.value = true
    error.value = null

    try {
      // When connecting to Laravel backend, uncomment and use this code:
      //
      // const response = await axios.get(`${API_BASE_URL}/documents/${id}`, {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Accept': 'application/json'
      //   }
      // })
      // return response.data.data // Adjust based on your API response format

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))

      const document = getDocument(id)
      console.log(`Fetched document ${id} from mock data`)
      return document
    } catch (err) {
      console.error(`Error fetching document ${id}:`, err)
      error.value = err.message || 'Failed to fetch document'
      return null
    } finally {
      loading.value = false
    }
  }

  // Fetch documents by client ID
  async function fetchDocumentsByClientId(clientId) {
    loading.value = true
    error.value = null

    try {
      // When connecting to Laravel backend, uncomment and use this code:
      //
      // const response = await axios.get(`${API_BASE_URL}/clients/${clientId}/documents`, {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Accept': 'application/json'
      //   }
      // })
      // return response.data.data // Adjust based on your API response format

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))

      const clientDocuments = getDocumentsByClientId(clientId)
      console.log(`Fetched documents for client ${clientId} from mock data`)
      return clientDocuments
    } catch (err) {
      console.error(`Error fetching documents for client ${clientId}:`, err)
      error.value = err.message || 'Failed to fetch client documents'
      return []
    } finally {
      loading.value = false
    }
  }

  // Add document
  async function addDocument(document) {
    loading.value = true
    error.value = null

    try {
      // When connecting to Laravel backend, uncomment and use this code:
      //
      // const formData = new FormData()
      //
      // // Add document fields to formData
      // Object.keys(document).forEach(key => {
      //   if (key !== 'files') {
      //     formData.append(key, document[key])
      //   }
      // })
      //
      // // Add files if present
      // if (document.files && document.files.length) {
      //   document.files.forEach((file, index) => {
      //     formData.append(`files[${index}]`, file)
      //   })
      // }
      //
      // const response = await axios.post(`${API_BASE_URL}/documents`, formData, {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'multipart/form-data',
      //     'Accept': 'application/json'
      //   }
      // })
      //
      // // Get the new document from response
      // const newDocument = response.data.data
      // documents.value.push(newDocument)
      // return newDocument.id

      // For now, use the current implementation
      const newId = generateDocumentId()
    const newDocument = {
        id: newId,
      createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      files: [],
      agents: [],
      ...document
    }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

    documents.value.push(newDocument)
      console.log('Added document with mock implementation:', newDocument)
      return newId
    } catch (err) {
      console.error('Error creating document:', err)
      error.value = err.message || 'Failed to create document'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  // Update document
  async function updateDocument(id, updates) {
    loading.value = true
    error.value = null

    try {
      // When connecting to Laravel backend, uncomment and use this code:
      //
      // const formData = new FormData()
      //
      // // Add update fields to formData
      // Object.keys(updates).forEach(key => {
      //   if (key !== 'files') {
      //     formData.append(key, updates[key])
      //   }
      // })
      //
      // // Add _method field for Laravel to understand it's a PUT request
      // formData.append('_method', 'PUT')
      //
      // // Add files if present
      // if (updates.files && updates.files.length) {
      //   updates.files.forEach((file, index) => {
      //     // Only append file if it's not already on the server (no id)
      //     if (!file.id) {
      //       formData.append(`files[${index}]`, file)
      //     }
      //   })
      // }
      //
      // const response = await axios.post(`${API_BASE_URL}/documents/${id}`, formData, {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'multipart/form-data',
      //     'Accept': 'application/json'
      //   }
      // })
      //
      // // Get the updated document
      // const updatedDocument = response.data.data
      //
      // // Update the document in the local store
      // const index = documents.value.findIndex(doc => doc.id === updatedDocument.id)
      // if (index !== -1) {
      //   documents.value[index] = updatedDocument
      // }
      //
      // return true

      // For now, use current implementation
    const docId = typeof id === 'number' ? id.toString() : id
    const index = documents.value.findIndex(doc => doc.id === docId)

    if (index !== -1) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))

      documents.value[index] = {
        ...documents.value[index],
          ...updates,
          updatedAt: new Date().toISOString().split('T')[0]
      }

        console.log(`Updated document ${id} with mock implementation`)
      return true
    }

    return false
    } catch (err) {
      console.error(`Error updating document ${id}:`, err)
      error.value = err.message || 'Failed to update document'
      return false
    } finally {
      loading.value = false
    }
  }

  // Delete document
  async function deleteDocument(id) {
    loading.value = true
    error.value = null

    try {
      // When connecting to Laravel backend, uncomment and use this code:
      //
      // await axios.delete(`${API_BASE_URL}/documents/${id}`, {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Accept': 'application/json'
      //   }
      // })
      //
      // // If successful, remove from local store
      // const docId = typeof id === 'number' ? id.toString() : id
      // const index = documents.value.findIndex(doc => doc.id === docId)
      // if (index !== -1) {
      //   documents.value.splice(index, 1)
      // }
      //
      // return true

      // For now, use current implementation
    const docId = typeof id === 'number' ? id.toString() : id
    const index = documents.value.findIndex(doc => doc.id === docId)

    if (index !== -1) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))

      documents.value.splice(index, 1)
        console.log(`Deleted document ${id} with mock implementation`)
      return true
    }

    return false
    } catch (err) {
      console.error(`Error deleting document ${id}:`, err)
      error.value = err.message || 'Failed to delete document'
      return false
    } finally {
      loading.value = false
    }
  }

  // Helper method to generate unique document ID
  function generateDocumentId() {
    const ids = documents.value.map(doc => parseInt(doc.id)).filter(id => !isNaN(id))
    return (Math.max(0, ...ids) + 1).toString()
  }

  return {
    // State
    documents,
    loading,
    error,

    // Getters
    getDocument,
    getAllDocuments,
    getDocumentsByClientId,

    // Actions
    addDocument,
    updateDocument,
    deleteDocument,

    // API Actions
    fetchDocuments,
    fetchDocument,
    fetchDocumentsByClientId
  }
})
