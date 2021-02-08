import { Component, OnInit } from '@angular/core';
import { RoomsService } from './../rooms.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public successMsg: string;
  public errorMsg: string;
  room: string;
  

  constructor(private roomsService: RoomsService) { }

  ngOnInit(){
   
  }

  createRoom(){
    this.successMsg = '';
    this.errorMsg = '';
    this.roomsService.createRoom(this.room).subscribe(() => {
      this.room = '';
      this.successMsg = `Room added `;
      },
    (error: ErrorEvent) => {
      this.errorMsg = error.error.message;
    });
  }

  

}
