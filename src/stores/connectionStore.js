import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useClientStore } from '@/stores/clientStore'

export const useConnectionStore = defineStore('connectionStore', () => {
  // State
  const connections = ref([
    // Each connection has a unique ID, from and to IDs (client or agent), status, and type
    {
      id: 1,
      fromId: 1, // Client ID
      fromType: 'client',
      toId: 5, // Agent ID
      toType: 'agent',
      status: 'accepted', // 'pending', 'accepted', 'rejected'
      requestedAt: '2024-08-10',
      updatedAt: '2024-08-12',
      message: 'I would like to work with you on finding a new home.'
    },
    {
      id: 2,
      fromId: 5, // Agent ID
      fromType: 'agent',
      toId: 2, // Client ID
      toType: 'client',
      status: 'accepted',
      requestedAt: '2024-08-05',
      updatedAt: '2024-08-07',
      message: 'I specialize in properties in your area of interest.'
    },
    {
      id: 3,
      fromId: 8, // Agent ID
      fromType: 'agent',
      toId: 3, // Client ID
      toType: 'client',
      status: 'accepted',
      requestedAt: '2024-08-01',
      updatedAt: '2024-08-02',
      message: 'I noticed you are looking for properties in downtown. I can help.'
    },
    {
      id: 4,
      fromId: 4, // Client ID
      fromType: 'client',
      toId: 5, // Agent ID
      toType: 'agent',
      status: 'pending',
      requestedAt: '2024-08-15',
      updatedAt: null,
      message: 'Looking for assistance with luxury properties.'
    },
    {
      id: 5,
      fromId: 10, // Agent ID
      fromType: 'agent',
      toId: 1, // Client ID
      toType: 'client',
      status: 'rejected',
      requestedAt: '2024-08-03',
      updatedAt: '2024-08-04',
      message: 'I have some properties that might interest you.'
    },
    {
      id: 6,
      fromId: 2, // Client ID
      fromType: 'client',
      toId: 1, // Client ID (client-to-client)
      toType: 'client',
      status: 'accepted',
      requestedAt: '2024-07-28',
      updatedAt: '2024-07-29',
      message: 'I think we are looking in the same neighborhood!'
    }
  ])

  // Pending connection requests count
  const pendingConnectionsCount = ref({
    // Structure: { userId: count }
    // For agents
    5: 1,
    8: 0,
    10: 0,
    // For clients
    1: 0,
    2: 0,
    3: 0
  })

  // Helper method to generate unique connection ID
  function generateConnectionId() {
    return Math.max(0, ...connections.value.map(conn => conn.id)) + 1
  }

  // Get all connections for a specific user (client or agent)
  function getConnectionsByUserId(userId, userType) {
    return connections.value.filter(conn =>
      (conn.fromId === userId && conn.fromType === userType) ||
      (conn.toId === userId && conn.toType === userType)
    )
  }

  // Get accepted connections only for a specific user
  function getAcceptedConnectionsByUserId(userId, userType) {
    return connections.value.filter(conn =>
      ((conn.fromId === userId && conn.fromType === userType) ||
      (conn.toId === userId && conn.toType === userType)) &&
      conn.status === 'accepted'
    )
  }

  // Get pending connections for a specific user
  function getPendingConnectionsForUser(userId, userType) {
    return connections.value.filter(conn =>
      conn.toId === userId &&
      conn.toType === userType &&
      conn.status === 'pending'
    )
  }

  // Get connections between specific users
  function getConnectionBetweenUsers(userId1, userType1, userId2, userType2) {
    return connections.value.find(conn =>
      ((conn.fromId === userId1 && conn.fromType === userType1 &&
        conn.toId === userId2 && conn.toType === userType2) ||
      (conn.fromId === userId2 && conn.fromType === userType2 &&
        conn.toId === userId1 && conn.toType === userType1))
    )
  }

  // Check if two users are connected with accepted status
  function areUsersConnected(userId1, userType1, userId2, userType2) {
    const connection = getConnectionBetweenUsers(userId1, userType1, userId2, userType2)
    return connection && connection.status === 'accepted'
  }

  // Create a new connection request
  function requestConnection(fromId, fromType, toId, toType, message) {
    // Check if a connection already exists
    const existingConnection = getConnectionBetweenUsers(fromId, fromType, toId, toType)

    if (existingConnection) {
      // If rejected before, can request again by updating status
      if (existingConnection.status === 'rejected') {
        existingConnection.status = 'pending'
        existingConnection.message = message || existingConnection.message
        existingConnection.fromId = fromId
        existingConnection.fromType = fromType
        existingConnection.toId = toId
        existingConnection.toType = toType
        existingConnection.requestedAt = new Date().toISOString().split('T')[0]
        existingConnection.updatedAt = null

        // Update pending count
        incrementPendingCount(toId)

        return existingConnection.id
      }

      // Otherwise can't create a new request
      return null
    }

    // Create new connection
    const newConnection = {
      id: generateConnectionId(),
      fromId,
      fromType,
      toId,
      toType,
      status: 'pending',
      requestedAt: new Date().toISOString().split('T')[0],
      updatedAt: null,
      message: message || ''
    }

    connections.value.push(newConnection)

    // Update pending count
    incrementPendingCount(toId)

    return newConnection.id
  }

  // Accept a connection request
  function acceptConnection(connectionId) {
    const connection = connections.value.find(conn => conn.id === connectionId)

    if (connection && connection.status === 'pending') {
      connection.status = 'accepted'
      connection.updatedAt = new Date().toISOString().split('T')[0]

      // Update pending count
      decrementPendingCount(connection.toId)

      // Update client interactions for clients
      if (connection.fromType === 'client' && connection.toType === 'agent') {
        updateClientAgentConnection(connection.fromId, connection.toId)
      } else if (connection.fromType === 'agent' && connection.toType === 'client') {
        updateClientAgentConnection(connection.toId, connection.fromId)
      } else if (connection.fromType === 'client' && connection.toType === 'client') {
        updateClientClientConnection(connection.fromId, connection.toId)
      }

      return true
    }

    return false
  }

  // Reject a connection request
  function rejectConnection(connectionId) {
    const connection = connections.value.find(conn => conn.id === connectionId)

    if (connection && connection.status === 'pending') {
      connection.status = 'rejected'
      connection.updatedAt = new Date().toISOString().split('T')[0]

      // Update pending count
      decrementPendingCount(connection.toId)

      return true
    }

    return false
  }

  // Update client-agent connection in client store
  function updateClientAgentConnection(clientId, agentId) {
    try {
      const clientStore = useClientStore()
      clientStore.connectAgent(clientId, agentId)
    } catch (error) {
      console.error('Failed to update client-agent connection:', error)
    }
  }

  // Update client-client connection in client store
  function updateClientClientConnection(clientId1, clientId2) {
    try {
      const clientStore = useClientStore()
      clientStore.connectClients(clientId1, clientId2)
    } catch (error) {
      console.error('Failed to update client-client connection:', error)
    }
  }

  // Helper to increment pending count
  function incrementPendingCount(userId) {
    if (pendingConnectionsCount.value[userId] !== undefined) {
      pendingConnectionsCount.value[userId]++
    } else {
      pendingConnectionsCount.value[userId] = 1
    }
  }

  // Helper to decrement pending count
  function decrementPendingCount(userId) {
    if (pendingConnectionsCount.value[userId] !== undefined && pendingConnectionsCount.value[userId] > 0) {
      pendingConnectionsCount.value[userId]--
    }
  }

  return {
    // State
    connections,
    pendingConnectionsCount,

    // Getters
    getConnectionsByUserId,
    getAcceptedConnectionsByUserId,
    getPendingConnectionsForUser,
    getConnectionBetweenUsers,
    areUsersConnected,

    // Actions
    requestConnection,
    acceptConnection,
    rejectConnection
  }
})
