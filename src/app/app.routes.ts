import { Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { PBPageComponent } from './pbpage/pbpage.component';
import { CISaleAnalysisComponent } from './default/cisale-analysis/cisale-analysis.component';

export const routes: Routes = [
  { path: '', redirectTo:'CISalesAnalysis', pathMatch: 'full'},
  { path: 'default', component: DefaultComponent },
  { path: 'pbpage', component: PBPageComponent },
  { path: 'CISalesAnalysis', component: CISaleAnalysisComponent}
];
