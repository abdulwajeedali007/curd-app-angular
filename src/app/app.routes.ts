import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { pagenotFound } from './Components/pagenotFound';
import { ReservationComponent } from './Components/reservation/reservation.component';
import { ReservationFormComponent } from './Components/reservation-form/reservation-form.component';
import { ReservationListComponent } from './Components/reservation-list/reservation-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list', component: ReservationListComponent },
  { path: 'new', component: ReservationFormComponent },
  { path: 'edit/:id', component: ReservationFormComponent },
  { path: '**', component: pagenotFound },
];
