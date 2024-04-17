import { Component, OnInit, OnDestroy } from "@angular/core";
import { QueryParamsService } from "../../../Services/query-params.service";
import { prop_char_tab_model } from "../../../Models/property_characteristics.model";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
//import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { environment } from "../../../../environments/environment";
import { Observable, catchError, of, map } from "rxjs";
import { LoadingOverlayComponent } from "@csa/@shared/loading-overlay/loading-overlay.component";
import { ErrorLoggingService } from "../../../Services/error-logging.service";
import { LoadingService } from "../../../Services/loading.service";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";

@Component({
  selector: "app-prop-chars-tab",
  standalone: true,
  imports: [
    InputsModule,
    DateInputsModule,
    LabelModule,
    LoadingOverlayComponent,
  ],
  templateUrl: "./prop-chars-tab.component.html",
  styleUrl: "./prop-chars-tab.component.css",
})
export class PropCharsTabComponent {
  public prop_chars!: prop_char_tab_model;
  public selected_propId!: string;
  public csa_id!: string;
  public events: string[] = [];
  private baseUrl: string = environment.BaseURL;
  private localUrl: string = environment.localDevBase;
  private _getPropCharsUrl;
  private _observer: any;

  constructor(
    private loadingService: LoadingService,
    private _http: HttpClient,
    private paramservice: QueryParamsService,
    private errorService: ErrorLoggingService
  ) {
    this.csa_id = this.paramservice.csaId + "";
    this._getPropCharsUrl = this.baseUrl + "/GetPropCharsTabInfo";
    // Initialize prop_chars to an empty object
    this.prop_chars = {} as prop_char_tab_model;
  }

  ngOnInit(): void {
    this.loadingService.showLoading();
    this._observer = this.getPropCharsTab(this.csa_id).subscribe(
      (prop_chars: prop_char_tab_model) => {
        if (prop_chars) {
          this.prop_chars = prop_chars;
        } else {
          this.prop_chars = undefined;
        }
        this.loadingService.hideLoading();
      }
    );
  }

  getPropCharsTab(csa_id: string): Observable<any> {
    let params = new HttpParams();
    params = params.append("CSA_Id", csa_id);

    return this._http
      .get<prop_char_tab_model>(this._getPropCharsUrl, { params: params })
      .pipe(
        map((propCharInfo: prop_char_tab_model) => {
          try {
            return propCharInfo;
          } catch (e) {
            console.error("Error getting:", e);
            catchError(this.handleError);
            return null;
          }
        })
      );
  }

  private handleError(err: HttpErrorResponse) {
    return this.errorService.logError(
      2,
      "Error getting property characteristics. " + err.error
    );
  }

  ngOnDestroy() {
    this._observer.unsubscribe();
  }
}
