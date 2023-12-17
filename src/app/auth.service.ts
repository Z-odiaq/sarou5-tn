
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<any>;

  // Injecter AngularFireAuth dans le constructeur
  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }
  // Implémentation de login

  async login(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);//signInWithEmailAndPassword est une méthode de AngularFireAuth qui permet de se connecter avec un email et un mot de passe
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }
  // Implémentation de register

  async register(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);//createUserWithEmailAndPassword est une méthode de AngularFireAuth qui permet de créer un utilisateur avec un email et un mot de passe
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }
// Implémentation de logout
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();//signOut est une méthode de AngularFireAuth qui permet de se déconnecter
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }
// Implémentation de getCurrentUser qui retourne l'utilisateur actuellement connecté
  getCurrentUser() {
    return this.afAuth.currentUser;
  }
}
