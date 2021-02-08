import { Rooms } from './Rooms';
import { environment } from './../environments/environment.prod';
import { Appointment } from './Appointment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  private BASE_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.BASE_URL}/appointments`);
  }

  dropDownMenu(): Observable<Rooms[]>{
    return this.http.get<Rooms[]>(`${this.BASE_URL}/rooms`);
  }

  createAppointment(appointmentFromDate: string, appointmentToDate: string, name: string, room: string): Observable<Appointment>{
    return this.http.post<Appointment>(`${this.BASE_URL}/appointments`, { appointmentFromDate, appointmentToDate, name, room });
  }

  cancelAppointment(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/appointments/${id}`);
  }

}
