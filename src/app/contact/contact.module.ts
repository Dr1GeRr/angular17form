import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { contactcomponent } from './contact.component';

const routes: Routes = [
  { path: '', component: contactcomponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactModule {}  // Ensure this is named correctly and matches the import
