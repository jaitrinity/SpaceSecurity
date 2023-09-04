import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptorServiceService } from './services/token-interceptor-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonPageComponent } from './layout/common-page/common-page.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { EmployeeComponent } from './layout/employee/employee.component';
import { LocationComponent } from './layout/location/location.component';
import { NbsLocationComponent } from './layout/nbs-location/nbs-location.component';
import { ReportsComponent } from './layout/reports/reports.component';
import { RaiseSrComponent } from './layout/raise-sr/raise-sr.component';
import { RaisePtwComponent } from './layout/raise-ptw/raise-ptw.component';
import { CreateSupervisorComponent } from './layout/create-supervisor/create-supervisor.component';
import { CreateVendorComponent } from './layout/create-vendor/create-vendor.component';
import { CreatePtwRaiserComponent } from './layout/create-ptw-raiser/create-ptw-raiser.component';
import { MapViewComponent } from './layout/map-view/map-view.component';
import { WorkInProgressComponent } from './layout/work-in-progress/work-in-progress.component';
import { OnlyNumber } from './validations/OnlyNumber';
import { OnlyAlphabets } from './validations/OnlyAlphabets';
import { LengthValidater } from './validations/LengthValidater';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatRippleModule} from '@angular/material/core';
import {MatSliderModule} from '@angular/material/slider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NotificationComponent } from './layout/notification/notification.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    CommonPageComponent,
    DashboardComponent,
    EmployeeComponent,
    LocationComponent,
    NbsLocationComponent,
    ReportsComponent,
    RaiseSrComponent,
    RaisePtwComponent,
    CreateSupervisorComponent,
    CreateVendorComponent,
    CreatePtwRaiserComponent,
    MapViewComponent,
    WorkInProgressComponent,
    OnlyNumber,
    OnlyAlphabets,
    LengthValidater,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatRippleModule,
    MatSliderModule,
    MatProgressBarModule,
    MatDialogModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatTabsModule,
    MatMenuModule,
    ToastrModule.forRoot(),
    MatSnackBarModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptorServiceService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
