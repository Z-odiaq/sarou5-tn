import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error = '';

  constructor(private authService: AuthService, public router:Router  ) {}

  async login(): Promise<void> {
    try {
      // Appel de la méthode login de AuthService
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/']);

    } catch (error : any) {
      console.error('Erreur: ', error);
            //pour afficher le message d'erreur
      this.error = "Email ou mot de passe incorrect";
    }
  }
}
