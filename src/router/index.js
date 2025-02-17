import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import ViewListings from '@/views/Viewlistings.vue'
import ManageListings from '@/views/ManageListings.vue'
import PropertyDetail from '@/views/PropertyDetail.vue'
import PendingApprovals from "@/views/PendingApprovals.vue";
import Drafts from "@/views/Drafts.vue";
import AddListing from "@/views/AddListing.vue";


const routes = [
  {
    path: '/',
    component: DashboardView,
    meta: { title: 'Dashboard' },
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
  history: createWebHistory(),
  routes,
})

export default router
