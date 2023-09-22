import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./users/user.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly API_URL: string = 'http://localhost:3000/users/';

  constructor(private httpClient: HttpClient) {
  }

  public getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.API_URL);
  }

  public getProfile(): Observable<User> {
    return this.httpClient.get<User>(this.API_URL + 'profile');
  }

  public updateProfile(personalInfo: { username: string, email: string, phone: string }) {
    return this.httpClient.patch<User>(this.API_URL + 'profile', personalInfo);
  }

  public updateProfilePassword(oldPassword: string, newPassword: string) {
    return this.httpClient.put<User>(this.API_URL + 'profile/password', { oldPassword, newPassword });
  }

  public updatePersonalInfoById(id: string, personalInfo: { username: string, email: string, phone: string }) {
    return this.httpClient.patch<User>(this.API_URL + id, personalInfo);
  }

  public updatePasswordById(id: string,  newPassword: string) {
    return this.httpClient.put<User>(this.API_URL + id + '/password', newPassword);
  }

  public updateUserRolesById(id: string, roles: string[]) {
    return this.httpClient.put<User>(this.API_URL + id + '/roles', {roles});
  }
}
