import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from '../annonce.service';
import { IonicModule } from '@ionic/angular'; // Add this import
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-annonce',
  templateUrl: './create-annonce.component.html',
  styleUrls: ['./create-annonce.component.scss'],
})
export class CreateAnnonceComponent implements OnInit{
  newAd: any = { title: '', description: '', type: '', image: '', price: '',email:'' };
  user: any;
  
  constructor(public router: Router, private adService: AnnonceService, private authService: AuthService,) { }

  ngOnInit() {
    // Subscribe pour avoir les données de l'utilisateur dés qu'il est connecté
    this.authService.user$.subscribe((user) => {
      this.user = user;

    });
  }
  
  saveAd() {
    // validation de champs + validation de user
    if (!this.user || !this.newAd || !this.newAd.title || !this.newAd.type || !this.newAd.description || !this.newAd.image || !this.newAd.price) {
      return alert('Erreur: Tous les champs sont obligatoires.');
    }
    // ajout de l'annonce avec l'id de l'utilisateur
    this.newAd.userId = this.user.uid;
    // ajout de l'email de l'utilisateur
    this.newAd.email = this.user.email;
    //savegarde
    this.adService.addAd(this.newAd);
    //redirection
    this.router.navigate(['/']);
  }
}
