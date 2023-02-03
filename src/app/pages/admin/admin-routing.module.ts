import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: AdminPage,
    children: [
      {
        path: 'list',
        loadChildren: () => import('./list/list-event.module').then( m => m.ListEventPageModule)
      },
      {
        path: 'add',
        loadChildren: () => import('./add/add-event.module').then( m => m.AddEventPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: '/admin/tabs/list',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
