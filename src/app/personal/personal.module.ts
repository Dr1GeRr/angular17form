import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', loadComponent: () => import('./personal.component').then(c => c.PersonalComponent) }
    ])
  ]
})
export class PersonalModule { }
