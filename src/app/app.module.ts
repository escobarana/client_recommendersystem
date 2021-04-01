import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule }    from '@angular/common/http';
import { AppBoxComponent } from './components/list-apps/app-box/app-box.component';
import { ListAppsComponent } from './components/list-apps/list-apps.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './components/home/home.component';
import { ExplorePageComponent } from './components/explore-page/explore-page.component';
import { LoginComponent } from './components/home/login/login.component';
import { RegisterComponent } from './components/home/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StoresService } from './services/stores.service';
import { ReviewPageComponent } from './components/review-page/review-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppDetailsComponent } from './components/list-apps/app-box/app-details/app-details.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { VerifyEmailPageComponent } from './components/home/verify-email-page/verify-email-page.component';
import { AdminUsersPageComponent } from './components/admin-users-page/admin-users-page.component';
import { AsignPageComponent } from './components/explore-page/asign-page/asign-page.component';
import { FinalPageComponent } from './components/final-page/final-page.component';
import { AppReviewersComponent } from './components/list-apps/app-box/app-reviewers/app-reviewers.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { ToastrModule } from 'ngx-toastr';
import { AdminPatientFormComponent } from './components/admin-patient-form/admin-patient-form.component';
import { AfterSubmitComponent } from './components/after-submit/after-submit.component';
import { UserService } from './services/user.service';
import { AdminGuard } from './guards/admin.guard';
import { EmailGuard } from './guards/email.guard';
import { PatientService } from './services/patient.service';
import { PatientsListComponent } from './components/admin-patient-form/patients-list/patients-list';
import { AdminNewbiesComponent } from './components/admin-users-page/admin-newbies/admin-newbies.component';

@NgModule({
  declarations: [
    AppComponent,
    AppBoxComponent,
    ListAppsComponent,
    NavComponent,
    HomeComponent,
    ExplorePageComponent,
    LoginComponent,
    RegisterComponent,
    ReviewPageComponent,
    AppDetailsComponent,
    VerifyEmailPageComponent,
    AdminUsersPageComponent,
    AsignPageComponent,
    FinalPageComponent,
    AppReviewersComponent,
    PatientFormComponent,
    AdminPatientFormComponent,
    AfterSubmitComponent,
    PatientsListComponent,
    AdminNewbiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
    MatSliderModule,
    MatRadioModule,
    MatPaginatorModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ToastrModule.forRoot(),
    /*RouterModule.forRoot([
      {
        path:'',
        component: HomeComponent
      },
      {
        path: 'patient',
        component: PatientFormComponent
      }
    ])*/
  ],
  providers: [StoresService,
              UserService,
              PatientService,
              AdminGuard,
              EmailGuard],
  bootstrap: [AppComponent],
  entryComponents: [AppDetailsComponent]
})
export class AppModule { }
