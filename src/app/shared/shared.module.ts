import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { AuthGuard } from './guards';
import { SearchFilterPipe } from './pipes';

@NgModule({
  imports: [CommonModule],
  declarations: [SharedComponent, SearchFilterPipe],
  providers: [AuthGuard],
  exports: [
    SearchFilterPipe
  ]
})
export class SharedModule {}
