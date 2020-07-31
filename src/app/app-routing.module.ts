import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IssuesComponent } from './issues/issues.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { IssueDetailComponent }  from './issue-detail/issue-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: IssueDetailComponent },
  { path: 'issues', component: IssuesComponent },
];

@NgModule({
  // Configure router at app's root level!
  imports: [RouterModule.forRoot(routes)],
  // Make RouterModule available everywhere in the app!
  exports: [RouterModule]
})
export class AppRoutingModule { }