import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HeaderModule } from './header/header.module';
import { MainPageModule } from './main-page/main-page.module';
import { RegisterDialogModule } from './register-dialog/register-dialog.module';
import { LoginDialogModule } from './login-dialog/login-dialog.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ListsService } from './services/lists.service';
import { ListPageModule } from './list-page/list-page.module';
import { CreateListDialogModule } from './create-list-dialog/create-list-dialog.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HeaderModule,
    MainPageModule,
    LoginDialogModule,
    RegisterDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ListPageModule,
    CreateListDialogModule,
  ],
  providers: [
    AuthService,
    ListsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
