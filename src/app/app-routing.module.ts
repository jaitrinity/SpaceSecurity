import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonPageComponent } from './layout/common-page/common-page.component';
import { CreatePtwRaiserComponent } from './layout/create-ptw-raiser/create-ptw-raiser.component';
import { CreateSupervisorComponent } from './layout/create-supervisor/create-supervisor.component';
import { CreateVendorComponent } from './layout/create-vendor/create-vendor.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { EmployeeComponent } from './layout/employee/employee.component';
import { LayoutComponent } from './layout/layout.component';
import { LocationComponent } from './layout/location/location.component';
import { MapViewComponent } from './layout/map-view/map-view.component';
import { NbsLocationComponent } from './layout/nbs-location/nbs-location.component';
import { RaisePtwComponent } from './layout/raise-ptw/raise-ptw.component';
import { RaiseSrComponent } from './layout/raise-sr/raise-sr.component';
import { ReportsComponent } from './layout/reports/reports.component';
import { WorkInProgressComponent } from './layout/work-in-progress/work-in-progress.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {path : '' ,  redirectTo: '/login', pathMatch: 'full'},
  {path : 'login', component :LoginComponent},
  {path : 'layout', component :LayoutComponent,  canActivate: [AuthGuard],
  children : [
    {path: '', redirectTo: 'm2', pathMatch: 'full'},
    { path: 'menu-submenu/:menuId', component: CommonPageComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'm2', component: EmployeeComponent },
    { path: 'm3', component: LocationComponent },
    { path: 'nbs', component: NbsLocationComponent },
    { path: 'm11', component: ReportsComponent },
    { path: 'm12', component: RaiseSrComponent },
    { path: 'm13', component: RaisePtwComponent },
    { path: 'create-supervisor', component: CreateSupervisorComponent },
    { path: 'create-vendor', component: CreateVendorComponent },
    { path: 'create-ptw-raiser', component: CreatePtwRaiserComponent },
    { path: 'alarm', component: MapViewComponent },
    { path: '**', component: WorkInProgressComponent }
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
