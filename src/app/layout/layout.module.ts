import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from './components';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [LayoutComponent, NavbarComponent],
  exports: [LayoutComponent, NavbarComponent],
})
export class LayoutModule {}
