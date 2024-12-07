import { inject, Injectable } from '@angular/core';
import { Reservation } from '../Models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  // private reservations: Reservation[] = [];
  apiURL: string = 'http://localhost:3000/';
  private http: HttpClient = inject(HttpClient);

  // GET ALL
  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiURL + 'reservations');
  }
  // GET INDIVIDUAL
  getReservation(id: string): Observable<Reservation> {
    // return this.reservations.find((reservation) => reservation.id === id);
    return this.http.get<Reservation>(this.apiURL + 'reservations/' + id);
  }
  // CREATE
  createReservation(reservation: Reservation): Observable<void> {
    reservation.id = crypto.randomUUID();
    // this.reservations.push(reservation);
    return this.http.post<void>(this.apiURL + 'reservations', reservation);
  }
  // DELETE
  deleteReservation(id: string): Observable<void> {
    // let index = this.reservations.findIndex(
    //   (reservation) => reservation.id === id
    // );
    // this.reservations.splice(index, 1);
    return this.http.delete<void>(this.apiURL + 'reservations/' + id);
  }
  // UPDATE
  updateReservation(
    id: string,
    updateReservation: Reservation
  ): Observable<void> {
    // let index = this.reservations.findIndex(
    //   (reservation) => reservation.id === id
    // );
    let reservation = { ...updateReservation, id };
    return this.http.put<void>(this.apiURL + 'reservations/' + id, reservation);
    // this.reservations[index] = { ...updateReservation, id };
  }
}
