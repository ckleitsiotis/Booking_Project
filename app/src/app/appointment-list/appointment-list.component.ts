import { Appointment } from './../Appointment';
import { AppointmentsService } from './../appointments.service';
import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  public loading = true;
  public errorMsg: string;
  public successMsg: string;
  public appointments: Appointment[];
  public columns: string[] = ['appointmentFromDate', 'appointmentToDate', 'name', 'room', 'cancel'];


  constructor(private appointmentService: AppointmentsService) { }

  ngOnInit(): void {
    this.appointmentService.getAppointments()
      .subscribe((appointments: Appointment[]) => {      
        this.appointments = appointments;
        this.loading = false;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
        this.loading = false;
      });
  }


  cancelAppointment(id: string){
    this.appointmentService.cancelAppointment(id)
      .pipe(
        mergeMap(() => this.appointmentService.getAppointments())
      )
      .subscribe((appointments: Appointment[]) =>{
        this.appointments = appointments;
        this.successMsg = 'Your Booking was successfully cancelled'
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      });
  }

}
