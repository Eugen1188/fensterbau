import { Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
      {
    path: '',
    component: HomeComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  }

];
