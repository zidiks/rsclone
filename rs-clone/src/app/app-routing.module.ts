import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './menu/home/home.component';
import { MenuComponent } from './menu/menu.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { AuthGuard } from "./auth.guard";
import { MeComponent } from './menu/me/me.component';
import { ShopComponent } from './menu/shop/shop.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { OptionsComponent } from './menu/options/options.component';

const itemRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'me', component: MeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'options', component: OptionsComponent }
];

const routes: Routes = [
  { path: 'game', component: GameComponent, canActivate: [AuthGuard] },
  { path: '', component: MenuComponent, children: itemRoutes, canActivate: [AuthGuard] },
  { path: 'login', component: SignInComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'welcome', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
