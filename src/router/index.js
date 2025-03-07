import { createRouter, createWebHistory } from 'vue-router';
import ViewListings from '@/views/ViewListings.vue';
import ManageListings from '@/views/agents/ManageListings.vue';
import PropertyDetail from '@/views/PropertyDetail.vue';
import PendingApprovals from '@/views/PendingApprovals.vue';
import Drafts from '@/views/Drafts.vue';
import AddListing from '@/views/agents/AddListing.vue';
import AgentDashBoardView from '@/views/agents/AgentDashBoardView.vue';
import AgentProfile from '@/views/agents/AgentProfile.vue';
import InProgressTasks from '@/views/tasks/InProgressTasks.vue';
import DraftTasks from '@/views/tasks/DraftTasks.vue';
import CompletedTasks from '@/views/tasks/CompletedTasks.vue';
import TaskCreate from '@/components/task/TaskCreate.vue';
import TaskDetail from '@/components/task/TaskDetail.vue';
import CompletedTaskDetail from '@/views/tasks/CompletedTaskDetail.vue';
import MarketingTools from '@/views/MarketingTools.vue';
import MarketingPlanDetail from '@/views/MarketingPlanDetail.vue';
import MarketingChecklist from '@/views/MarketingChecklist.vue';
import MarketingDoneForYou from '@/views/MarketingDoneForYou.vue';
import { useLayoutStore } from '@/stores/layout'; // Add this import
import CreateSuccessPlan from '@/views/CreateSuccessPlan.vue';
import MyChecklist from '../views/marketing/MyChecklist.vue';
import DoneForYou from '../views/marketing/DoneForYou.vue';
import SocialPlatforms from '../views/marketing/SocialPlatforms.vue';

const routes = [
  {
    path: '/',
    name: 'AgentDashboardView',
    component: AgentDashBoardView
  },
  {
    path: '/',
    name: 'AgentProfile',
    component: AgentProfile
  },
  {
    path: '/view-listings',
    component: ViewListings,
    meta: { title: 'View Listings' },
  },
  {
    path: '/manage-listings',
    component: ManageListings,
    meta: { title: 'Manage Listings' },
  },
  {
    path: '/property/:id',
    component: PropertyDetail,
    meta: { title: 'Property Details' },
  },
  { path: '/add-listing', component: AddListing },
  { path: '/pending-approvals', component: PendingApprovals },
  { path: '/drafts', component: Drafts },

  {
    path: '/tasks',
    redirect: '/tasks/in-progress'
  },
  {
    path: '/tasks/in-progress',
    name: 'InProgressTasks',
    component: InProgressTasks,
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
    component: DraftTasks,
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
    component: CompletedTasks,
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
    component: TaskCreate,
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
    component: TaskDetail,
    meta: {
      requiresAuth: true,
      allowedRoles: ['agent', 'admin'],
      hideSidebar: true,
      hideHeader: true,
      background: '#FFFFFF'
    }
  },
  {
    path: '/completed-tasks/:id',
    name: 'CompletedTaskDetail',
    component: CompletedTaskDetail,
    meta: {
      requiresAuth: true,
      allowedRoles: ['agent', 'admin'],
      hideSidebar: false,
      hideHeader: true,
      background: '#FFFFFF'
    }
  },

    // Marketing links.
  {
    path: '/marketing-tools',
    component: MarketingTools,
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
        component: CreateSuccessPlan
      },
      {
        path: 'plan/:id',
        component: MarketingPlanDetail
      },
      {
        path: 'checklist',
        component: MyChecklist
      },
      {
        path: 'done-for-you',
        component: DoneForYou
      },
      {
        path: 'social-platforms',
        component: SocialPlatforms
      }
    ]
  },
  {
    path: '/marketing-tools/my-checklist',
    name: 'MarketingChecklist',
    component: MarketingChecklist,
    meta: {
      requiresAuth: true,
      allowedRoles: ['agent', 'admin'],
      hideSidebar: false,
      hideHeader: false,
      background: '#F9FAFB'
    }
  },
  {
    path: '/marketing-tools/done-for-you',
    name: 'MarketingDoneForYou',
    component: MarketingDoneForYou,
    meta: {
      requiresAuth: true,
      allowedRoles: ['agent', 'admin'],
      hideSidebar: false,
      hideHeader: false,
      background: '#F9FAFB'
    }
  },
  {
    path: '/marketing-tools/:section',
    name: 'MarketingToolsSection',
    component: MarketingTools,
    meta: {
      requiresAuth: true,
      allowedRoles: ['agent', 'admin'],
      hideSidebar: false,
      hideHeader: false,
      background: '#F9FAFB'
    }
  },
  {
    path: '/marketing-tools/plan/:id',
    name: 'MarketingPlanDetail',
    component: MarketingPlanDetail,
    meta: {
      requiresAuth: true,
      allowedRoles: ['agent', 'admin'],
      hideSidebar: false,
      hideHeader: false,
      background: '#F9FAFB'
    }
  },
  {
    path: '/marketing-tools/checklist',
    component: MyChecklist
  },
  {
    path: '/marketing-tools/checklist/create',
    component: () => import('@/views/marketing/ChecklistCreate.vue')
  },
  {
    path: '/marketing-tools/checklist/:id',
    component: () => import('@/views/marketing/ChecklistDetail.vue')
  },
  {
    path: '/marketing-tools/checklist/:id/edit',
    component: () => import('@/views/marketing/ChecklistEdit.vue')
  }
];

const router = createRouter({
  history: createWebHistory('/RCR/'),
  routes,
});

// Navigation guard for role-based access control and layout
router.beforeEach(async (to, from, next) => {
  // Set layout properties first (applies to all routes)
  const layoutStore = useLayoutStore();
  layoutStore.setLayout({
    hideSidebar: to.meta.hideSidebar || false,
    hideHeader: to.meta.hideHeader || false,
    background: to.meta.background || '#F4F4F4' // Default background
  });

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

  // Apply the route's meta settings
  layoutStore.setLayout({
    hideSidebar: to.meta.hideSidebar || false,
    hideHeader: to.meta.hideHeader || false,
    background: to.meta.background || '#F4F4F4'
  });
});

export default router;
