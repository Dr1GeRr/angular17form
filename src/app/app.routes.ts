import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { contactcomponent } from './contact/contact.component';
import { PersonalComponent } from './personal/personal.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
  { path: 'personal', loadChildren: () => import('./personal/personal.module').then(m => m.PersonalModule) }
];

@NgModule({
  imports: [HttpClientModule, CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
