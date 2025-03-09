import { createRouter, createWebHistory } from 'vue-router';
import { useLayoutStore } from '@/stores/layout';

// Lazy-loaded route components
const routes = [
  // Dashboard routes
  {
    path: '/',
    name: 'AgentDashboardView',
    component: () => import('@/views/dashboard/AgentDashboardView.vue')
  },
  {
    path: '/agent-profile',
    name: 'AgentProfile',
    component: () => import('@/views/agents/AgentProfile.vue')
  },

  // Listing routes
  {
    path: '/view-listings',
    name: 'ViewListings',
    component: () => import('@/views/listings/ViewListings.vue'),
    meta: { title: 'View Listings' }
  },
  {
    path: '/manage-listings',
    name: 'ManageListings',
    component: () => import('@/views/agents/ManageListings.vue'),
    meta: { title: 'Manage Listings' }
  },
  {
    path: '/property/:id',
    name: 'PropertyDetail',
    component: () => import('@/views/listings/PropertyDetail.vue'),
    meta: { title: 'Property Details' }
  },
  {
    path: '/add-listing',
    name: 'AddListing',
    component: () => import('@/views/agents/AddListing.vue')
  },
  {
    path: '/pending-approvals',
    name: 'PendingApprovals',
    component: () => import('@/views/listings/PendingApprovals.vue')
  },
  {
    path: '/drafts',
    name: 'Drafts',
    component: () => import('@/views/listings/Drafts.vue')
  },

  // Task routes
  {
    path: '/tasks',
    redirect: '/tasks/in-progress'
  },
  {
    path: '/tasks/in-progress',
    name: 'InProgressTasks',
    component: () => import('@/views/tasks/InProgressTasks.vue'),
    meta: {
      requiresAuth: true,
      allowedRoles: ['agent', 'admin'],
      hideSidebar: false,
      hideHeader: false,
      background: '#F9FAFB'
    }
  },
  {
    path: '/tasks/drafts',
    name: 'DraftTasks',
    component: () => import('@/views/tasks/DraftTasks.vue'),
    meta: {
      requiresAuth: true,
      allowedRoles: ['agent', 'admin'],
      hideSidebar: false,
      hideHeader: false,
      background: '#F9FAFB'
    }
  },
  {
    path: '/tasks/completed',
    name: 'CompletedTasks',
    component: () => import('@/views/tasks/CompletedTasks.vue'),
    meta: {
      requiresAuth: true,
      allowedRoles: ['agent', 'admin'],
      hideSidebar: false,
      hideHeader: false,
      background: '#F9FAFB'
    }
  },
  {
    path: '/tasks/create',
    name: 'TaskCreate',
    component: () => import('@/components/task/TaskCreate.vue'),
    meta: {
      requiresAuth: true,
      allowedRoles: ['agent', 'admin'],
      hideSidebar: true,
      hideHeader: true,
      background: '#FFFFFF'
    }
  },
  {
    path: '/tasks/:id',
    name: 'TaskDetail',
    component: () => import('@/components/task/TaskDetail.vue'),
    meta: {
      requiresAuth: true,
      allowedRoles: ['agent', 'admin'],
      hideSidebar: true,
      hideHeader: true,
      background: '#FFFFFF'
    }
  },
  {
    path: '/tasks/completed/:id',
    name: 'CompletedTaskDetail',
    component: () => import('@/views/tasks/CompletedTaskDetail.vue'),
    meta: {
      requiresAuth: true,
      allowedRoles: ['agent', 'admin'],
      hideSidebar: false,
      hideHeader: true,
      background: '#FFFFFF'
    }
  },

  // Marketing routes
  {
    path: '/marketing-tools',
    component: () => import('@/views/marketing/MarketingTools.vue'),
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
        component: () => import('@/views/marketing/CreateSuccessPlan.vue')
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
        component: () => import('@/views/marketing/ChecklistCreate.vue')
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
        component: () => import('@/views/marketing/ChecklistEdit.vue')
      },
      {
        path: 'done-for-you',
        component: () => import('@/views/marketing/DoneForYou.vue')
      },
      {
        path: 'social-platforms',
        component: () => import('@/views/marketing/SocialPlatforms.vue')
      },
      {
        path: 'social-platforms/create',
        component: () => import('@/views/marketing/CreateSocialPost.vue'),
        meta: {
          hideSidebar: true,
          hideHeader: true,
          background: '#f9fafb'
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
      }
    ]
  },

  // Chat routes
  {
    path: '/chat/admin',
    name: 'AdminChat',
    component: () => import('@/views/chat/AdminChatView.vue')
  },
  {
    path: '/chat/client',
    name: 'ClientChat',
    component: () => import('@/views/chat/ClientChatView.vue')
  }
];

const router = createRouter({
  history: createWebHistory('/RCR'),
  routes,
});

// Navigation guard for role-based access control and layout
router.beforeEach(async (to, from, next) => {
  // Authentication and role checks
  if (to.meta.requiresAuth) {
    const isAuthenticated = true; // Replace with real auth check in production
    if (!isAuthenticated) {
      next('/login');
      return;
    }

    if (to.meta.allowedRoles) {
      const { useRoleGuard } = await import('@/composables/useRoleGuard');
      const { checkAccess } = useRoleGuard();
      const hasAccess = await checkAccess(to.meta.allowedRoles);
      if (!hasAccess) {
        next('/unauthorized');
        return;
      }
    }
  }

  next();
});

// Add an afterEach guard to ensure layout is properly updated
router.afterEach((to) => {
  // Force layout update after navigation is complete
  const layoutStore = useLayoutStore();

  console.log(`Router afterEach: navigated to ${to.path}`);

  // Apply the route's meta settings
  layoutStore.setLayout({
    hideSidebar: to.meta.hideSidebar || false,
    hideHeader: to.meta.hideHeader || false,
    background: to.meta.background || '#FFFFFF'
  });

  console.log(`Layout applied: hideSidebar=${layoutStore.hideSidebar}, hideHeader=${layoutStore.hideHeader}`);
});

export default router;
