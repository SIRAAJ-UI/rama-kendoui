import { Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { PBPageComponent } from './pbpage/pbpage.component';
import { CISaleAnalysisComponent } from './default/cisale-analysis/cisale-analysis.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PopErrorMsgsComponent } from './Shared/pop-error-msgs/pop-error-msgs.component';

export const routes: Routes = [
  { path: '', redirectTo:'pbpage', pathMatch: 'full'},
  { path: 'default', component: DefaultComponent },
  { path: 'pbpage', component: PBPageComponent },
  { path: 'CISalesAnalysis', component: CISaleAnalysisComponent},
  { path: 'error', component: ErrorPageComponent},
];
