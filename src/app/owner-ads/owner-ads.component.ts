import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../annonce.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-owner-ads',
  templateUrl: './owner-ads.component.html',
  styleUrls: ['./owner-ads.component.scss'],
})
export class OwnerAdsComponent  implements OnInit {

  constructor(private adService: AnnonceService, public router: Router,public route: ActivatedRoute,    ) {}
  userAds: any;
  email : any;
  ngOnInit() {
    this.route.params.subscribe(params => {
      // avoir l'id de l'annonce depuis l'url
      const adId = params['id'];
      // récupérer les annonces de l'utilisateur
      this.adService.getAdsByUserId(adId).subscribe((ads) => {
        this.userAds= ads;
        this.email = this.userAds[0].email;
      });

    });
  }
  viewAd(adId: string) {
    // Redirection vers la page de l'annonce avec l'id de l'annonce
    this.router.navigate(['/view-annonce', adId]);
  }

}
