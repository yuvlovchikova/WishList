import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ListPageComponent } from './list-page/list-page.component';


export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'list/:id',
    component: ListPageComponent,
  }
]
