import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { Room } from '../models/room';
import { FormGroup } from '@angular/forms';
import { RoomEvent } from '../models/roomEvent';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomServiceService {
  readonly baseUrl = environment.apiUrl;
  private api = `${this.baseUrl}room/tablette`;
  private apiEvent = `${this.baseUrl}event`;

  constructor(private http: HttpClient, private router: Router) { }

  getRooms(): Observable<any> {
    return this.http.get(this.api + "/getAllRooms").pipe(
      catchError(throwError)
    );
  }
  addRoom(room: FormData): Observable<any> {
    return this.http.post(this.api, room).pipe(
      catchError(throwError)
    );
  }
  deleteRoom(id: string): Observable<any> {
    return this.http.delete(this.api + "/delete/" + id).pipe(
      catchError(throwError)
    );
  }
  editRoom(id: string,form: FormData): Observable<any> {
    return this.http.put(this.api + "/editRoom/" + id,form).pipe(
      catchError(throwError)
    );
  }
  addEvent(roomEvent: RoomEvent): Observable<any> {
    return this.http.post(this.apiEvent + "/setevent", roomEvent).pipe(
      catchError(throwError)
    );
  }
  getRoomEvents(roomID:string): Observable<any>  {
    return this.http.get(this.api + "/getRoomEvents/"+roomID).pipe(
      catchError(throwError)
    );
  }
  getAllEvents(): Observable<any>  {
    return this.http.get(this.api + "getAllEvents/").pipe(
      catchError(throwError)
    );
  }
  getEventById(eventID:string): Observable<any>  {
    return this.http.get(this.apiEvent + "/getEventById/"+eventID).pipe(
      catchError(throwError)
    );
  }
  updateEvent(eventID:string,event:any): Observable<any>  {
    return this.http.put(this.apiEvent + "/updateEvent/"+eventID,event).pipe(
      catchError(throwError)
    );
  }
  deleteEvent(eventID:string): Observable<any>  {
    return this.http.delete(this.apiEvent + "/deleteEvent/"+eventID).pipe(
      catchError(throwError)
    );
  }
}
