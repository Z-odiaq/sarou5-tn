import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AnnonceService } from '../annonce.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-edit-annonce',
  templateUrl: './edit-annonce.component.html',
  styleUrls: ['./edit-annonce.component.scss'],
})
export class EditAnnonceComponent implements OnInit {
  editedAd:  any = { title: '', description: '', type: '', image: '', price: '' };
  user : any;
  error : any;
  
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private adService: AnnonceService,
    private authService: AuthService
     
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      // avoir l'id de l'annonce depuis l'url
      const adId = params['id'];
      this.editedAd = {
        title: '',
        description: '',
        type: '',
        image: '',
        price: '',
      };
      // récupérer l'annonce par  id
      this.adService.getAdById(adId).subscribe((ad) => {
        this.editedAd = ad;
      });
    });
    // Subscribe pour avoir les données de l'utilisateur dés qu'il est connecté
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  saveChanges() {
    //validation de l'auteur de l'annonce
    if (this.editedAd.userId !== this.user.uid) {
      this.error = 'Erreur: Vous n\'êtes pas l\'auteur de cette annonce. ';
      return console.log('Erreur: Vous n\'êtes pas l\'auteur de cette annonce. ');
     // return alert('Erreur: Vous n\'êtes pas l\'auteur de cette annonce. ');
    }
    // validation de champs + user
    if (!this.editedAd || !this.editedAd.title || !this.editedAd.type || !this.editedAd.description || !this.editedAd.image || !this.editedAd.price) {
      return alert('Erreur: Tous les champs sont obligatoires.');
    }
    // savegarde
    this.adService.editAd(this.editedAd.id, this.editedAd);
    // redirection
    this.router.navigate(['/']);
  }
}
