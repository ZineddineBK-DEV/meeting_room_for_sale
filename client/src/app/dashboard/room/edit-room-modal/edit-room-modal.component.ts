import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Room } from 'src/app/core/models/room';
import { RoomServiceService } from 'src/app/core/service/room-service.service';
import { UserServiceService } from 'src/app/core/service/user-service.service';

@Component({
  selector: 'app-edit-room-modal',
  templateUrl: './edit-room-modal.component.html',
  styleUrls: ['./edit-room-modal.component.scss'],
  providers: [ToastrService],

})
export class EditRoomModalComponent {
  @Input('payload') payload!:Room
  roomEdittForm!: FormGroup
  files: File[] = [];

  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private roomService:RoomServiceService,
    private userService:UserServiceService,
    private toastr: ToastrService) {}
  
    ngOnInit(){
      this.roomEdittForm = new FormGroup({
        label:new FormControl(this.payload.label,[Validators.required]),
        capacity:new FormControl(this.payload.capacity,[Validators.required]),
    });
    }
  
    onSubmit(){
      const formData = new FormData()
      formData.append('label',this.roomEdittForm.value.label)
      formData.append('capacity',this.roomEdittForm.value.capacity)
      formData.append('image',this.files[0])
      console.log(formData)
          this.roomService.editRoom(this.payload._id,formData).subscribe(resultat=>{
          this.toastr.success('Vehicle updated successfuly!', 'Success');
          this.activeModal.close('Close click');
        })
      
    }

    onSelect(event:any) {
      this.files.push(...event.addedFiles);
    }
    
    onRemove(event:any) {
      this.files.splice(this.files.indexOf(event), 1);
    }
}
