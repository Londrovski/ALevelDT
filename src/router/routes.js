const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: 'full-project-3d-view', component: () => import('pages/FullProject3D.vue') },
      { path: 'control-system-3d-view', component: () => import('pages/ControlSystem3D.vue') },
      { path: 'power-system-3d-view', component: () => import('pages/PowerSystem3D.vue') },
      { path: 'passive-system-3d-view', component: () => import('pages/PassiveSystem3D.vue') },
      { path: 'attachments-3d-view', component: () => import('pages/Attachments3D.vue') },
      { path: 'flipbooks', component: () => import('pages/FlipbooksPage.vue') },
      { path: 'photos', component: () => import('pages/PhotosPage.vue') },
      { path: 'videos', component: () => import('pages/VideosPage.vue') }
    ]
  },
  { path: '/:catchAll(.*)*', component: () => import('pages/ErrorNotFound.vue') }
]
export default routes
