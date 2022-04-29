import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubComponent } from './github.component';



@NgModule({
  declarations: [
    GithubComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [GithubComponent]
})
export class IconsModule { }
