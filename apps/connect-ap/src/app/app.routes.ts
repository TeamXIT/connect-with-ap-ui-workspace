import { Route } from '@angular/router'
import { authGuard } from './guards/auth.guard'

const accountRoutes = () =>
  import('./admin/account/account.routes').then(c => c.routes)

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'account' },
  { path: 'account', loadChildren: accountRoutes },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(r => r.routes),
    canActivate:[authGuard]
  },
]
