import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, of } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  providers: [ToastrService],

})
export class AddUserComponent {
 registerForm!: FormGroup;
  submitted = false;
  files: File[] = [];


  error = '';
  constructor(private formBuilder: FormBuilder , 
            public activeModal: NgbActiveModal,
                private authService : AuthService,
                private router :Router,
                private toastr: ToastrService) {}
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['',[Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['',[Validators.required, Validators.minLength(8)]],
      termcondition: [false],

    });
  }
  matchValues(matchTo: string): AsyncValidatorFn  {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      const input = control.value;
      const isValid = control.root.value[matchTo] === input;
      return of(isValid ? null : { 'matchValues': true }).pipe(
        map((result) => {
          // Simulate some asynchronous processing
          // You can replace the setTimeout with your actual asynchronous operation
          return result;
        })
      );
    };
  }
  get f() {
    return this.registerForm.controls;
  }
  showForm(){
    console.log(this.registerForm)
  }
  onSubmit() {
    this.submitted = true;
    this.error = '';
    if (this.registerForm.invalid) {
      this.error = 'Invalid data !';
      this.submitted= false;
      this.toastr.error(this.error, 'Error');
      return;
    } else {
      const formdata = new FormData()
      formdata.append('name',this.registerForm.value.name)
      formdata.append('email',this.registerForm.value.email)
      formdata.append('password',this.registerForm.value.password)
      formdata.append('image',this.files[0])
      this.authService.signup(formdata).subscribe((res:any)=>{
        this.toastr.success(res.message, 'Success');
        this.activeModal.close("Account created");
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
