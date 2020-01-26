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
@StoreConfig({ name: 'user', resettable: true })
export class UsersStore extends Store<UserState> {

  constructor() {
    super(createInitialState());
  }

  Login(user: User) {
    this.update((state: UserState) => {
      return ({
        list: [],
        loggedUser: user
      });
    });
  }

  Logout() {
    this.update((state: UserState) => {
      return ({
        list: [],
        loggedUser: null
      });
    });
  }
}

