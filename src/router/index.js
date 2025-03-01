import { createRouter, createWebHistory } from 'vue-router'
import ViewListings from '@/views/ViewListings.vue'
import ManageListings from '@/views/agents/ManageListings.vue'
import PropertyDetail from '@/views/PropertyDetail.vue'
import PendingApprovals from "@/views/PendingApprovals.vue";
import Drafts from "@/views/Drafts.vue";
import AddListing from "@/views/agents/AddListing.vue";
import AgentDashBoardView from '@/views/agents/AgentDashBoardView.vue';
import AgentProfile from '@/views/agents/AgentProfile.vue';
// Remove unused import
import InProgressTasks from '@/views/tasks/InProgressTasks.vue'
import DraftTasks from '@/views/tasks/DraftTasks.vue'
import CompletedTasks from '@/views/tasks/CompletedTasks.vue'
import TaskCreate from '@/components/task/TaskCreate.vue'
import TaskDetail from '@/components/task/TaskDetail.vue'

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
  { path: "/add-listing", component: AddListing },
  { path: "/pending-approvals", component: PendingApprovals },
  { path: "/drafts", component: Drafts },
  {
    path: '/tasks',
    redirect: '/tasks/in-progress'
  },
  {
    path: '/tasks/in-progress',
    name: 'InProgressTasks',
    component: InProgressTasks
  },
  {
    path: '/tasks/drafts',
    name: 'DraftTasks',
    component: DraftTasks
  },
  {
    path: '/tasks/completed',
    name: 'CompletedTasks',
    component: CompletedTasks
  },
  {
    path: '/tasks/create',
    name: 'TaskCreate',
    component: TaskCreate,
    meta: {
      requiresAuth: true,
      allowedRoles: ['agent', 'admin']
    }
  },
  {
    path: '/tasks/:id',
    name: 'TaskDetail',
    component: TaskDetail,
    meta: {
      requiresAuth: true,
      roles: ['agent', 'admin']
    }
  }
]

const router = createRouter({
  history: createWebHistory('/RCR/'),
  routes,
})

// Navigation guard for role-based access control
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    // In production, check authentication status here
    const isAuthenticated = true // Simulated auth check

    if (!isAuthenticated) {
      next('/login')
      return
    }

    // Check role access if route has allowedRoles
    if (to.meta.allowedRoles) {
      const { useRoleGuard } = await import('@/composables/useRoleGuard')
      const { checkAccess } = useRoleGuard()
      const hasAccess = await checkAccess(to.meta.allowedRoles)

      if (!hasAccess) {
        next('/unauthorized')
        return
      }
    }
  }

  next()
})

export default router
