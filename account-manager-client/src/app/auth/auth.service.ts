import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

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

  public get isAuthenticated(): boolean {
    console.log(this.token, !!this.token, 'isAuthenticated');
    return !!this.token;
  }

  login(email: string, password: string) {
    this.http.post<{ accessToken: string }>(`${this.API_URL}/login`, {email, password}).subscribe(
      res => {
        this.token = res.accessToken;
      }
    )
  }

  register(email: string, password: string): void {
    this.http.post<{ accessToken: string }>(`${this.API_URL}/register`, {email, password}).subscribe(
      res => {
        this.token = res.accessToken;
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
