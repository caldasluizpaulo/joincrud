import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { CadastrarComponent } from "./components/cadastrar/cadastrar.component";
import { homeAuthGuard } from "./guards/homeAuth.guard";
import { HomeComponent } from "./components/home/home.component";


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastrar',
    component: CadastrarComponent
  },
  { path: 'home',
    component: HomeComponent,
    canActivate: [homeAuthGuard],
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
