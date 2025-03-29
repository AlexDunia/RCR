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
      description: 'Standard buyer representation agreement outlining terms and conditions.',
      createdAt: '2024-03-15',
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
      description: 'Seller representation agreement for property listing.',
      createdAt: '2024-03-14',
      files: [],
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

    // Actions
    addDocument,
    updateDocument,
    deleteDocument
  }
})
