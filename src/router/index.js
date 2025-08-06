import { createRouter, createWebHistory } from 'vue-router';
import { useRoleStore } from '@/stores/roleStore';
import DocumentLayout from '@/layouts/DocumentLayout.vue';
import TasksLayout from '@/layouts/TasksLayout.vue';
import EducationLayout from '@/layouts/EducationLayout.vue';
import permissionGuard from './guards/permissionGuard';
import { authGuard } from './guards/authGuard';
import { setupRouterDebug } from '@/utils/router-debug';
import { publicGuard } from './guards/publicGuard';
import PropertyGallery from '@/views/property/PropertyGallery.vue';
import { isFeatureEnabled, isFeatureFlagsInitialized } from '@/utils/features';

// Lazy-loaded route components
const routes = [
  // Landing page - accessible to all
  {
    path: '/landing',
    name: 'Landing',
    component: () => import('@/views/LandingPage.vue'),
    meta: {
      hideHeader: true,
      hideSidebar: true,
      layout: 'public',
      shouldReload: true,
      noCache: true
    },
    beforeEnter: (to, from, next) => {
      const roleStore = useRoleStore();
      // Force role to 'all' when entering landing page
      roleStore.setRole('all');
      next();
    }
  },
  // New Buy Properties page - accessible to all
  {
    path: '/newbuyproperties',
    name: 'NewBuyProperties',
    component: () => import('@/views/public/NewBuyProperties.vue'),
    meta: {
      hideHeader: true,
      hideSidebar: true,
      layout: 'public',
      title: 'Buy Properties',
      publicAccess: true,
      allowedRoles: ['all', 'admin', 'agent', 'client']
    }
  },
  // All Agents page - accessible to all
  {
    path: '/allagents',
    name: 'AllAgents',
    component: () => import('@/views/AllAgents.vue'),
    meta: {
      hideHeader: true,
      hideSidebar: true,
      layout: 'public',
      title: 'Find Your Perfect Agent',
      allowedRoles: ['all', 'admin', 'agent', 'client']
    },
    beforeEnter: (to, from, next) => {
      // Allow access regardless of role
      next();
    }
  },
  // Public Agent Profile page - accessible to all
  {
    path: '/agent-profile/:id',
    name: 'PublicAgentProfile',
    component: () => import('@/views/public/AgentProfileView.vue'),
    meta: {
      hideHeader: true,
      hideSidebar: true,
      layout: 'public',
      title: 'Agent Profile'
    }
  },
  // Root path - redirect based on role
  {
    path: '/',
    name: 'Root',
    redirect: (to) => {
      // Allow direct access to buy and rent properties
      if (to.path === '/buy' || to.path === '/rent') {
        return to.path;
      }
      return '/landing';
    }
  },
  // Agents management route (Admin-only)
  {
    path: '/agents',
    name: 'Agents',
    component: () => import('@/views/admin/AgentsView.vue'),
    beforeEnter: (to, from, next) => {
      const roleStore = useRoleStore();
      if (roleStore.currentRole === 'admin') {
        next();
      } else {
        next('/'); // Redirect to root which will handle based on role
      }
    },
    meta: {
      title: 'Find Agents',
      allowedRoles: ['admin'],
      fullAppOnly: true // Only available when full app features are enabled
    }
  },
  // Admin dashboard
  {
    path: '/admin-dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/AdminDashboardView.vue'),
    beforeEnter: (to, from, next) => {
      const roleStore = useRoleStore();
      if (roleStore.currentRole === 'admin') {
        next();
      } else {
        next('/'); // Redirect to root which will handle based on role
      }
    },
    meta: {
      title: 'Dashboard',
      description: 'View your performance metrics and important updates',
      allowedRoles: ['admin'],
      fullAppOnly: true // Only available when full app features are enabled
    }
  },
  {
    path: '/agent-dashboard',
    name: 'AgentDashboardView',
    component: () => import('@/views/dashboard/AgentDashboardView.vue'),
    beforeEnter: (to, from, next) => {
      const roleStore = useRoleStore();
      if (roleStore.currentRole === 'agent') {
        next();
      } else {
        next('/'); // Redirect to root which will handle based on role
      }
    },
    meta: {
      title: 'Agent Dashboard',
      description: 'View your listings, clients, and performance metrics',
      allowedRoles: ['agent'],
      fullAppOnly: true // Only available when full app features are enabled
    }
  },

  // Client routes
  {
    path: '/client',
    component: () => import('@/layouts/ClientLayout.vue'),
    meta: {
      allowedRoles: ['client'],
      fullAppOnly: true // Only available when full app features are enabled
    },
    children: [
      {
        path: 'dashboard',
        name: 'ClientDashboard',
        component: () => import('@/views/dashboard/ClientDashboardView.vue'),
        meta: {
          title: 'Client Dashboard',
          description: 'View your properties, documents, and communications'
        }
      },
      {
        path: 'properties',
        name: 'ClientProperties',
        component: () => import('@/views/client/Properties.vue'),
        meta: {
          title: 'My Properties',
          description: 'View and manage your properties'
        }
      },
      {
        path: 'find-agents',
        name: 'ClientFindAgents',
        component: () => import('@/views/client/ClientAgentsView.vue'),
        meta: {
          title: 'Find Agents',
          description: 'Browse and connect with real estate agents'
        }
      },
      {
        path: 'favourites',
        name: 'ClientFavourites',
        component: () => import('@/views/client/FavoritesView.vue'),
        meta: {
          title: 'Favourites',
          description: 'View your saved properties and agents'
        }
      },
      {
        path: 'documents',
        name: 'ClientDocuments',
        component: () => import('@/views/client/DocumentsView.vue'),
        meta: {
          title: 'Documents',
          description: 'View and manage your documents'
        }
      },
      {
        path: 'profile',
        name: 'ClientProfile',
        component: () => import('@/views/client/ClientProfileView.vue'),
        meta: {
          title: 'My Profile'
        }
      },
      {
        path: 'profile/edit',
        name: 'ClientProfileEdit',
        component: () => import('@/views/client/ClientProfileEditView.vue'),
        meta: {
          title: 'Edit Profile'
        }
      },
      {
        path: '/client-profile/edit',
        redirect: '/client/profile/edit'
      },
      {
        path: 'settings',
        name: 'ClientSettings',
        component: () => import('@/views/client/ClientSettingsView.vue'),
        meta: {
          title: 'Settings'
        }
      },
      {
        path: 'property/:id',
        name: 'ClientPropertyDetail',
        component: () => import('@/views/client/PropertyDetailView.vue'),
        meta: {
          title: 'Property Details',
          description: 'View detailed information about a property'
        }
      },
      {
        path: 'appointments',
        name: 'ClientAppointments',
        component: () => import('@/views/client/AppointmentsView.vue'),
        meta: {
          title: 'Appointments',
          description: 'Schedule and manage property viewings'
        }
      },
      {
        path: 'messages',
        name: 'ClientMessages',
        component: () => import('@/views/client/MessagesView.vue'),
        meta: {
          title: 'Messages',
          description: 'Communicate with your agent'
        }
      },
      {
        path: 'agent/:id',
        name: 'FavoriteAgentProfile',
        component: () => import('@/views/client/FavoriteAgentProfileView.vue'),
        meta: {
          title: 'Agent Profile',
          description: 'View detailed agent profile'
        }
      }
    ]
  },

  // Redirect old client routes to new ones
  {
    path: '/client-dashboard',
    redirect: '/client/dashboard'
  },
  {
    path: '/client-properties',
    redirect: '/client/properties'
  },
  {
    path: '/client-find-agents',
    redirect: '/client/find-agents'
  },
  {
    path: '/client-favourites',
    redirect: '/client/favourites'
  },
  {
    path: '/client-documents',
    redirect: '/client/documents'
  },
  {
    path: '/client-profile',
    redirect: '/client/profile'
  },
  {
    path: '/client-settings',
    redirect: '/client/settings'
  },
  {
    path: '/client-property/:id',
    redirect: to => `/client/property/${to.params.id}`
  },
  {
    path: '/client-appointments',
    redirect: '/client/appointments'
  },
  {
    path: '/client-messages',
    redirect: '/client/messages'
  },
  {
    path: '/client-agent/:id',
    redirect: to => `/client/agent/${to.params.id}`
  },

  // Manage Listings routes (Agent-only)
  {
    path: '/manage-listings',
    component: () => import('@/views/agents/ManageListings.vue'),
    meta: {
      title: 'Manage Listings',
      allowedRoles: ['agent'],
      fullAppOnly: true // Only available when full app features are enabled
    }
  },
  {
    path: '/add-listing',
    component: () => import('@/views/agents/AddListing.vue'),
    meta: {
      title: 'Add Listing',
      allowedRoles: ['agent'],
      fullAppOnly: true // Only available when full app features are enabled
    }
  },
  {
    path: '/view-listings',
    component: () => import('@/views/listings/ViewListings.vue'),
    meta: {
      title: 'View Listings',
      allowedRoles: ['agent'], // Restricted to agents as per your request
      fullAppOnly: true // Only available when full app features are enabled
    }
  },
  {
    path: '/pending-approvals',
    component: () => import('@/views/listings/PendingApprovals.vue'),
    meta: {
      title: 'Pending Approvals',
      allowedRoles: ['agent'], // Restricted to agents as per your request
      fullAppOnly: true // Only available when full app features are enabled
    }
  },
  {
    path: '/drafts',
    component: () => import('@/views/listings/Drafts.vue'),
    meta: {
      title: 'Drafts',
      allowedRoles: ['agent'],
      fullAppOnly: true // Only available when full app features are enabled
    }
  },

  // Tasks routes (Agent-only)
  {
    path: '/tasks',
    component: TasksLayout,
    meta: {
      allowedRoles: ['agent'], // Restrict parent route to agents
      fullAppOnly: true // Only available when full app features are enabled
    },
    children: [
      {
        path: '',
        redirect: '/tasks/in-progress' // Default redirect
      },
      {
        path: 'in-progress',
        component: () => import('@/views/tasks/InProgressTasks.vue')
      },
      {
        path: 'drafts',
        component: () => import('@/views/tasks/DraftTasks.vue')
      },
      {
        path: 'scheduled',
        name: 'ScheduledTasks',
        component: () => import('@/views/tasks/ScheduledTasks.vue')
      },
      {
        path: 'completed',
        component: () => import('@/views/tasks/CompletedTasks.vue')
      },
      {
        path: 'create',
        component: () => import('@/features/task/TaskCreate.vue'),
        meta: {
          hideSidebar: true,
          hideHeader: true
        }
      },
      {
        path: ':id',
        name: 'TaskDetail',
        component: () => import('@/features/task/TaskDetail.vue'),
        meta: {
          hideSidebar: true,
          hideHeader: true
        }
      },
      {
        path: 'completed/:id',
        name: 'CompletedTaskDetail',
        component: () => import('@/views/tasks/CompletedTaskDetail.vue'),
        meta: {
          hideSidebar: true,
          hideHeader: true
        }
      }
    ]
  },

  // Admin Task routes
  {
    path: '/admin/tasks',
    component: TasksLayout,
    meta: {
      allowedRoles: ['admin'], // Restrict to admin only
      fullAppOnly: true // Only available when full app features are enabled
    },
    children: [
      {
        path: '',
        redirect: '/' // Redirect to home if no specific task ID
      },
      {
        path: ':id',
        name: 'AdminTaskDetail',
        component: () => import('@/views/admin/AdminTaskDetail.vue'),
        meta: {
          hideSidebar: true,
          hideHeader: true
        }
      }
    ]
  },

  // Admin Client Task Detail route (Admin-only)
  {
    path: '/admin/client-task/:id',
    name: 'AdminClientTaskDetail',
    component: () => import('@/views/admin/ClientTaskDetail.vue'),
    meta: {
      title: 'Client Task Detail',
      hideSidebar: true,
      hideHeader: true,
      allowedRoles: ['admin'],
      fullAppOnly: true // Only available when full app features are enabled
    }
  },
  {
    path: '/admin/client-task/:id/edit',
    name: 'EditClientTask',
    component: () => import('@/views/admin/EditClientTask.vue'),
    meta: {
      fullAppOnly: true // Only available when full app features are enabled
    }
  },

  // Agent Profile route (Agent-only)
  {
    path: '/agent-profile',
    name: 'AgentProfile',
    component: () => import('@/views/agents/AgentProfile.vue'),
    meta: {
      allowedRoles: ['agent'],
      fullAppOnly: true // Only available when full app features are enabled
    }
  },

  // Document management routes (Agent-only)
  {
    path: '/receipts-docs',
    component: DocumentLayout,
    meta: {
      allowedRoles: ['agent'], // Restrict parent route to agents
      fullAppOnly: true // Only available when full app features are enabled
    },
    children: [
      {
        path: 'buyer-rep',
        name: 'BuyerRep',
        component: () => import('@/views/documents/BuyerRepForm.vue')
      },
      {
        path: 'seller-rep',
        name: 'SellerRep',
        component: () => import('@/views/documents/SellerRepForm.vue')
      },
      {
        path: 'mls',
        name: 'MLS',
        component: () => import('@/views/documents/MLSForm.vue')
      },
      {
        path: 'view-docs',
        name: 'ViewDocuments',
        component: () => import('@/views/documents/DocumentManagement.vue')
      },
      {
        path: '',
        redirect: { name: 'ViewDocuments' }
      }
    ]
  },
  {
    path: '/receipts-docs/document/:id',
    name: 'DocumentDetail',
    component: () => import('@/views/documents/DocumentDetail.vue'),
    meta: {
      title: 'Document Details',
      allowedRoles: ['agent'],
      fullAppOnly: true // Only available when full app features are enabled
    }
  },
  {
    path: '/receipts-docs/document/:id/edit',
    name: 'DocumentEdit',
    component: () => import('@/views/documents/DocumentEdit.vue'),
    meta: {
      title: 'Edit Document',
      allowedRoles: ['agent'],
      fullAppOnly: true // Only available when full app features are enabled
    }
  },
  {
    path: '/receipts-docs/document/new',
    name: 'DocumentCreate',
    component: () => import('@/views/documents/DocumentEdit.vue'),
    meta: {
      title: 'Create Document',
      allowedRoles: ['agent'],
      fullAppOnly: true // Only available when full app features are enabled
    }
  },
  {
    path: '/receipts-docs/view-docs',
    name: 'ViewDocs',
    component: () => import('@/views/documents/ViewDocs.vue'),
    meta: {
      title: 'All Documents',
      allowedRoles: ['agent'],
      fullAppOnly: true // Only available when full app features are enabled
    }
  },

  // Marketing routes (Agent-only)
  {
    path: '/marketing-tools',
    component: () => import('@/views/marketing/MarketingTools.vue'),
    meta: {
      allowedRoles: ['agent', 'admin'],
      requiredPermissions: ['view-marketing-plans'],
      fullAppOnly: true // Only available when full app features are enabled
    },
    children: [
      {
        path: '',
        component: () => import('@/views/marketing/SuccessPlan.vue')
      },
      {
        path: 'success-plan',
        component: () => import('@/views/marketing/SuccessPlan.vue')
      },
      {
        path: 'create',
        component: () => import('@/views/marketing/CreateSuccessPlan.vue'),
        meta: {
          requiredPermissions: ['create-marketing-plans'],
          allowedRoles: ['admin']
        }
      },
      {
        path: 'plan/:id',
        component: () => import('@/views/marketing/MarketingPlanDetail.vue')
      },
      {
        path: 'checklist',
        name: 'ChecklistList',
        component: () => import('@/views/marketing/MyChecklist.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'checklist/create',
        name: 'ChecklistCreate',
        component: () => import('@/views/marketing/ChecklistCreate.vue'),
        meta: {
          allowedRoles: ['agent']
        }
      },
      {
        path: 'checklist/:id',
        name: 'ChecklistDetail',
        component: () => import('@/views/marketing/ChecklistDetail.vue'),
        props: true,
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'checklist/:id/edit',
        name: 'ChecklistEdit',
        component: () => import('@/views/marketing/ChecklistEdit.vue'),
        meta: {
          allowedRoles: ['agent']
        }
      },
      {
        path: 'done-for-you',
        component: () => import('@/views/marketing/DoneForYou.vue')
      },
      {
        path: 'social-platforms',
        component: () => import('@/views/marketing/SocialPlatforms.vue'),
        meta: {
          requiredPermissions: ['view-social-posts']
        }
      },
      {
        path: 'social-platforms/create',
        component: () => import('@/views/marketing/CreateSocialPost.vue'),
        meta: {
          hideSidebar: true,
          hideHeader: true,
          background: '#f9fafb',
          requiredPermissions: ['create-social-posts']
        }
      },
      {
        path: 'social-platforms/edit/:id',
        component: () => import('@/views/marketing/CreateSocialPost.vue'),
        meta: {
          hideSidebar: true,
          hideHeader: true,
          background: '#f9fafb'
        }
      },
      {
        path: 'social-platforms/post/:id',
        component: () => import('@/views/marketing/PostDetail.vue')
      },
      {
        path: 'admin-checklists',
        name: 'AdminChecklistView',
        component: () => import('@/views/marketing/AdminChecklistView.vue'),
        meta: {
          requiredPermissions: ['view-marketing-plans', 'manage-agents'],
          allowedRoles: ['admin'],
          keepAlive: true
        }
      },
      {
        path: 'admin-social',
        name: 'AdminSocialInsights',
        component: () => import('@/views/marketing/AdminSocialInsights.vue'),
        meta: {
          requiredPermissions: ['view-marketing-plans', 'view-social-insights'],
          allowedRoles: ['admin'],
          keepAlive: true
        }
      }
    ]
  },

  // Chat routes
  {
    path: '/chat/admin',
    name: 'AdminChat',
    component: () => import('@/views/chat/AdminChatView.vue'),
    meta: {
      allowedRoles: ['admin'],
      fullAppOnly: true // Only available when full app features are enabled
    }
  },
  {
    path: '/chat/client',
    name: 'ClientChat',
    component: () => import('@/views/chat/ClientChatView.vue'),
    meta: {
      allowedRoles: ['agent'],
      fullAppOnly: true // Only available when full app features are enabled
    }
  },

  // Education & Training routes (Agent-only)
  {
    path: '/education-training',
    component: EducationLayout,
    meta: {
      allowedRoles: ['agent'], // Restrict parent route to agents
      fullAppOnly: true // Only available when full app features are enabled
    },
    children: [
      {
        path: '',
        name: 'EducationTraining',
        component: () => import('@/views/education/EducationTrainingView.vue'),
        meta: {
          title: 'Education & Training'
        }
      },
      {
        path: 'session/:id',
        name: 'SessionDetails',
        component: () => import('@/views/education/SessionDetailsView.vue'),
        props: true,
        meta: {
          title: 'Session Details'
        }
      },
      {
        path: 'module/:id',
        name: 'ModuleDetails',
        component: () => import('@/views/education/ModuleDetailsView.vue'),
        props: true,
        meta: {
          title: 'Module Details'
        }
      },
      {
        path: 'test',
        name: 'EducationTest',
        component: () => import('@/views/education/TestView.vue'),
        meta: {
          title: 'Education Test'
        }
      }
    ]
  },

  // Education & Training Admin routes
  {
    path: '/admin/education-training',
    component: EducationLayout,
    meta: {
      allowedRoles: ['admin'], // Restrict to admin
      fullAppOnly: true // Only available when full app features are enabled
    },
    children: [
      {
        path: '',
        name: 'AdminEducationTraining',
        component: () => import('@/views/education/AdminEducationView.vue'),
        meta: {
          title: 'Manage Education & Training'
        }
      },
      {
        path: 'create',
        name: 'CreateEducationSession',
        component: () => import('@/views/education/CreateEducationSession.vue'),
        meta: {
          title: 'Create Education Session',
          allowedRoles: ['admin']
        }
      },
      {
        path: 'session/:id',
        name: 'AdminSessionDetails',
        component: () => import('@/views/education/SessionDetailsView.vue'),
        props: true,
        meta: {
          title: 'Session Details'
        }
      },
      {
        path: 'edit/:id',
        name: 'EditEducationSession',
        component: () => import('@/views/education/CreateEducationSession.vue'),
        props: true,
        meta: {
          title: 'Edit Education Session',
          allowedRoles: ['admin']
        }
      }
    ]
  },

  // Profile routes (Agent-only)
  {
    path: '/profile-test',
    name: 'profile-test',
    component: () => import('@/views/profile/ProfileTest.vue'),
    meta: {
      allowedRoles: ['agent'],
      fullAppOnly: true // Only available when full app features are enabled
    }
  },
  {
    path: '/profile',
    component: () => import('@/views/profile/ProfileLayout.vue'),
    meta: {
      hideHeader: true,
      background: '#f9fafb',
      allowedRoles: ['agent'],
      fullAppOnly: true // Only available when full app features are enabled
    },
    children: [
      {
        path: '',
        name: 'Profile',
        component: () => import('@/views/profile/ProfileLayout.vue'),
      },
      {
        path: 'edit',
        name: 'ProfileEdit',
        component: () => import('@/views/profile/ProfileEdit.vue'),
      },
      {
        path: 'listings',
        name: 'ProfileListings',
        component: () => import('@/views/profile/ProfileListings.vue'),
      },
      {
        path: 'documents',
        name: 'ProfileDocuments',
        component: () => import('@/views/profile/ProfileDocuments.vue'),
      },
      {
        path: 'documents/edit/:id',
        name: 'ProfileDocumentEdit',
        component: () => import('@/views/profile/DocumentEdit.vue'),
      }
    ]
  },
  // Search results route - accessible to all
  {
    path: '/search',
    name: 'SearchResults',
    component: () => import('@/views/SearchResults.vue'),
    meta: {
      hideHeader: true,
      hideSidebar: true,
      layout: 'public',
      title: 'Search Results',
      publicAccess: true,
      allowedRoles: ['all', 'admin', 'agent', 'client']
    }
  },

  // Public property routes - accessible to all
  {
    path: '/allproperties',
    name: 'AllProperties',
    component: () => import('@/views/AllProperties.vue'),
    meta: {
      hideHeader: true,
      hideSidebar: true,
      layout: 'public',
      title: 'All Properties',
      publicAccess: true,
      allowedRoles: ['all', 'admin', 'agent', 'client']
    }
  },
  {
    path: '/property/:id',
    name: 'PropertyDetail',
    component: () => import('@/views/PropertyDetail.vue'),
    meta: {
      hideHeader: true,
      hideSidebar: true,
      layout: 'public',
      title: 'Property Details',
      publicAccess: true,
      allowedRoles: ['all', 'admin', 'agent', 'client']
    }
  },
  {
    path: '/property/:listingKey',
    name: 'TrebPropertyDetail',
    component: () => import('@/views/TrebPropertyDetail.vue'),
    meta: {
      hideHeader: true,
      hideSidebar: true,
      layout: 'public',
      title: 'Property Details',
      publicAccess: true,
      allowedRoles: ['all', 'admin', 'agent', 'client']
    }
  },
  {
    path: '/property/:listingKey/gallery',
    name: 'PropertyGallery',
    component: PropertyGallery,
    meta: {
      public: true,
      publicAccess: true,
      hideHeader: true,
      hideSidebar: true,
      layout: 'public',
      title: 'Property Gallery',
      allowedRoles: ['all', 'admin', 'agent', 'client'],
      requiresAuth: false
    },
    beforeEnter: publicGuard
  },
  // Clients route (Admin-only)
  {
    path: '/clients',
    name: 'Clients',
    component: () => import('@/views/admin/ClientsView.vue'),
    meta: {
      title: 'Clients',
      allowedRoles: ['admin'],
      fullAppOnly: true // Only available when full app features are enabled
    }
  },
  // Client Profile route (Admin-only)
  {
    path: '/clients/:id',
    name: 'ClientProfile',
    component: () => import('@/views/admin/ClientProfileView.vue'),
    meta: {
      title: 'Client Profile',
      allowedRoles: ['admin'],
      fullAppOnly: true // Only available when full app features are enabled
    }
  },
  // Admin Property Detail route (Admin-only)
  {
    path: '/admin/property/:propertyId',
    name: 'PropertyDetail',
    component: () => import('@/views/admin/PropertyDetailView.vue'),
    meta: {
      title: 'Property Details',
      allowedRoles: ['admin'],
      fullAppOnly: true // Only available when full app features are enabled
    }
  },
  // Admin Profile route (Admin-only)
  {
    path: '/admin/profile',
    name: 'AdminProfile',
    component: () => import('@/views/admin/AdminProfileView.vue'),
    meta: {
      title: 'Admin Profile',
      allowedRoles: ['admin'],
      fullAppOnly: true // Only available when full app features are enabled
    }
  },
  // Admin Agent Profile route (Admin-only)
  {
    path: '/admin/agent/:id',
    name: 'AdminAgentProfile',
    component: () => import('@/views/admin/AgentProfileView.vue'),
    meta: {
      title: 'Agent Profile',
      allowedRoles: ['admin'],
      fullAppOnly: true // Only available when full app features are enabled
    }
  },
  // Admin Document Edit route (Admin-only)
  {
    path: '/admin/document/:id/edit',
    name: 'AdminDocumentEdit',
    component: () => import('@/views/admin/AdminDocumentEdit.vue'),
    meta: {
      title: 'Edit Document',
      allowedRoles: ['admin'],
      fullAppOnly: true // Only available when full app features are enabled
    }
  },
  // Admin Document Create route (Admin-only)
  {
    path: '/admin/document/new',
    name: 'AdminDocumentCreate',
    component: () => import('@/views/admin/AdminDocumentEdit.vue'),
    meta: {
      title: 'Create Document',
      allowedRoles: ['admin'],
      fullAppOnly: true // Only available when full app features are enabled
    }
  },
  // Tour routes
  {
    path: '/tours',
    name: 'Tours',
    component: () => import('@/features/tour/TourList.vue'),
    meta: {
      requiresAuth: true,
      fullAppOnly: true // Only available when full app features are enabled
    },
    children: [
      {
        path: '',
        redirect: '/tours/scheduled'
      },
      {
        path: 'scheduled',
        name: 'ScheduledTours',
        component: () => import('@/features/tour/TourList.vue')
      },
      {
        path: 'in-progress',
        name: 'InProgressTours',
        component: () => import('@/features/tour/TourList.vue')
      },
      {
        path: 'drafts',
        name: 'DraftTours',
        component: () => import('@/features/tour/TourList.vue')
      },
      {
        path: 'completed',
        name: 'CompletedTours',
        component: () => import('@/features/tour/TourList.vue')
      }
    ]
  },
  {
    path: '/tours/create',
    name: 'CreateTour',
    component: () => import('@/features/tour/TourCreate.vue'),
    meta: {
      requiresAuth: true,
      fullAppOnly: true // Only available when full app features are enabled
    }
  },
  {
    path: '/tours/:id/edit',
    name: 'EditTour',
    component: () => import('@/features/tour/TourCreate.vue'),
    meta: {
      requiresAuth: true,
      fullAppOnly: true // Only available when full app features are enabled
    }
  },
  // Auth routes
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: {
      hideHeader: true,
      hideSidebar: true,
      layout: 'public',
      publicAccess: true
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/auth/SignupView.vue'),
    meta: {
      hideHeader: true,
      hideSidebar: true,
      layout: 'public',
      publicAccess: true
    }
  },
  // Error and fallback routes
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import('@/views/UnauthorizedView.vue'),
    props: (route) => ({ redirect: route.query.redirect }),
    meta: {
      title: 'Unauthorized Access',
      hideHeader: false
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/public/AboutView.vue'),
    meta: {
      title: 'About Us',
      description: 'Learn more about our company',
      publicAccess: true,
      hideHeader: false,
      hideSidebar: true,
      layout: 'public',
      noCache: true
    }
  },
  {
    path: '/careers',
    name: 'Careers',
    component: () => import('@/views/public/CareersView.vue'),
    meta: {
      title: 'Careers',
      description: 'Join our team',
      publicAccess: true,
      hideHeader: false,
      hideSidebar: true,
      layout: 'public',
      noCache: true
    }
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('@/views/public/TermsView.vue'),
    meta: {
      title: 'Terms & Conditions',
      description: 'Read our terms and conditions',
      publicAccess: true
    }
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/views/public/PrivacyView.vue'),
    meta: {
      title: 'Privacy Policy',
      description: 'Read our privacy policy',
      publicAccess: true
    }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/views/BlogView.vue'),
    meta: {
      title: 'Blog',
      description: 'Read our latest updates and insights',
      publicAccess: true
    }
  },
  {
    path: '/blog/:id',
    name: 'BlogDetail',
    component: () => import('@/views/BlogDetailView.vue'),
    meta: {
      publicAccess: true
    }
  },
  {
    path: '/find-agents',
    name: 'FindAgents',
    component: () => import('@/views/public/FindAgentsView.vue'),
    meta: { title: 'Find Agents', allowedRoles: ['all', 'admin', 'agent', 'client'] }
  },
  {
    path: '/allproperties/:slug',
    name: 'AllPropertiesDetails',
    component: () => import('@/views/public/AllPropertiesDetails.vue'),
    meta: {
      hideHeader: false,
      hideSidebar: true,
      layout: 'public',
      title: 'Property Details',
      allowedRoles: ['all', 'admin', 'agent', 'client'],
      publicAccess: true
    }
  },
  {
    path: '/buy',
    name: 'buy-properties',
    component: () => import('@/views/public/BuyProperties.vue'),
    meta: {
      requiresAuth: false,
      title: 'Properties for Sale',
      publicAccess: true
    },
    beforeEnter: publicGuard
  },
  {
    path: '/rent',
    name: 'rent-properties',
    component: () => import('@/views/public/RentProperties.vue'),
    meta: {
      requiresAuth: false,
      title: 'Properties for Rent',
      publicAccess: true
    },
    beforeEnter: publicGuard
  },
  {
    path: '/lifestyle',
    name: 'Lifestyle',
    component: () => import('@/views/public/LifestyleView.vue'),
    meta: {
      title: 'Lifestyle & Community',
      description: 'Discover our vibrant communities and lifestyle opportunities',
      publicAccess: true,
      hideHeader: true,
      hideSidebar: true,
      layout: 'public',
      noCache: true
    }
  },
  {
    path: '/legal-notice',
    name: 'LegalNotice',
    component: () => import('@/views/public/LegalNoticeView.vue'),
    meta: {
      title: 'Legal Notice',
      description: 'Important legal information about our services',
      publicAccess: true,
      hideHeader: true,
      hideSidebar: true,
      layout: 'public',
      noCache: true
    }
  },
  // Feature disabled route
  {
    path: '/feature-disabled',
    name: 'FeatureDisabled',
    component: () => import('@/views/FeatureDisabled.vue'),
    meta: {
      title: 'Feature Unavailable',
      hideHeader: true,
      hideSidebar: true,
      layout: 'public'
    }
  },
  // Feature test route (for debugging)
  {
    path: '/feature-test',
    name: 'FeatureTest',
    component: () => import('@/views/FeatureTest.vue'),
    meta: {
      title: 'Feature Flag Test',
      hideHeader: true,
      hideSidebar: true,
      layout: 'public'
    }
  },
  // 404 route - must be the last route
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue')
  }
];

