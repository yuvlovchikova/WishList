import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthStore } from './auth.store';

@Injectable({providedIn: 'root'})
export class ListsService {
  constructor(private http: HttpClient, private authStore: AuthStore) {}

  getLists(): Observable<any> {
    const header = new HttpHeaders().set('token', this.authStore.getValue().token);
    return this.http.get('/lists/', {headers: header})
      .pipe(
        catchError(this.handleError)
      );
  }

  getCertainList(id: number): Observable<any> {
    return this.http.get('/lists/' + id + '/')
      .pipe(
        catchError(this.handleError)
      );
  }

  createList(name: string, desires: any): Observable<any> {
    const header = new HttpHeaders().set('token', this.authStore.getValue().token);
    return this.http.post('/lists/', {name: name, desires: desires}, {headers: header})
      .pipe(
        catchError(this.handleError)
      );
  }

  bookDesire(desireId: number, listId: number): Observable<any> {
    const header = new HttpHeaders().set('token', this.authStore.getValue().token);
    return this.http.post('/lists/book', {desireId: desireId, listId: listId}, {headers: header})
      .pipe(
        catchError(this.handleError)
      );
  }

  unbookDesire(desireId: number, listId: number): Observable<any> {
    const header = new HttpHeaders().set('token', this.authStore.getValue().token);
    return this.http.post('/lists/unbook', {desireId: desireId, listId: listId},{headers: header})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse, authStore?: any) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError('Something bad happened; please try again.');
  }
}
