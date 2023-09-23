import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {

  error: {
    error: string,
    status: number
  } = {error: 'Page not found', status: 404};

  constructor(private router: Router) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      console.log(this.router.getCurrentNavigation()?.extras.state);
      this.error = this.router.getCurrentNavigation()?.extras.state as {
        error: string,
        status: number
      };
    }
  }
}
