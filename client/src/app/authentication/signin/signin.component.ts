import { AuthService } from 'src/app/core/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers:[ToastrService]
})
export class SigninComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  error = '';
  hide = true;
  loginFailed!: boolean;

  token!: string;
   isAuthenticated = false;
   userID!: string
   name!: string
   user!: User;
   image!: string
  role!:string
  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr:ToastrService
  ) {}
  ngOnInit() {

    this.loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email, Validators.minLength(5)]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
  });
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.error = '';

    if (this.loginForm.invalid) {
      this.error = 'Username or Password is invalid !';
      return;
    } else{
        this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((response) => {
            this.token = response.token;
              if (this.token) {
                this.isAuthenticated = true;
                this.userID = response.id;
                this.name = response.name
                this.image = response.image
                this.role = response.role
                this.authService.saveAuthData(this.token,this.name, this.image,this.userID,this.role)
                this.toastr.success("Login success", "Success");
                this.router.navigate(['dashboard/main']);
            }
            },
            (error)=>{
              this.isAuthenticated=false
              this.toastr.error( error,"something went wrong!");
            }
            )
      }
   } 
  
  }

