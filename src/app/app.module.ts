// Import the Angular module for Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateAnnonceComponent } from './create-annonce/create-annonce.component';
import { ViewAnnonceComponent } from './view-annonce/view-annonce.component';
import { EditAnnonceComponent } from './edit-annonce/edit-annonce.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserAdsComponent } from './user-ads/user-ads.component';
import { OwnerAdsComponent } from './owner-ads/owner-ads.component';
// Coonfiguration de Firebase
const firebaseConfig = {

  
};


@NgModule({
  declarations: [
    AppComponent,
    CreateAnnonceComponent,
    ViewAnnonceComponent,
    EditAnnonceComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserAdsComponent,
    OwnerAdsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
