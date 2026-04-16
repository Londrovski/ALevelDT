const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: 'about', component: () => import('pages/AboutPage.vue') },
      { path: 'projects', component: () => import('pages/ProjectsPage.vue') },
      { path: 'sketchbooks', component: () => import('pages/SketchbooksPage.vue') },
      { path: 'models', component: () => import('pages/ModelsPage.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
