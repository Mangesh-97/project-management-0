import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat'  //(4)
import { AngularFireAuthModule } from '@angular/fire/compat/auth' //(4)

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectManagementModule } from './shared/project-management/project-management.module';
import { MaterialModule } from './shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './shared/components/auth/auth.component';
import { environment } from 'src/environments/environment';
import { IntercepterService } from './shared/services/intercepter.service';
import { NgChartsModule } from 'ng2-charts';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ProjectManagementModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),//(5)
    AngularFireAuthModule,//(6),
    FormsModule,
    NgChartsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IntercepterService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// npm i firebase  on firebase website (1)
// config save in environment (2)
// ng add @angular/fire  (3)



// Installation (chartjs)
// 1) Install ng2-charts using npm
// npm install --save ng2-charts

// Install Chart.js library
// 2) npm install --save chart.js

// API
// Usage
// 3)In order to use ng2-charts you need to import NgChartsModule:

// import { NgChartsModule } from 'ng2-charts';

// // In your App's module:
// imports: [
//   NgChartsModule
// ]