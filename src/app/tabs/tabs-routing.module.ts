import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'slips',
        loadChildren: () =>
          import('../slips/slips.module').then((m) => m.SlipsPageModule),
      },
      {
        path: 'meter',
        loadChildren: () =>
          import('../meter/meter.module').then((m) => m.MeterPageModule),
      },
      {
        path: 'transaction',
        loadChildren: () =>
          import('../transaction/transaction.module').then(
            (m) => m.TransactionPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/slips',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/slips',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
