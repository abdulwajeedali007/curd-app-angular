import { Component, inject, OnInit } from '@angular/core';
import { Reservation } from '../../Models/reservation';
import { ReservationService } from '../../Services/reservation.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  imports: [RouterLink],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.scss',
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];

  private reservationsService = inject(ReservationService);
  // private router = inject(Router);

  ngOnInit(): void {
    this.reservationsService.getReservations().subscribe((reservationData) => {
      this.reservations = reservationData;
      console.log(reservationData);
    });
  }

  handleDeleteReservation(id: string) {
    this.reservationsService.deleteReservation(id).subscribe(() => {
      this.reservations = this.reservations.filter(
        (reservation) => reservation.id !== id
      );
      console.log('Deleting request is in progress');
    });
  }
  // handleEditService(reservation: Reservation) {
  //   this.router.navigate(['/new', ''])
  //   this.reservationsService.updateReservation(reservation);
  // }
}
