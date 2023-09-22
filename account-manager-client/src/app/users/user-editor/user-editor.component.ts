import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../user.model";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {UsersService} from "../../users.service";

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent {
  private _user!: User;
  @Input() set user(value: User) {
    this._user = value;
    this.initForms();
  }

  @Output() userUpdated: EventEmitter<User> = new EventEmitter<User>();

  personalInfoForm!: FormGroup

  newPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ])
  });

  rolesForm: FormGroup = new FormGroup({
    user: new FormControl(false),
    admin: new FormControl(false),
  }, [this.atLeastOneRoleValidator]);

  constructor(private readonly usersService: UsersService) {
  }

  private initForms() {
    this.personalInfoForm = new FormGroup({
      username: new FormControl(this._user.username, [
        Validators.required
      ]),
      email: new FormControl(this._user.email, [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl(this._user.phone, [
        Validators.required,
        Validators.pattern('^\\+\\d{1,4}\\s?\\d{1,14}$')
      ])
    });
    this._user.roles.forEach(role => {
      this.rolesForm.get(role)?.setValue(true);
    });
  }

  private atLeastOneRoleValidator(control: AbstractControl): ValidationErrors | null {
    const user = control.get('user');
    const admin = control.get('admin');
    if (!user?.value && !admin?.value) {
      return {'atLeastOneRole': true};
    }
    return null;
  }

  onPersonalInfoSubmit() {
    this.usersService.updatePersonalInfoById(this._user._id, this.personalInfoForm.value).subscribe((user: User) => {
      this.userUpdated.emit(user);
    });
  }

  onNewPasswordSubmit() {
    console.log(this.newPasswordForm.value);
    this.usersService.updatePasswordById(this._user._id, this.newPasswordForm.value).subscribe((user: User) => {
      this.userUpdated.emit(user);
    });
  }

  onRolesSubmit() {
    const roles: string[] = [];
    if (this.rolesForm.get('user')?.value) {
      roles.push('user');
    }
    if (this.rolesForm.get('admin')?.value) {
      roles.push('admin');
    }
    this.usersService.updateUserRolesById(this._user._id, roles).subscribe((user: User) => {
      this.userUpdated.emit(user);
    });
  }
}
