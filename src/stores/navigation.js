import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useRoleStore } from './roleStore'

export const useNavigationStore = defineStore('navigation', () => {
  // Common icon strings
  const icons = {
    dashboard: `
      <svg class="menu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9L12 2L21 9V20H14V14H10V20H3V9Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,
    listings: `
      <svg class="menu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/>
        <path d="M3 10H21" stroke="currentColor" stroke-width="1.5"/>
        <path d="M8 15H16" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    `,
    documents: `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="3" width="12" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/>
        <path d="M9 7H15" stroke="currentColor" stroke-width="1.5"/>
        <path d="M9 11H15" stroke="currentColor" stroke-width="1.5"/>
        <path d="M9 15H13" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    `,
    marketing: `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 5C20 6.65685 16.4183 8 12 8C7.58172 8 4 6.65685 4 5C4 3.34315 7.58172 2 12 2C16.4183 2 20 3.34315 20 5Z" stroke="currentColor" stroke-width="1.5"/>
        <path d="M20 5V12C20 13.6569 16.4183 15 12 15C7.58172 15 4 13.6569 4 12V5" stroke="currentColor" stroke-width="1.5"/>
        <path d="M20 12V19C20 20.6569 16.4183 22 12 22C7.58172 22 4 20.6569 4 19V12" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    `,
    education: `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="1.5"/>
        <path d="M19 9.5V16.5C19 18.5 15.5 20 12 20C8.5 20 5 18.5 5 16.5V9.5" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    `,
    tasks: `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/>
        <path d="M8 12L11 15L16 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,
    tours: `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 20.8L10 3.19999C10 2.53725 9.47032 2 8.81818 2L5.18182 2C4.52968 2 4 2.53726 4 3.2L4 20.8C4 21.4627 4.52968 22 5.18182 22L8.81818 22C9.47032 22 10 21.4627 10 20.8Z" stroke="currentColor" stroke-width="1.5"/>
        <path d="M20 20.8L20 3.19999C20 2.53725 19.4703 2 18.8182 2L15.1818 2C14.5297 2 14 2.53726 14 3.2L14 20.8C14 21.4627 14.5297 22 15.1818 22L18.8182 22C19.4703 22 20 21.4627 20 20.8Z" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    `,
    profile: `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/>
        <path d="M5 20C5 16.6863 8.13401 14 12 14C15.866 14 19 16.6863 19 20" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    `,
    settings: `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="1.5"/>
        <path d="M18.7273 14.5455C18.5909 14.8182 18.5909 15.1364 18.6818 15.4091L19.5 18.4091C19.5909 18.7273 19.5 19.0455 19.2727 19.2727L17.1818 21.3636C16.9545 21.5909 16.6364 21.6818 16.3182 21.5909L13.3182 20.7727C13.0455 20.6818 12.7273 20.6818 12.4545 20.8182L9.81818 22.0909C9.5 22.2273 9.09091 22.1364 8.90909 21.8636L6.81818 19.2727C6.63636 19 6.63636 18.6818 6.77273 18.4091L7.77273 15.5C7.86364 15.2273 7.86364 14.9091 7.72727 14.6364L6.45455 12C6.31818 11.7273 6.40909 11.3182 6.68182 11.1364L9.27273 9.04545C9.54545 8.86364 9.72727 8.59091 9.72727 8.27273L9.90909 5.18182C9.90909 4.86364 10.1818 4.59091 10.5 4.5L13.5 4.5C13.8182 4.5 14.0909 4.77273 14.0909 5.09091L14.2727 8.18182C14.2727 8.5 14.4545 8.77273 14.7273 8.95455L17.3182 11.0455C17.5909 11.2273 17.6818 11.6364 17.5455 11.9091L16.2727 14.5455C16.1364 14.8182 16.1364 15.1364 16.2727 15.4091L17.1818 18.5C17.2727 18.7727 17.1818 19.0909 16.9545 19.3182L14.5455 21.7273" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    `,
    clients: `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 20C17 18.3431 14.7614 17 12 17C9.23858 17 7 18.3431 7 20" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    `,
    agents: `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 19C4 16.7909 6.79086 15 10 15H14C17.2091 15 20 16.7909 20 19" stroke="currentColor" stroke-width="1.5"/>
        <path d="M12 3L12 11" stroke="currentColor" stroke-width="1.5"/>
        <path d="M8 7L16 7" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="12" cy="11" r="4" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    `,
    calendar: `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/>
        <path d="M3 10H21" stroke="currentColor" stroke-width="1.5"/>
        <path d="M8 2V6" stroke="currentColor" stroke-width="1.5"/>
        <path d="M16 2V6" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="12" cy="14" r="1" fill="currentColor"/>
        <circle cx="8" cy="14" r="1" fill="currentColor"/>
        <circle cx="16" cy="14" r="1" fill="currentColor"/>
        <circle cx="12" cy="18" r="1" fill="currentColor"/>
        <circle cx="8" cy="18" r="1" fill="currentColor"/>
        <circle cx="16" cy="18" r="1" fill="currentColor"/>
      </svg>
    `,
    messages: `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12C21 16.9706 16.9706 21 12 21C10.2289 21 8.57736 20.4884 7.18497 19.605L3 21L4.39499 16.815C3.51156 15.4226 3 13.7711 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    `
  }

  // Define role-specific menu items
  const adminMenuItems = [
    {
      name: 'Dashboard',
      key: 'dashboard',
      path: '/admin/dashboard',
      icon: icons.dashboard
    },
    {
      name: 'Manage Agents',
      key: 'agents',
      path: '/admin/agents',
      icon: icons.agents
    },
    {
      name: 'Clients',
      key: 'clients',
      path: '/admin/clients',
      icon: icons.clients
    },
    {
      name: 'Properties',
      key: 'listings',
      path: '/admin/properties',
      icon: icons.listings
    },
    {
      name: 'Receipts & Documents',
      key: 'receipts-docs',
      path: '/admin/documents',
      icon: icons.documents
    },
    {
      name: 'Marketing Tools',
      key: 'marketing-tools',
      path: '/admin/marketing',
      icon: icons.marketing
    },
    {
      name: 'Settings',
      key: 'settings',
      path: '/admin/settings',
      icon: icons.settings
    }
  ]

  const agentMenuItems = [
    {
      name: 'Dashboard',
      key: 'dashboard',
      path: '/agent/dashboard',
      icon: icons.dashboard
    },
    {
      name: 'My Listings',
      key: 'listings',
      path: '/agent/listings',
      icon: icons.listings
    },
    {
      name: 'My Clients',
      key: 'clients',
      path: '/agent/clients',
      icon: icons.clients
    },
    {
      name: 'Calendar',
      key: 'calendar',
      path: '/agent/calendar',
      icon: icons.calendar
    },
    {
      name: 'Documents',
      key: 'documents',
      path: '/agent/documents',
      icon: icons.documents
    },
    {
      name: 'Messages',
      key: 'messages',
      path: '/agent/messages',
      icon: icons.messages
    },
    {
      name: 'Profile',
      key: 'profile',
      path: '/agent/profile',
      icon: icons.profile
    }
  ]

  const clientMenuItems = [
    {
      name: 'Dashboard',
      key: 'dashboard',
      path: '/client/dashboard',
      icon: icons.dashboard
    },
    {
      name: 'My Properties',
      key: 'properties',
      path: '/client/properties',
      icon: icons.listings
    },
    {
      name: 'Documents',
      key: 'documents',
      path: '/client/documents',
      icon: icons.documents
    },
    {
      name: 'My Agent',
      key: 'agent',
      path: '/client/agent',
      icon: icons.agents
    },
    {
      name: 'Profile',
      key: 'profile',
      path: '/client/profile',
      icon: icons.profile
    },
    {
      name: 'Settings',
      key: 'settings',
      path: '/client/settings',
      icon: icons.settings
    }
  ]

  // Use the role store to determine which menu items to show
  const roleStore = useRoleStore()

  // Computed property for menu items based on current role
  const menuItems = computed(() => {
    switch (roleStore.currentRole) {
      case 'admin':
        return adminMenuItems
      case 'agent':
        return agentMenuItems
      case 'client':
        return clientMenuItems
      default:
        return agentMenuItems // Default to agent menu
    }
  })

  return {
    menuItems
  }
})
