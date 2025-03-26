import { Component, HostListener, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent, SortType } from '@swimlane/ngx-datatable';
import { User } from 'src/app/core/models/user';
import { UserServiceService } from 'src/app/core/service/user-service.service';
import Swal from 'sweetalert2';
import { UserDetailsComponent } from './user-details/user-details.component';
import { of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router, RouterLink } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [ToastrService],

})
export class UserListComponent {
  readonly PICS_URL = environment.PICS_URL;

  rows: User[] = [];
  temp: User[] = [];
  loadingIndicator! :boolean
  reorderable = true;
  SortType = SortType;
  scrollBarHorizontal = window.innerWidth < 1200;
  users!: User[];
  employeesCount!:number
  user!:User;
  userRole:string=""
  @ViewChild('table') table!: DatatableComponent;

  constructor(public userService:UserServiceService,private modalService: NgbModal,private router : Router,private toastr: ToastrService) {}

  ngOnInit(): void {  
    this.userRole = localStorage.getItem("roles")!
    this.loadingIndicator = true
    this.getUsers()
   
  }
  getUsers(){
    this.userService.getEmployees().subscribe(resultat=>{
      this.rows = resultat.data as User[];
      console.log(this.rows)
      // this.rows = this.rows.filter(row => row._id !== localStorage.getItem('userId'));
      this.temp = resultat;
      this.employeesCount = this.rows.length;
      this.loadingIndicator = false
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.scrollBarHorizontal = window.innerWidth < 1200;
    this.table.recalculate();
    this.table.recalculateColumns();
  }

  getRowHeight(row: any) {
    return row.height;
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d: any) {
      return d.firstName.toLowerCase().indexOf(val) !== -1 || 
             d.lastName.toLowerCase().indexOf(val) !== -1 || 
             d.email.toLowerCase().indexOf(val) !== -1 || 
             d.departement.toLowerCase().indexOf(val) !== -1 || 
             d.isEnabled.toLowerCase()===val || 
             !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  
  showUserDetailsModal(user:User){
    const modalRef: NgbModalRef = this.modalService.open(UserDetailsComponent, {
      keyboard: false ,
      backdropClass:'light-blue-backdrop'
    });
    modalRef.componentInstance.payload=user
    modalRef.componentInstance.title="User details"
    this.user=user
  }
  addUser(){
    const modalRef: NgbModalRef = this.modalService.open(AddUserComponent, {
      keyboard: false ,
      backdropClass:'light-blue-backdrop'
    });
    modalRef.result.then((res)=>{
      this.getUsers()
    })
  }
  deleteUser(id:any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: false,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({title:'Deleted!',text: 'Offer has been deleted.',icon:'success',confirmButtonColor: '#47A992',});
        this.userService.deleteUser(id).subscribe((res:any)=>{
        this.rows = this.rows.filter(r => r._id !== id);
        this.toastr.success(res.message, 'Success');
      })
  }else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    Swal.fire({
      title:'Cancelled',
      text:'Offer is safe :)',
      icon:'warning',
      confirmButtonColor: '#47A992',
    }
    )
  }
})
  }
}