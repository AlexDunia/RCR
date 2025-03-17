import { createRouter, createWebHashHistory } from 'vue-router';
import { useLayoutStore } from '@/stores/layout';
import DocumentLayout from '@/layouts/DocumentLayout.vue'
import TasksLayout from '@/layouts/TasksLayout.vue'
import EducationLayout from '@/layouts/EducationLayout.vue'
import UserProfile from '../views/Profile.vue'
import UserProfileEdit from '../views/ProfileEdit.vue'

// Lazy-loaded route components
const routes = [
  // Dashboard route
  {
    path: '/',
    name: 'AgentDashboardView',
    component: () => import('@/views/dashboard/AgentDashboardView.vue')
  },

  // Manage Listings routes
  {
    path: '/manage-listings',
    component: () => import('@/views/agents/ManageListings.vue')
  },
  {
    path: '/add-listing',
    component: () => import('@/views/agents/AddListing.vue')
  },
  {
    path: '/view-listings',
    component: () => import('@/views/listings/ViewListings.vue')
  },
  {
    path: '/pending-approvals',
    component: () => import('@/views/listings/PendingApprovals.vue')
  },
  {
    path: '/drafts',
    component: () => import('@/views/listings/Drafts.vue')
  },

  // Tasks routes
  {
    path: '/tasks',
    component: TasksLayout,
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
        component: () => import('@/components/task/TaskCreate.vue'),
        meta: {
          hideSidebar: true,
          hideHeader: true
        }
      },
      {
        path: ':id',
        name: 'TaskDetail',
        component: () => import('@/components/task/TaskDetail.vue'),
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

  // Agent Profile route
  {
    path: '/agent-profile',
    name: 'AgentProfile',
    component: () => import('@/views/agents/AgentProfile.vue')
  },

  // Document management routes
  {
    path: '/receipts-docs',
    component: DocumentLayout,
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
    component: () => import('@/views/documents/DocumentDetail.vue')
  },
  {
    path: '/receipts-docs/document/:id/edit',
    name: 'DocumentEdit',
    component: () => import('@/views/documents/DocumentEdit.vue')
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
  },

  // Education & Training routes
  {
    path: '/education-training',
    component: EducationLayout,
    children: [
      {
        path: '',
        name: 'EducationTraining',
        component: () => import('@/views/education/EducationTrainingView.vue')
      },
      {
        path: 'create',
        name: 'CreateEducationSession',
        component: () => import('@/views/education/CreateEducationSession.vue')
      },
      {
        path: 'session/:id',
        name: 'SessionDetails',
        component: () => import('@/views/education/SessionDetailsView.vue'),
        props: true
      },
      {
        path: 'module/:id',
        name: 'ModuleDetails',
        component: () => import('@/views/education/ModuleDetailsView.vue'),
        props: true
      },
      {
        path: 'test',
        name: 'EducationTest',
        component: () => import('@/views/education/TestView.vue')
      }
    ]
  },

  // Profile routes
  {
    path: '/profile',
    component: UserProfile,
    children: [
      {
        path: '',
        name: 'profile-bio',
        component: UserProfile
      },
      {
        path: 'listings',
        name: 'profile-listings',
        component: () => import('@/views/profile/ProfileListings.vue')
      },
      {
        path: 'documents',
        name: 'profile-documents',
        component: () => import('@/views/profile/ProfileDocuments.vue')
      },
      {
        path: 'documents/edit/:id',
        name: 'profile-document-edit',
        component: () => import('@/views/profile/DocumentEdit.vue')
      }
    ]
  },
  {
    path: '/profile/edit',
    name: 'profile-edit',
    component: UserProfileEdit
  }
];

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

// Navigation guard for role-based access control
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

// Handle layout changes after navigation completes to prevent flicker
router.afterEach((to) => {
  // Set layout based on route
  const layoutStore = useLayoutStore();

  // Set background color if specified in route meta
  if (to.meta.background) {
    layoutStore.setBackgroundColor(to.meta.background);
  } else {
    layoutStore.resetBackgroundColor();
  }

  // Set sidebar visibility
  if (to.meta.hideSidebar !== undefined) {
    layoutStore.setSidebarVisibility(!to.meta.hideSidebar);
  } else {
    layoutStore.setSidebarVisibility(true);
  }

  // Set header visibility
  if (to.meta.hideHeader !== undefined) {
    layoutStore.setHeaderVisibility(!to.meta.hideHeader);
  } else {
    layoutStore.setHeaderVisibility(true);
  }
});

export default router;
