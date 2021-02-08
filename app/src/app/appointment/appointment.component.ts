import { Rooms } from './../Rooms';
import { Component, OnInit } from '@angular/core';
import { Appointment } from '../Appointment';
import { AppointmentsService } from '../appointments.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  public successMsg: string;
  public errorMsg: string;
  appointmentFromDate: string;
  appointmentToDate: string;
  name: string;
  room: string;
  public roomList: Rooms[];
  selectedRoom: string;

  constructor(private appointmentService: AppointmentsService) { }

  ngOnInit() {
    this.appointmentService.dropDownMenu().subscribe((rooms: Rooms[]) => {      
      this.roomList = rooms;
    },
  (error: ErrorEvent) => {
    this.errorMsg = error.error.message;
  });
  }

  createAppointment() {
    this.successMsg = '';
    this.errorMsg = '';
    this.appointmentService.createAppointment(this.appointmentFromDate, this.appointmentToDate, this.name, this.selectedRoom).subscribe((createdAppointment: Appointment) => {
        this.appointmentFromDate = '';
        this.appointmentToDate = '';
        this.name = '';
        this.selectedRoom = '';
        
        const appointmentFromDate = new Date(createdAppointment.appointmentFromDate).toDateString();
        const appointmentToDate = new Date(createdAppointment.appointmentToDate).toDateString();
        this.successMsg = `Booking made Successfully from ${appointmentFromDate}${" to "}${appointmentToDate}`;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      });
  }

  
}