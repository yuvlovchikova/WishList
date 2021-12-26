import { Injectable } from '@angular/core';
import { persistState, Store, StoreConfig } from '@datorama/akita';

export interface AuthState {
  token: string;
  isLogged: boolean;
  username: string;
  userId: string;
}

export function createInitialState(): AuthState {
  return {
    token: '',
    isLogged: false,
    username: '',
    userId: '',
  };
}

const authStoreKey = 'wish-list-auth-store';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: authStoreKey })
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(createInitialState());
  }
}

export const persistStorage = persistState({include: [authStoreKey]});
