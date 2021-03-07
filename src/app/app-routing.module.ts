import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExplorePageComponent } from './components/explore-page/explore-page.component';
import { ReviewPageComponent } from './components/review-page/review-page.component';
import { AdminUsersPageComponent } from './components/admin-users-page/admin-users-page.component';
import { FinalPageComponent } from './components/final-page/final-page.component';
import { EmailGuard } from './guards/email.guard';
import { AdminGuard } from './guards/admin.guard';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { AdminPatientFormComponent } from './components/admin-patient-form/admin-patient-form.component';
import { AfterSubmitComponent } from './components/after-submit/after-submit.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path:  '', redirectTo:  '/home', pathMatch:  'full'},
  { path:  'assign', component:ExplorePageComponent, canActivate:[EmailGuard] },
  { path:  'reviewapps', component:ReviewPageComponent, canActivate:[EmailGuard]  },
  { path:  'finalapps', component:FinalPageComponent, canActivate:[EmailGuard] },
  { path:  'manageusers', component:AdminUsersPageComponent, canActivate:[EmailGuard, AdminGuard] },
  { path:  'managepatients', component:AdminPatientFormComponent, canActivate:[EmailGuard, AdminGuard] },
  { path:  'patient', component:PatientFormComponent }  ,
  { path: 'success', component:AfterSubmitComponent },
  { path: '**', component:HomeComponent } // Cuando la ruta falle o la página no cargue. Siempre de última
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
