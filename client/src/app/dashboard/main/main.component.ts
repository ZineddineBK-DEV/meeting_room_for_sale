import { Component, OnInit } from '@angular/core';
import { RoomServiceService } from 'src/app/core/service/room-service.service';
import { UserServiceService } from 'src/app/core/service/user-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Room } from 'src/app/core/models/room';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  readonly roomPic = environment.ROOM_PICS_URL;
  users: any[] = [];
  user!: any
  userRoles: string = ''
  userCount!: number
  vehicleCount!: number
  roomCount!: number
  postCount!: number
  rooms!:Room[]

  constructor(
    private userService: UserServiceService,
    private roomService: RoomServiceService,
    private modalService: NgbModal,
  ) {
    this.userCount = 0
    this.roomCount = 0
  }

  ngOnInit() {
    this.roomService.getRooms().subscribe(res=>{
      this.roomCount = res.data.length
      this.rooms = res.data
    })
    this.userService.getEmployees().subscribe(res=>{
      this.userCount = res.data.length
    })
  }


  
}
