import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RoomServiceService } from 'src/app/core/service/room-service.service';
import { UserServiceService } from 'src/app/core/service/user-service.service';

@Component({
  selector: 'app-add-room-modal',
  templateUrl: './add-room-modal.component.html',
  styleUrls: ['./add-room-modal.component.scss'],
  providers: [ToastrService],

})
export class AddRoomModalComponent {
  roomAddForm!: FormGroup
  error =""
  files: File[] = [];

  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private roomService:RoomServiceService,
    private userService:UserServiceService,
    private toastr: ToastrService) {}
  
    ngOnInit(){
      this.roomAddForm = new FormGroup({
       label:new FormControl('',[Validators.required]),
       capacity:new FormControl('',[Validators.required]),
    });
    }

    onSubmit(){
      const formData = new FormData()
      formData.append('label',this.roomAddForm.value.label)
      formData.append('capacity',this.roomAddForm.value.capacity)
      formData.append('image',this.files[0])

      if (this.roomAddForm.invalid) {
        this.error = 'Invalid data !';
        this.toastr.error(this.error, 'Error');
        return;
        }else {
          return this.roomService.addRoom(formData).subscribe(resultat=>{  
          this.toastr.success('Room added successfuly!', 'Success');
          this.activeModal.close('Close click');

        })
      }
    }


    onSelect(event:any) {
      console.log(event);
      this.files.push(...event.addedFiles);
    }
    
    onRemove(event:any) {
      console.log(event);
      this.files.splice(this.files.indexOf(event), 1);
    }
}
