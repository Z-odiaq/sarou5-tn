import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  error: any = ''; // Pour afficher les erreurs
  constructor(private authService: AuthService, public router:Router  ) {}

  async register(): Promise<void> {
    try {
      // Appel de la méthode register de AuthService
      await this.authService.register(this.email, this.password);
      this.router.navigate(['/login']);
    } catch (error: any) {
      //pour afficher le message d'erreur
      this.error = error.message;
    }
  }
}
