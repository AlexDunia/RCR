import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import ManageListings from '@/views/ManageListings.vue'
import PropertyDetail from '@/views/PropertyDetail.vue'

const routes = [
  {
    path: '/',
    component: DashboardView,
    meta: { title: 'Dashboard' },
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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
