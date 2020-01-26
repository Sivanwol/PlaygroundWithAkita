import { Injectable } from '@angular/core';
import { Store, StoreConfig, arrayAdd } from '@datorama/akita';
import { User, UserState } from '../models/user.model';

export function createInitialState(): UserState {
  return {
    list: [],
    loggedUser: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'User', resettable: true })
export class UsersStore extends Store<UserState> {

  constructor() {
    super(createInitialState());
  }

  Login(user: User) {
    this.update((state: User) => {
      return ({
        list: [],
        loggedUser: user
      });
    });
  }

  Logout() {
    this.update((state: User) => {
      return ({
        list: [],
        loggedUser: null
      });
    });
  }
}

