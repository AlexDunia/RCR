import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDocumentStore = defineStore('documents', () => {
  const documents = ref([])

  // Load documents from localStorage on store initialization
  const storedDocs = localStorage.getItem('documents')
  if (storedDocs) {
    documents.value = JSON.parse(storedDocs)
  }

  // Save documents to localStorage whenever they change
  const saveToLocalStorage = () => {
    localStorage.setItem('documents', JSON.stringify(documents.value))
  }

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  const saveBuyerRepDocument = (doc) => {
    const document = {
      id: generateId(),
      ...doc
    }
    documents.value.push(document)
    saveToLocalStorage()
    return document
  }

  const saveSellerRepDocument = (doc) => {
    const document = {
      id: generateId(),
      ...doc
    }
    documents.value.push(document)
    saveToLocalStorage()
    return document
  }

  const saveMLSDocument = (doc) => {
    const document = {
      id: generateId(),
      ...doc
    }
    documents.value.push(document)
    saveToLocalStorage()
    return document
  }

  const deleteDocument = (id) => {
    const index = documents.value.findIndex(doc => doc.id === id)
    if (index !== -1) {
      documents.value.splice(index, 1)
      saveToLocalStorage()
    }
  }

  const getDocument = (id) => {
    return documents.value.find(doc => doc.id === id)
  }

  const getDocumentsByType = (type) => {
    return documents.value.filter(doc => doc.type === type)
  }

  return {
    documents,
    saveBuyerRepDocument,
    saveSellerRepDocument,
    saveMLSDocument,
    deleteDocument,
    getDocument,
    getDocumentsByType
  }
})
