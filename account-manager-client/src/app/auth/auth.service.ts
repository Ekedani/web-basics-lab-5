import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = 'http://localhost:3000/auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  public isLoggedIn: Subject<boolean> = new Subject<boolean>();

  public get isAuthenticated(): boolean {
    return !!this.token;
  }

  login(email: string, password: string) {
    this.http.post<{ accessToken: string }>(`${this.API_URL}/login`, {email, password}).subscribe({
      next: res => {
        this.token = res.accessToken;
        this.router.navigate(['/profile']);
      },
      error: err => {
        alert('Invalid credentials');
      }
    })
  }

  register(
    username: string,
    email: string,
    phone: string,
    password: string
  ): void {
    this.http.post<{ accessToken: string }>(`${this.API_URL}/register`, {username, email, phone, password}).subscribe(
      res => {
        this.token = res.accessToken;
        this.router.navigate(['/profile']);
      }
    )
  }

  get token(): string | null {
    return sessionStorage.getItem('accessToken');
  }

  set token(token: string) {
    sessionStorage.setItem('accessToken', token);
  }

  logout(): void {
    sessionStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
}