// Create router instance
const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, left: 0, behavior: 'instant' };
  }
});

// Feature flag guard function
const featureFlagGuard = (to, from, next) => {
  // If feature flags haven't been initialized yet, allow navigation
  if (!isFeatureFlagsInitialized()) {
    return next();
  }

  // Check if the route requires a specific feature flag
  if (to.meta.requiresFeature) {
    const requiredFeature = to.meta.requiresFeature;
    if (!isFeatureEnabled(requiredFeature)) {
      console.warn(`Feature ${requiredFeature} is disabled, redirecting to feature disabled page`);
      return next('/feature-disabled');
    }
  }

  // Check if the route is for full app features when they're disabled
  if (to.meta.fullAppOnly && !isFeatureEnabled('fullAppFeature')) {
    // Allow access if user is authenticated and trying to access their role-appropriate route
    const roleStore = useRoleStore();
    const currentRole = roleStore.currentRole;

    if (currentRole && currentRole !== 'all' && to.meta.allowedRoles && to.meta.allowedRoles.includes(currentRole)) {
      console.log(`Allowing ${currentRole} user to access ${to.path} despite full app features being disabled`);
      return next();
    }

    console.warn('Full app features are disabled, redirecting to feature disabled page');
    return next('/feature-disabled');
  }

  // Check if the route is for MVP features when they're disabled
  if (to.meta.mvpOnly && !isFeatureEnabled('mvpFeature')) {
    console.warn('MVP features are disabled, redirecting to feature disabled page');
    return next('/feature-disabled');
  }

  // If user is trying to access any role-specific route when full app is disabled
  // BUT allow authenticated users to access their role-appropriate routes
  if (!isFeatureEnabled('fullAppFeature') &&
      (to.meta.allowedRoles &&
       to.meta.allowedRoles.some(role => ['admin', 'agent', 'client'].includes(role)) &&
       !to.meta.publicAccess)) {

    // Check if user is authenticated and trying to access their appropriate route
    const roleStore = useRoleStore();
    const currentRole = roleStore.currentRole;

    // If user has a specific role and is trying to access a route for that role, allow it
    if (currentRole && currentRole !== 'all' && to.meta.allowedRoles.includes(currentRole)) {
      console.log(`Allowing ${currentRole} user to access ${to.path} despite full app features being disabled`);
      return next();
    }

    // Otherwise, redirect to feature disabled page
    console.warn('Full app features are disabled, redirecting to feature disabled page');
    return next('/feature-disabled');
  }

  next();
};

