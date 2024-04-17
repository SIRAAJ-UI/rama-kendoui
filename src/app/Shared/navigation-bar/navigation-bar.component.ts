import { Component } from '@angular/core';
import { DataService } from '@csa/@services/data.service';
import { catchError, of } from 'rxjs';
import { MenuItem } from '../../Models/menu-item.model';
import { MenusModule } from '@progress/kendo-angular-menu';
import { MenuItemDisplay } from '../../Models/menu-item-display.model';
import { HttpClient } from '@angular/common/http';
import { ErrorLoggingService } from '@csa/@services/error-logging.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [MenusModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css',
})
export class NavigationBarComponent {
  constructor(private _DataService: DataService, private _ErrorLogging: ErrorLoggingService) {}
  menuItems: MenuItem[];
  displayMenuItems: MenuItemDisplay[];

  ngOnInit(): void {
    this.GetMenuItems();
  }

  GetMenuItems(): void {
    this._DataService
      .GetDataByUrl('CSAMenu')
      .pipe(
        catchError((error) => {
          this._ErrorLogging.logError(1, "Data fetching error");
          return of([]);
        })
      )
      .subscribe((items) => {
        this.menuItems = items;
        this.displayMenuItems = this.GetDisplayMenuItems(this.menuItems);
      });
  }

  GetDisplayMenuItems(inMenuItems: MenuItem[]): MenuItemDisplay[] {
    let outputMenuItems: MenuItemDisplay[] = [];
    let topLevelMenus: MenuItem[] = inMenuItems.filter(
      (menu) => menu.MENU_ID_LEVEL1 === 0
    );
    topLevelMenus.forEach((menu) => {
      let tempMenuItem: MenuItemDisplay = {
        text: menu.MENU_NAME,
        url: menu.MENU_URL,
        items: this.GetMenuChildItems(menu.MENU_ID),
      };
      outputMenuItems.push(tempMenuItem);
    });

    return outputMenuItems;
  }
  GetMenuChildItems(menuId: number): MenuItemDisplay[] {
    let childMenuItems: MenuItemDisplay[] = [];
    let filteredMenus = this.menuItems.filter(
      (menu) => menu.MENU_ID_LEVEL1 > 0 && menu.MENU_ID_LEVEL0 === menuId
    );

    filteredMenus.forEach((menu) => {
      let tempMenuItem: MenuItemDisplay = {
        text: menu.MENU_NAME,
        url: menu.MENU_URL,
        items: null,
      };
      childMenuItems.push(tempMenuItem);
    });

    return childMenuItems;
  }
}
