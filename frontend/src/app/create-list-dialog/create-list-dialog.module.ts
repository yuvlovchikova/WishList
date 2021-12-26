import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateListDialogComponent } from './create-list-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreateListDialogComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CreateListDialogComponent],
})
export class CreateListDialogModule {}