// Apply global navigation guards
router.beforeEach(authGuard);
router.beforeEach(featureFlagGuard);

// Add global navigation guard for landing page
router.beforeEach((to, from, next) => {
  // If navigating to landing page or buy/rent properties
  if (to.path === '/landing' || to.path === '/buy' || to.path === '/rent') {
    // Do not mutate to.query or to.meta.reload
    // Just allow navigation
  }
  next();
});

// Set up permission guard
router.beforeEach(permissionGuard);

// Add navigation fail-safe to prevent blank pages
router.beforeEach((to, from, next) => {
  // Get current time for navigation timing
  const navStartTime = Date.now();

  // Store state of previous navigation attempt
  const previousNavState = sessionStorage.getItem('navInProgress');

  // Mark this navigation as in progress
  sessionStorage.setItem('navInProgress', JSON.stringify({
    from: from.path,
    to: to.path,
    time: navStartTime
  }));

  // Check if previous navigation is still in progress (could indicate stuck transition)
  if (previousNavState) {
    try {
      const prevNav = JSON.parse(previousNavState);
      const timeSincePrevNav = navStartTime - prevNav.time;

      // If previous navigation never completed and it's been more than 3 seconds
      if (timeSincePrevNav > 3000) {
        console.warn('Previous navigation appears to be stuck. Clearing router state.');

        // Force release of any resources
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('router:cleanup'));
        }
      }
    } catch (e) {
      console.error('Error checking navigation state:', e);
    }
  }

  // If we're navigating to the same path with the same hash, cancel navigation
  if (to.path === from.path && to.hash === from.hash) {
    // Already on this page, so prevent unnecessary re-render
    sessionStorage.removeItem('navInProgress');
    return next(false);
  }

  // Add a timeout to detect stalled navigations
  const navigationTimeout = setTimeout(() => {
    console.warn('Navigation timeout reached for', to.path);
    // Force navigation to complete to prevent blank page
    sessionStorage.removeItem('navInProgress');
    window.dispatchEvent(new CustomEvent('router:cleanup'));
  }, 5000); // 5 second timeout

  // Store the timeout ID to clear it on successful navigation
  window._navigationTimeoutId = navigationTimeout;

  next();
});

// Add navigation completion marker
router.afterEach((to, from) => {
  // Clear any navigation timeout
  if (window._navigationTimeoutId) {
    clearTimeout(window._navigationTimeoutId);
    window._navigationTimeoutId = null;
  }

  // Clear the in-progress marker
  sessionStorage.removeItem('navInProgress');

  // Log completion
  console.log(`Navigation complete: ${from.path} → ${to.path}`);
});

// Setup debugging hooks
setupRouterDebug(router);

// Expose router instance
export default router;
