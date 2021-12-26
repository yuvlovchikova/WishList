import { Component } from '@angular/core';
import { ListsService } from '../services/lists.service';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthQuery } from '../services/auth.query';

@Component({
  selector: 'app-create-list-dialog',
  templateUrl: './create-list-dialog.component.html',
  styleUrls: ['./create-list-dialog.component.scss']
})
export class CreateListDialogComponent {
  readonly nameControl = new FormControl();

  readonly desireControl = new FormControl();

  desires: any = [];

  constructor(
    private listsService: ListsService,
    private dialogRef: MatDialogRef<CreateListDialogComponent>,
    private authQuery: AuthQuery,
    ) {}

  sendList(): void {
    this.listsService
      .createList(this.nameControl.value, this.desires)
      .subscribe(() => {
        this.authQuery.changeLists$.next(true);
        this.dialogRef.close();
      });
  }

  addDesire(): void {
    this.desires.push(this.desireControl.value);
    this.desireControl.setValue('');
  }

  deleteDesire(desire: any): void {
    const index = this.desires.indexOf(desire);
    this.desires = this.desires.slice(0, index).concat(this.desires.slice(index + 1));
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
