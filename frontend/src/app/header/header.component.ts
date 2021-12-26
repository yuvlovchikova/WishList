import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { AuthQuery } from '../services/auth.query';
import { AuthStore } from '../services/auth.store';
import { CreateListDialogComponent } from '../create-list-dialog/create-list-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  readonly isLogged$ = this.authQuery.isLogged$;

  constructor(
    private matDialog: MatDialog,
    private authQuery: AuthQuery,
    private authStore: AuthStore,
    private router: Router,
  ) {}

  openLoginModal(): void {
    this.matDialog.open(LoginDialogComponent);
  }

  openListDialog(): void {
    this.matDialog.open(CreateListDialogComponent);
  }

  logOut(): void {
    this.authStore.update({ isLogged: false });
    this.router.navigateByUrl('');
  }
}
