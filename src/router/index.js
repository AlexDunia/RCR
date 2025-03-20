import { createRouter, createWebHashHistory } from 'vue-router';
import { useLayoutStore } from '@/stores/layout';

// Layout components
import DocumentLayout from '@/layouts/DocumentLayout.vue'
import TasksLayout from '@/layouts/TasksLayout.vue'
import EducationLayout from '@/layouts/EducationLayout.vue'

// Feature components - business logic and domain-specific functionality
import UserProfile from '@/features/profile/ProfilePage.vue'
import UserProfileEdit from '@/features/profile/ProfileEdit.vue'
import PendingApprovals from '@/features/listings/PendingApprovals.vue';
import Drafts from '@/features/listings/Drafts.vue';
import InProgressTasks from '@/features/tasks/InProgressTasks.vue';
import ScheduledTasks from '@/features/tasks/ScheduledTasks.vue';
import CompletedTasks from '@/features/tasks/CompletedTasks.vue';
import TaskCreate from '@/features/tasks/TaskCreate.vue';
import TaskDetail from '@/features/tasks/TaskDetail.vue';
import CompletedTaskDetail from '@/features/tasks/CompletedTaskDetail.vue';
import AgentProfile from '@/features/agents/AgentProfile.vue';
import DocumentEdit from '@/features/profile/DocumentEdit.vue';

// View components - page compositions and layouts
import MarketingTools from '@/views/marketing/MarketingTools.vue';
import SuccessPlan from '@/views/marketing/SuccessPlan.vue';
import CreateSuccessPlan from '@/views/CreateSuccessPlan.vue';
import MarketingPlanDetail from '@/views/marketing/MarketingPlanDetail.vue';
import MyChecklist from '@/views/marketing/MyChecklist.vue';
import ChecklistCreate from '@/views/marketing/ChecklistCreate.vue';
import ChecklistDetail from '@/views/marketing/ChecklistDetail.vue';
import ChecklistEdit from '@/views/marketing/ChecklistEdit.vue';
import DoneForYou from '@/views/marketing/DoneForYou.vue';
import SocialPlatforms from '@/views/marketing/SocialPlatforms.vue';

// Lazy-loaded route components
const routes = [
  // Dashboard route - Business feature for dashboard functionality
  {
    path: '/',
    name: 'AgentDashboardView',
    component: () => import('@/features/dashboard/DashboardPage.vue')
  },

  // Manage Listings routes - Business features for agent functionality
  {
    path: '/manage-listings',
    component: () => import('@/features/agents/ManageListings.vue'),
    meta: {
      title: 'Manage Listings'
    }
  },
  {
    path: '/add-listing',
    component: () => import('@/features/agents/AddListing.vue'),
    meta: {
      title: 'Add Listing'
    }
  },
  {
    path: '/edit-listing/:id',
    component: () => import('@/features/agents/EditListing.vue'),
    meta: {
      title: 'Edit Listing'
    }
  },
  {
    path: '/view-listings',
    component: () => import('@/features/listings/ListingsPage.vue'),
    meta: {
      title: 'View Listings'
    }
  },
  {
    path: '/pending-approvals',
    component: PendingApprovals,
    meta: {
      title: 'Pending Approvals'
    }
  },
  {
    path: '/drafts',
    component: Drafts,
    meta: {
      title: 'Drafts'
    }
  },

  // Tasks routes
  {
    path: '/tasks',
    component: TasksLayout,
    children: [
      {
        path: '',
        redirect: '/tasks/in-progress'
      },
      {
        path: 'in-progress',
        component: InProgressTasks
      },
      {
        path: 'drafts',
        component: () => import('@/features/tasks/DraftTasks.vue')
      },
      {
        path: 'scheduled',
        name: 'ScheduledTasks',
        component: ScheduledTasks
      },
      {
        path: 'completed',
        component: CompletedTasks
      },
      {
        path: 'create',
        component: TaskCreate,
        meta: {
          hideSidebar: true,
          hideHeader: true
        }
      },
      {
        path: ':id',
        name: 'TaskDetail',
        component: TaskDetail,
        meta: {
          hideSidebar: true,
          hideHeader: true
        }
      },
      {
        path: 'completed/:id',
        name: 'CompletedTaskDetail',
        component: CompletedTaskDetail,
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
    component: AgentProfile
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
    component: MarketingTools,
    children: [
      {
        path: '',
        component: SuccessPlan
      },
      {
        path: 'success-plan',
        component: SuccessPlan
      },
      {
        path: 'create',
        component: CreateSuccessPlan
      },
      {
        path: 'plan/:id',
        component: MarketingPlanDetail
      },
      {
        path: 'checklist',
        name: 'ChecklistList',
        component: MyChecklist,
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'checklist/create',
        name: 'ChecklistCreate',
        component: ChecklistCreate
      },
      {
        path: 'checklist/:id',
        name: 'ChecklistDetail',
        component: ChecklistDetail,
        props: true,
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'checklist/:id/edit',
        name: 'ChecklistEdit',
        component: ChecklistEdit
      },
      {
        path: 'done-for-you',
        component: DoneForYou
      },
      {
        path: 'social-platforms',
        component: SocialPlatforms
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
        component: () => import('@/views/education/EducationTrainingView.vue'),
        meta: {
          title: 'Education & Training'
        }
      },
      {
        path: 'create',
        name: 'CreateEducationSession',
        component: () => import('@/views/education/CreateEducationSession.vue'),
        meta: {
          title: 'Create Education Session'
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
        component: () => import('@/features/profile/ProfileListings.vue')
      },
      {
        path: 'documents',
        name: 'profile-documents',
        component: () => import('@/features/profile/ProfileDocuments.vue')
      },
      {
        path: 'documents/edit/:id',
        name: 'profile-document-edit',
        component: DocumentEdit
      }
    ]
  },
  {
    path: '/profile/edit',
    name: 'profile-edit',
    component: UserProfileEdit
  },
  {
    path: '/property/:id',
    name: 'PropertyDetail',
    component: () => import('@/features/listings/PropertyDetail.vue'),
    meta: {
      title: 'Property Details',
      hideSidebar: false
    }
  },
  {
    path: '/listing/:id',
    name: 'ListingDetail',
    component: () => import('@/features/listings/ListingDetail.vue'),
    meta: {
      title: 'Listing Details',
      hideSidebar: false
    }
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

  // Get the layout store
  const layoutStore = useLayoutStore();

  // Reset layout when navigating to dashboard or main navigation routes
  if (to.path === '/' || to.path === '/manage-listings' || to.path === '/view-listings') {
    layoutStore.resetLayout();
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
