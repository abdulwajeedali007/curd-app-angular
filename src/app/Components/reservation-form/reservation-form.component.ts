import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReservationService } from '../../Services/reservation.service';
import { Reservation } from '../../Models/reservation';

@Component({
  selector: 'app-reservation-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.scss',
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});

  private router = inject(Router);
  private formBuild = inject(FormBuilder);
  private reservationService = inject(ReservationService);
  private activedRoute = inject(ActivatedRoute);

  constructor() {}

  ngOnInit(): void {
    this.reservationForm = this.formBuild.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    });

    let id = this.activedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.reservationService.getReservation(id).subscribe((reservation) => {
        if (reservation) {
          this.reservationForm.patchValue(reservation);
        }
      });
    }
  }
  onSubmit(reservation: Reservation) {
    if (this.reservationForm.valid) {
      let id = this.activedRoute.snapshot.paramMap.get('id');

      if (id) {
        // update
        this.reservationService
          .updateReservation(id, reservation)
          .subscribe(() => console.log('updating request is in progress'));
      } else {
        this.reservationService
          .createReservation(reservation)
          .subscribe(() => console.log('creation request is in progress'));
      }
    }
    this.reservationForm.reset();
    this.router.navigateByUrl('/list');
  }

  formValidate(controlName: string) {
    return (
      this.reservationForm.get(controlName)?.invalid &&
      this.reservationForm.get(controlName)?.touched
    );
  }
}
