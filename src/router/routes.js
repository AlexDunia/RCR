{
  path: 'properties',
  name: 'client-properties',
  component: () => import('@/views/client/Properties.vue'),
},
{
  path: 'properties/:id/:agentId?',
  name: 'client-property-detail',
  component: () => import('@/views/client/PropertyDetailsView.vue'),
},
