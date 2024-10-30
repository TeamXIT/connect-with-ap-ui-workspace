import { Routes } from '@angular/router'

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./admin.component').then(c => c.AdminComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'analytics' },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./analytics/analytics.component').then(
            c => c.AnalyticsComponent
          ),
      },
      {
        path: 'posts',
        loadComponent: () =>
          import('./posts/posts.component').then(c => c.PostsComponent),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./users/users.component').then(c => c.UsersComponent),
      },
      { path: '**', redirectTo: 'analytics' },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
]
