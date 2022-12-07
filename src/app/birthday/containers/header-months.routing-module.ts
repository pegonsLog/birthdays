import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from '../components/birthday-form/form.component';
import { BirthdayResolver } from './guards/birthday.resolver';
import { HeaderMonthsComponent } from './header-months/header-months.component';

const routes: Routes = [
  {
    path: 'headermonths',
    component: HeaderMonthsComponent,
  },
  {
    path: 'components',
    loadChildren: () =>
      import('src/app/birthday/components/components.module').then(
        (m) => m.ComponentsModule
      ),
  },
  {
    path: 'new',
    component: FormComponent, resolve: {birthday: BirthdayResolver}
  },
  {
    path: 'edit/:id',
    component: FormComponent, resolve: {birthday: BirthdayResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeaderMonthRoutingModule {}