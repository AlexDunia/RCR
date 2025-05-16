import { createRouter, createWebHashHistory } from 'vue-router';
import { useRoleStore } from '@/stores/roleStore';
import DocumentLayout from '@/layouts/DocumentLayout.vue';
import TasksLayout from '@/layouts/TasksLayout.vue';
import EducationLayout from '@/layouts/EducationLayout.vue';
import permissionGuard from './guards/permissionGuard';
import { setupRouterDebug } from '@/utils/router-debug';

// Lazy-loaded route components
const routes = [
  // Landing page route (accessible to everyone)
  {
    path: '/landing',
    name: 'Landing',
    component: () => import('@/views/LandingPage.vue'),
    meta: {
      title: 'Welcome to RealCity',
      description: 'The ultimate real estate management platform',
      hideHeader: true,
      allowedRoles: ['admin', 'agent', 'client', 'all']
    }
  },
  // Home route redirect to landing
  {
    path: '/home',
    redirect: '/landing'
  },
  // Root path - redirect based on user role
  {
    path: '/',
    name: 'Root',
    redirect: () => {
      const roleStore = useRoleStore();
      const currentRole = roleStore.currentRole;

      if (currentRole === 'admin') {
        return '/admin-dashboard';
      } else if (currentRole === 'agent') {
        return '/agent-dashboard';
      } else if (currentRole === 'client') {
        return '/client-dashboard';
      } else {
        return '/landing';
      }
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
      allowedRoles: ['admin']
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
      allowedRoles: ['admin']
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
      allowedRoles: ['agent']
    }
  },

  // Client Dashboard route (Client-only)
  {
    path: '/client-dashboard',
    name: 'ClientDashboard',
    component: () => import('@/views/dashboard/ClientDashboardView.vue'),
    beforeEnter: (to, from, next) => {
      const roleStore = useRoleStore();
      if (roleStore.currentRole === 'client') {
        next();
      } else {
        next('/'); // Redirect to root which will handle based on role
      }
    },
    meta: {
      title: 'Client Dashboard',
      description: 'View your properties, documents, and communications',
      allowedRoles: ['client']
    }
  },
  // Client Properties route (Client-only)
  {
    path: '/client-properties',
    name: 'ClientProperties',
    component: () => import('@/views/client/PropertiesView.vue'),
    meta: {
      title: 'My Properties',
      description: 'View and manage your properties',
      allowedRoles: ['client']
    }
  },
  // Client Find Agents route (Client-only)
  {
    path: '/client-find-agents',
    name: 'ClientFindAgents',
    component: () => import('@/views/client/ClientAgentsView.vue'),
    meta: {
      title: 'Find Agents',
      description: 'Browse and connect with real estate agents',
      allowedRoles: ['client']
    }
  },
  // Client Agent Profile route (Client-only)
  {
    path: '/client-find-agents/:id',
    component: () => import('@/views/client/AgentProfileView.vue'),
    meta: {
      title: 'Agent Profile',
      description: 'View detailed information about an agent',
      allowedRoles: ['client']
    },
    children: [
      {
        path: '',
        name: 'ClientAgentProfile',
        redirect: to => {
          return { name: 'AgentBio', params: { id: to.params.id } };
        }
      },
      {
        path: 'bio',
        name: 'AgentBio',
        component: () => import('@/views/client/AgentProfileView.vue'),
        meta: {
          tab: 'bio',
          allowedRoles: ['client']
        }
      },
      {
        path: 'listings',
        name: 'AgentListings',
        component: () => import('@/views/client/AgentProfileView.vue'),
        meta: {
          tab: 'listings',
          allowedRoles: ['client']
        }
      },
      {
        path: 'documents',
        name: 'AgentDocuments',
        component: () => import('@/views/client/AgentProfileView.vue'),
        meta: {
          tab: 'documents',
          allowedRoles: ['client']
        }
      }
    ]
  },
  // Client Favourites route (Client-only)
  {
    path: '/client-favourites',
    name: 'ClientFavourites',
    component: () => import('@/views/client/FavouritesView.vue'),
    meta: {
      title: 'Favourites',
      description: 'View your saved properties and agents',
      allowedRoles: ['client']
    }
  },
  // Favourite Agent Profile route (Client-only)
  {
    path: '/client-favourites/agent/:id',
    name: 'FavouriteAgentProfile',
    component: () => import('@/views/client/AgentProfileView.vue'),
    meta: {
      title: 'Agent Profile',
      description: 'View agent profile from favourites',
      allowedRoles: ['client']
    }
  },
  // Client Property Detail route (Client-only)
  {
    path: '/client-property/:id',
    name: 'ClientPropertyDetail',
    component: () => import('@/views/client/PropertyDetailView.vue'),
    meta: {
      title: 'Property Details',
      description: 'View detailed information about a property',
      allowedRoles: ['client']
    }
  },
  // Client Documents route (Client-only)
  {
    path: '/client-documents',
    name: 'ClientDocuments',
    component: () => import('@/views/client/DocumentsView.vue'),
    meta: {
      title: 'Documents',
      description: 'View and manage your documents',
      allowedRoles: ['client']
    }
  },
  // Client Appointments route (Client-only)
  {
    path: '/client-appointments',
    name: 'ClientAppointments',
    component: () => import('@/views/client/AppointmentsView.vue'),
    meta: {
      title: 'Appointments',
      description: 'Schedule and manage property viewings',
      allowedRoles: ['client']
    }
  },
  // Client Messages route (Client-only)
  {
    path: '/client-messages',
    name: 'ClientMessages',
    component: () => import('@/views/client/MessagesView.vue'),
    meta: {
      title: 'Messages',
      description: 'Communicate with your agent',
      allowedRoles: ['client']
    }
  },

  // Manage Listings routes (Agent-only)
  {
    path: '/manage-listings',
    component: () => import('@/views/agents/ManageListings.vue'),
    meta: {
      title: 'Manage Listings',
      allowedRoles: ['agent']
    }
  },
  {
    path: '/add-listing',
    component: () => import('@/views/agents/AddListing.vue'),
    meta: {
      title: 'Add Listing',
      allowedRoles: ['agent']
    }
  },
  {
    path: '/view-listings',
    component: () => import('@/views/listings/ViewListings.vue'),
    meta: {
      title: 'View Listings',
      allowedRoles: ['agent'] // Restricted to agents as per your request
    }
  },
  {
    path: '/pending-approvals',
    component: () => import('@/views/listings/PendingApprovals.vue'),
    meta: {
      title: 'Pending Approvals',
      allowedRoles: ['agent'] // Restricted to agents as per your request
    }
  },
  {
    path: '/drafts',
    component: () => import('@/views/listings/Drafts.vue'),
    meta: {
      title: 'Drafts',
      allowedRoles: ['agent']
    }
  },

  // Tasks routes (Agent-only)
  {
    path: '/tasks',
    component: TasksLayout,
    meta: { allowedRoles: ['agent'] }, // Restrict parent route to agents
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
    meta: { allowedRoles: ['admin'] }, // Restrict to admin only
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
      allowedRoles: ['admin']
    }
  },
  {
    path: '/admin/client-task/:id/edit',
    name: 'EditClientTask',
    component: () => import('@/views/admin/EditClientTask.vue')
  },

  // Agent Profile route (Agent-only)
  {
    path: '/agent-profile',
    name: 'AgentProfile',
    component: () => import('@/views/agents/AgentProfile.vue'),
    meta: { allowedRoles: ['agent'] }
  },

  // Document management routes (Agent-only)
  {
    path: '/receipts-docs',
    component: DocumentLayout,
    meta: { allowedRoles: ['agent'] }, // Restrict parent route to agents
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
      allowedRoles: ['agent']
    }
  },
  {
    path: '/receipts-docs/document/:id/edit',
    name: 'DocumentEdit',
    component: () => import('@/views/documents/DocumentEdit.vue'),
    meta: {
      title: 'Edit Document',
      allowedRoles: ['agent']
    }
  },
  {
    path: '/receipts-docs/document/new',
    name: 'DocumentCreate',
    component: () => import('@/views/documents/DocumentEdit.vue'),
    meta: {
      title: 'Create Document',
      allowedRoles: ['agent']
    }
  },
  {
    path: '/receipts-docs/view-docs',
    name: 'ViewDocs',
    component: () => import('@/views/documents/ViewDocs.vue'),
    meta: {
      title: 'All Documents',
      allowedRoles: ['agent']
    }
  },

  // Marketing routes (Agent-only)
  {
    path: '/marketing-tools',
    component: () => import('@/views/marketing/MarketingTools.vue'),
    meta: {
      allowedRoles: ['agent', 'admin'],
      requiredPermissions: ['view-marketing-plans']
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
    meta: { allowedRoles: ['admin'] } // Restrict to admin
  },
  {
    path: '/chat/client',
    name: 'ClientChat',
    component: () => import('@/views/chat/ClientChatView.vue'),
    meta: { allowedRoles: ['agent'] } // Restrict to agent
  },

  // Education & Training routes (Agent-only)
  {
    path: '/education-training',
    component: EducationLayout,
    meta: { allowedRoles: ['agent'] }, // Restrict parent route to agents
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
    meta: { allowedRoles: ['admin'] }, // Restrict to admin
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
    meta: { allowedRoles: ['agent'] }
  },
  {
    path: '/profile',
    component: () => import('@/views/profile/ProfileLayout.vue'),
    meta: {
      hideHeader: true,
      background: '#f9fafb',
      allowedRoles: ['agent']
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
  {
    path: '/property/:id',
    name: 'PropertyDetail',
    component: () => import('@/views/listings/PropertyDetail.vue'),
    meta: {
      title: 'Property Details',
      hideSidebar: false,
      allowedRoles: ['admin', 'agent'] // Allow both admin and agent
    }
  },
  {
    path: '/properties',
    name: 'Properties',
    component: () => import('@/views/listings/PropertiesView.vue'),
    meta: {
      title: 'All Properties',
      allowedRoles: ['admin', 'agent'] // Allow both admin and agent
    }
  },
  // Clients route (Admin-only)
  {
    path: '/clients',
    name: 'Clients',
    component: () => import('@/views/admin/ClientsView.vue'),
    meta: {
      title: 'Clients',
      allowedRoles: ['admin']
    }
  },
  // Client Profile route (Admin-only)
  {
    path: '/clients/:id',
    name: 'ClientProfile',
    component: () => import('@/views/admin/ClientProfileView.vue'),
    meta: {
      title: 'Client Profile',
      allowedRoles: ['admin']
    }
  },
  // Admin Property Detail route (Admin-only)
  {
    path: '/admin/property/:propertyId',
    name: 'PropertyDetail',
    component: () => import('@/views/admin/PropertyDetailView.vue'),
    meta: {
      title: 'Property Details',
      allowedRoles: ['admin']
    }
  },
  // Admin Profile route (Admin-only)
  {
    path: '/admin/profile',
    name: 'AdminProfile',
    component: () => import('@/views/admin/AdminProfileView.vue'),
    meta: {
      title: 'Admin Profile',
      allowedRoles: ['admin']
    }
  },
  // Admin Agent Profile route (Admin-only)
  {
    path: '/admin/agent/:id',
    name: 'AdminAgentProfileDetail',
    component: () => import('@/views/admin/AgentProfileView.vue'),
    meta: {
      title: 'Agent Profile',
      allowedRoles: ['admin']
    }
  },
  // Agent Profile route (Admin-only)
  {
    path: '/agent/:id',
    name: 'AgentProfileDetail',
    component: () => import('@/views/admin/AgentProfileView.vue'),
    meta: {
      title: 'Agent Profile',
      allowedRoles: ['admin']
    }
  },
  // Admin Document Edit route (Admin-only)
  {
    path: '/admin/document/:id/edit',
    name: 'AdminDocumentEdit',
    component: () => import('@/views/admin/AdminDocumentEdit.vue'),
    meta: {
      title: 'Edit Document',
      allowedRoles: ['admin']
    }
  },
  // Admin Document Create route (Admin-only)
  {
    path: '/admin/document/new',
    name: 'AdminDocumentCreate',
    component: () => import('@/views/admin/AdminDocumentEdit.vue'),
    meta: {
      title: 'Create Document',
      allowedRoles: ['admin']
    }
  },
  // Tour routes
  {
    path: '/tours',
    name: 'Tours',
    component: () => import('@/features/tour/TourList.vue'),
    meta: { requiresAuth: true },
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
    meta: { requiresAuth: true }
  },
  {
    path: '/tours/:id/edit',
    name: 'EditTour',
    component: () => import('@/features/tour/TourCreate.vue'),
    meta: { requiresAuth: true }
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

  // 404 route - must be the last route
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue')
  }
];

// Create router instance
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
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
