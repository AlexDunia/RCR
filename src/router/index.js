import { createRouter, createWebHistory } from 'vue-router'
import ViewListings from '@/views/ViewListings.vue'
import ManageListings from '@/views/agents/ManageListings.vue'
import PropertyDetail from '@/views/PropertyDetail.vue'
import PendingApprovals from "@/views/PendingApprovals.vue";
import Drafts from "@/views/Drafts.vue";
import AddListing from "@/views/agents/AddListing.vue";
import AgentDashBoardView from '@/views/agents/AgentDashBoardView.vue';
import AgentProfile from '@/views/agents/AgentProfile.vue';
import AgentChatView from "@/views/agents/AgentChatView.vue";
import ClientChatView from "../views/ClientChatView.vue";
import AdminChatView from "../views/AdminChatView.vue";

// Hello alex, check here
// Are you there, cursor?
const routes = [
  {
    path: '/',
    name: 'AgentDashboardView',
    component: AgentDashBoardView
  },
  { path: "/admin", component: AdminChatView },
  { path: "/client", component: ClientChatView },
  { path: "/agent", component: AgentChatView },
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
]

const router = createRouter({
  history: createWebHistory('/RCR/'),
  routes,
})

export default router
