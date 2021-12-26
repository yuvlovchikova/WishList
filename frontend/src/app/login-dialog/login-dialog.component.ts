import { Component, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AuthStore } from '../services/auth.store';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { Subscription } from 'rxjs';
import { AuthQuery } from '../services/auth.query';
import { Router } from '@angular/router';

@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnDestroy {
  readonly emailControl = new FormControl();

  readonly passwordControl = new FormControl();

  readonly subscription = new Subscription();

  showError = false;

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private authService: AuthService,
    private authStore: AuthStore,
    private matDialog: MatDialog,
    private authQuery: AuthQuery,
    private router: Router,
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  openRegisterModal(): void {
    this.matDialog.open(RegisterDialogComponent);
    this.dialogRef.close();
  }

  login(): void {
    const loginRequest$ = this.authService
      .login(this.passwordControl.value.trim(), this.emailControl.value.trim())
      .subscribe(res => {
        if (res.token) {
          this.authStore.update({
            token: res.token,
            isLogged: true,
            userId: res.userId,
          });
          this.authQuery.changeLists$.next(true);
          this.router.navigateByUrl('');
          this.closeDialog();
        }
      },
        error => {
          if (error.status === 401) {
            this.showError = true;
          }
        });
    this.subscription.add(loginRequest$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
