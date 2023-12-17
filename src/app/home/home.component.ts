import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from '../annonce.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ads: any[] = [];

  user: any;

  constructor(public router: Router, private authService: AuthService, private adService: AnnonceService) {
    // Subscribe pour avoir les données de l'utilisateur
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }
  ngOnInit() {
    // Subscribe pour avoir les données des annonces
    this.adService.getAds().subscribe((data) => {
      this.ads = data;
      console.log('ads', this.ads);
    });
  }
  viewAd(adId: string) {
    // Redirection vers la page de l'annonce avec l'id de l'annonce
    this.router.navigate(['/view-annonce', adId]);
  }

  viewUserAds() {
    // Redirection vers la page des annonces de l'utilisateur
    this.router.navigate(['/me']);
  }

  logout() {
    // Déconnexion
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
