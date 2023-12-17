// src/app/view-ads/view-ads.component.ts
import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../annonce.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-view-annonce',
  templateUrl: './view-annonce.component.html',
  styleUrls: ['./view-annonce.component.scss'],
})
export class ViewAnnonceComponent implements OnInit {
  ad = { title: '', description: '', price: '', email: '', userId: '', image: '', type: '' };
  // Injecter le service AnnonceService, route et le router dans le constructeur
  constructor(private adService: AnnonceService, public router: Router,public route: ActivatedRoute,    ) {}


  
  ngOnInit() {
    this.route.params.subscribe(params => {
      // avoir l'id de l'annonce depuis l'url
      const adId = params['id'];
      // récupérer l'annonce par  id
      this.adService.getAdById(adId).subscribe((ad) => {
        this.ad= ad;
        console.log('ad', this.ad);

      });


    });
  }

  ownerAds() {
    this.router.navigate(['/user', this.ad.userId]);
  }

}
