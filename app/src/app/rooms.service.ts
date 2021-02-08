import { environment } from './../environments/environment.prod';
import { Rooms } from './Rooms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private BASE_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getRooms(): Observable<Rooms[]>{
    return this.http.get<Rooms[]>(`${this.BASE_URL}/rooms`);
  }


  createRoom(room: string): Observable<Rooms>{
    return this.http.post<Rooms>(`${this.BASE_URL}/rooms`, { room });
  }


}
