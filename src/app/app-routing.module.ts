import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectFormComponent } from './shared/project-management/project-form/project-form.component';
import { ProjectDashComponent } from './shared/project-management/project-dash/project-dash.component';
import { ProjectTableComponent } from './shared/project-management/project-table/project-table.component';
import { AuthComponent } from './shared/components/auth/auth.component';
import { AuthGuard } from './shared/services/auth.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: ProjectDashComponent,
    data: {
      title: 'Project Dashboard'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'project-table',
    component: ProjectTableComponent,
    data: {
      title: 'Project Listing'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'project-form',
    component: ProjectFormComponent,
    data: {
      title: 'Create Project'
    },
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AuthComponent,
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
    data: {
      error: 'Oops...Page Not Found...404'
    }
  },
  {
    path: '**',
    redirectTo: 'page-not-found',

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
