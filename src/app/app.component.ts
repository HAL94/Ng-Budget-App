import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="flex flex-row items-center justify-center p-3">
      <span>
        Made with <mat-icon [ngClass]="'text-[#d52c2c]'">favorite</mat-icon> by
        Habib Aldarwish
      </span>
      <a href="https://github.com/HAL94/Ng-Budget-App" target="_blank" class="mx-2"
        ><app-github></app-github
      ></a>
    </div>

    <router-outlet></router-outlet>
  `,
  styles: [``],
})
export class AppComponent {}
