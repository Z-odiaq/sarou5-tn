import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot, // ActivatedRouteSnapshot contient les informations sur la route activée
    state: RouterStateSnapshot // RouterStateSnapshot contient les informations sur l'état de l'application
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user$.pipe(
      take(1), // take(1) pour ne pas avoir à se désabonner
      map((user) => !!user) // !!user pour convertir user en boolean
    );
  }
}
