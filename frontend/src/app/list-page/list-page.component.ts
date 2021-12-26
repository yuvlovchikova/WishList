import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListsService } from '../services/lists.service';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthStore } from '../services/auth.store';
import { tap } from 'rxjs/operators';
import { AuthQuery } from '../services/auth.query';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit, OnDestroy {
  readonly subscription = new Subscription();

  readonly userId = this.authStore.getValue().userId;

  readonly isLogged$ = this.authQuery.isLogged$;

  list: any;

  readonly desires = new Subject<any>();

  readonly desiresChanges = this.desires.pipe(
    tap(desires => this.desiresArray = desires)
  ).subscribe();

  desiresArray: any = [];

  listId: number;

  constructor(
    private listsService: ListsService,
    private router: Router,
    private authStore: AuthStore,
    private authQuery: AuthQuery,
  ) {}

  ngOnInit(): void {
    const parts = this.router.url.split('/');
    this.listId = parseInt(parts[parts.length - 1]);

    const getListRequest$ = this.listsService
      .getCertainList(this.listId)
      .subscribe(res => {
        this.list = res.list;
        this.desires.next(res.desires);
      });

    this.subscription.add(getListRequest$);
  }

  bookDesire(desire: any, event: Event): void {
    if (desire.desire_selected_by) {
      this.listsService
        .unbookDesire(desire.desire_id, this.listId)
        .subscribe(res => this.desires.next(res));
    } else {
      this.listsService
        .bookDesire(desire.desire_id, this.listId)
        .subscribe(res => this.desires.next(res));
    }
    (event.currentTarget as HTMLButtonElement).classList.toggle('disabled');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
