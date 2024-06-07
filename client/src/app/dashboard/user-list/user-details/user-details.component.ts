import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  @Input('title') title!:string
  @Input('payload') payload!:User
  readonly PICS_URL = environment.PICS_URL;

  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit(): void {
    // console.log(this.payload)
  }
}
