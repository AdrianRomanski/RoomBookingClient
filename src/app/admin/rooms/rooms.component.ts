import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {Room} from "../../model/Room";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Array<Room>;
  selectedRoom: Room;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.dataService.getRooms().subscribe(
      (next) => {
        this.rooms = next;
      }
    );

    this.route.snapshot.queryParams['id'];
    this.route.queryParams.subscribe(
      (params) => {
        const id = params['id'];
        if(id) {
          this.selectedRoom = this.rooms.find(room => room.id === +id); // casting to a number
        }
      }
    );
  }

  setRoom(id: number): void {
    this.router.navigate(['admin', 'rooms'], {queryParams : {id}});
  }

}
