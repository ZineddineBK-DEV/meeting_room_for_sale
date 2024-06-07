import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { UserListComponent } from './user-list/user-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserDetailsComponent } from './user-list/user-details/user-details.component';
import { RoomComponent } from './room/room.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRoomModalComponent } from './room/add-room-modal/add-room-modal.component';
import { EditRoomModalComponent } from './room/edit-room-modal/edit-room-modal.component';
import { AddRoomEventModalComponent } from './room/add-room-event-modal/add-room-event-modal.component';
import { EventInfoRoomModalComponent } from './room/event-info-room-modal/event-info-room-modal.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { EditRoomEventComponent } from './room/edit-room-event/edit-room-event.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
@NgModule({
  declarations: [
    MainComponent, 
    UserListComponent, 
    UserDetailsComponent, 
    RoomComponent, 
    AddRoomModalComponent, 
    EditRoomModalComponent, 
    AddRoomEventModalComponent,
    EventInfoRoomModalComponent, 
    EditRoomEventComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    DashboardRoutingModule,
    NgxDatatableModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left'
    }),
    NgScrollbarModule,
    NgbProgressbarModule,
    FullCalendarModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDropzoneModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
})
export class DashboardModule {}
