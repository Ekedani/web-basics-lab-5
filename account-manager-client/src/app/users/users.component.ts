import {Component, OnInit} from '@angular/core';
import {UsersService} from "../users.service";
import {MatTableDataSource} from '@angular/material/table';
import {User} from "./user.model";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users!: User[];
  selectedUser: User | undefined;
  constructor(private readonly usersService: UsersService) {
  }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  onUserClicked(row: User) {
    this.selectedUser = row;
  }

  onUserUpdated($event: User) {
    this.selectedUser = undefined;
    this.usersService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }
}
