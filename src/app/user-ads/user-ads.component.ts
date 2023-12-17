import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AnnonceService } from '../annonce.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-ads',
  templateUrl: './user-ads.component.html',
  styleUrls: ['./user-ads.component.scss'],
})
export class UserAdsComponent implements OnInit {
  user: any;
  userAds: any[] = [];

  // Injecter les services dans le constructeur pour les utiliser dans la classe
  constructor(private authService: AuthService, private annonceService: AnnonceService, public router: Router , private adService: AnnonceService, public route : ActivatedRoute) {}

  ngOnInit() {
    // Subscribe pour avoir les données de l'utilisateur
    this.authService.user$.subscribe((user) => {
      this.user = user;
      if (user) {
        // récupérer les annonces de l'utilisateur si il est connecté
        this.annonceService.getUserAds(user.uid).subscribe((ads) => {
          this.userAds = ads;
          console.log('userAds', this.userAds);
        });
      }
    });
  }

  editAd(adId: string) {
    // Redirection vers la page de modification de l'annonce avec l'id de l'annonce
    this.router.navigate(['/edit-annonce', adId]);
  }

  deleteAd(adId: string) {
    // Suppression de l'annonce avec l'id de l'annonce
    this.adService.deleteAd(adId);
    //attendre la suppression de l'annonce puis redirection vers la page d'accueil
    this.adService.getAds().subscribe((data) => {
      this.userAds = data;
      this.router.navigate(['/']);
    });

  }
  viewAd(adId: string) {
    // Redirection vers la page de l'annonce avec l'id de l'annonce
    this.router.navigate(['/view-annonce', adId]);
  }
}
