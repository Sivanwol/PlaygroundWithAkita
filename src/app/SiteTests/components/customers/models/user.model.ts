
export interface User {
  id: string
  email: string
  password: string
}

export interface UserState {
  list: Array<User>;
  loggedUser: User;
}
