import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { AuthGuard } from './guards';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SharedComponent],
  providers: [AuthGuard],
})
export class SharedModule { }
