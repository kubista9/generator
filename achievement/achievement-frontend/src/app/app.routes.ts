import { AchievementDetailsComponent } from './components/achievement/achievement-details/achievement-details.component';
import { CreateAchievementComponent } from './components/achievement/create-achievement/create-achievement.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { ManagerComponent } from './pages/manager/manager.component';
import { MainLayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        canActivate: [MsalGuard],
      },
      {
        path: 'manager',
        component: ManagerComponent,
        pathMatch: 'full',
        canActivate: [MsalGuard],
      },
      {
        path: 'employee',
        component: EmployeeComponent,
        pathMatch: 'full',
        canActivate: [MsalGuard],
      },
      {
        path: 'achievements/create',
        component: CreateAchievementComponent,
        canActivate: [MsalGuard],
      },
      {
        path: 'achievements/:id',
        component: AchievementDetailsComponent,
        canActivate: [MsalGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
