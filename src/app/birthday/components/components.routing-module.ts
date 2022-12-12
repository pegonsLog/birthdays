import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BirthdayPrintComponent } from './birthday-print/birthday-print.component';
import { ListComponent } from './birthdays-list/birthday-list.component';

const routes: Routes = [
  {
    path: 'list', component: ListComponent
  },
  {
    path: 'forms',
    loadChildren: () =>
      import(
        'src/app/birthday/components/birthday-form/birthday-form.module'
      ).then((m) => m.BirthdayFormModule),
  },
  {
    path: 'print/:month',
    component: BirthdayPrintComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}
