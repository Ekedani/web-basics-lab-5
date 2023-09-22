import {Component, OnInit} from '@angular/core';
import {UsersService} from "../users.service";
import {User} from "../users/user.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!: User;

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.usersService.getProfile().subscribe(res => {
        this.profile = res;
      }
    )
  }

}
