// annonce.service.ts
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AnnonceService {
  private ads: Observable<any[]>; // Observable des annonces

  constructor(private db: AngularFireDatabase, ) {
    // Récupérer les annonces depuis la base de données 
    this.ads = this.db.list('ads').snapshotChanges().pipe(
      //Ajouter l'id de l'annonce à l'annonce
      map(changes =>
        changes.map(c => {
          const data = c.payload.val();
          const id = c.payload.key;
          return { id, ...data as any };
        })
      )
    );
  }
// Récupérer les annonces
   getAds(): Observable<any[]> {
     return this.ads;
   }
// Récupérer une annonce par id
  getAdById(adId: string): Observable<any> {
    return this.db.object(`ads/${adId}`).valueChanges().pipe(
      map(ad => {
        const data = ad as any;
        return { id: adId,  ...data };
      })
    );
  }

  // Récupérer les annonces par userId
  getAdsByUserId(userId: string): Observable<any[]> {
    return this.db.list('ads', ref => ref.orderByChild('userId').equalTo(userId))
      .snapshotChanges().pipe(
        map(changes =>
          changes.map(c => {
            const data = c.payload.val();
            const id = c.payload.key;
            return { id, ...data as any };
          })
        )
      );
  }
// Modifier une annonce
  editAd(adId: string, updatedAd: any): void {
    this.db.object(`ads/${adId}`).update(updatedAd);
  }
// Ajouter une annonce
  addAd(ad: any): void {
    this.db.list('ads').push(ad);
  }
// Supprimer une annonce
  deleteAd(adId: string): void {
    this.db.object(`ads/${adId}`).remove();
  }
// Récupérer les annonces d'un utilisateur
  getUserAds(userId: string): Observable<any[]> {
    return this.db.list('ads', ref => ref.orderByChild('userId').equalTo(userId))
      .snapshotChanges().pipe(
        map(changes =>
          //filtrer les annonces par userId
          changes.map(c => {
            const data = c.payload.val();
            const id = c.payload.key;
            return { id, ...data  as any };
          })
        )
      );
  }
}
