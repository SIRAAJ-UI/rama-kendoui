import { Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { PBPageComponent } from './pbpage/pbpage.component';

export const routes: Routes = [
  { path: 'default', component: DefaultComponent },
  { path: 'pbpage', component: PBPageComponent },
];
