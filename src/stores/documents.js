import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDocumentStore = defineStore('documents', {
  state: () => ({
    documents: [
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
    ]
  }),

  actions: {
    async getDocument(id) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return this.documents.find(doc => doc.id === id);
    },

    async updateDocument(updatedDoc) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const index = this.documents.findIndex(doc => doc.id === updatedDoc.id);
      if (index !== -1) {
        this.documents[index] = { ...updatedDoc };
        return true;
      }
      return false;
    },

    async deleteDocument(id) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const index = this.documents.findIndex(doc => doc.id === id);
      if (index !== -1) {
        this.documents.splice(index, 1);
        return true;
      }
      return false;
    }
  }
})
