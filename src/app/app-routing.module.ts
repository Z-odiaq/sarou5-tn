import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateAnnonceComponent } from './create-annonce/create-annonce.component';
import { ViewAnnonceComponent } from './view-annonce/view-annonce.component';
import { EditAnnonceComponent } from './edit-annonce/edit-annonce.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { UserAdsComponent } from './user-ads/user-ads.component';
import { OwnerAdsComponent } from './owner-ads/owner-ads.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-annonce', component: CreateAnnonceComponent },
  { path: 'view-annonce/:id', component: ViewAnnonceComponent },
  { path: 'edit-annonce/:id', component: EditAnnonceComponent, canActivate: [AuthGuard], },
  { path: 'login',component: LoginComponent},
  { path: 'register',component: RegisterComponent},
  {path: 'me',component: UserAdsComponent,canActivate: [AuthGuard],}, //les annonces de l'utilisateur
  {path: 'user/:id',component: OwnerAdsComponent,canActivate: [AuthGuard],},//les annonces de les autres l'utilisateur
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
