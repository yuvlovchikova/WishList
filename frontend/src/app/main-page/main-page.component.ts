import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListsService } from '../services/lists.service';
import { combineLatest, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthQuery } from '../services/auth.query';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'find-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  readonly isLogged$ = this.authQuery.isLogged$;

  readonly listsChanges$ = combineLatest([this.isLogged$, this.authQuery.changeLists$]).pipe(
    tap(() => {
      this.listsService
        .getLists()
        .subscribe(res => this.lists = res);
    })
  ).subscribe();

  lists: any = [];

  readonly subscription = new Subscription();

  constructor(
    private listsService: ListsService,
    private router: Router,
    private authQuery: AuthQuery,
  ) {};

  ngOnInit(): void {
    const getListsRequest$ = this.listsService
      .getLists()
      .subscribe(res => this.lists = res);

    this.subscription.add(getListsRequest$);
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

  openList(id: number): void {
    this.router.navigateByUrl(`list/${id}`)
  }
}
