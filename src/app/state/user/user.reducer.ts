import { createReducer, on } from '@ngrx/store';
import { getToken, getUser } from 'src/app/auth/user-context';
import * as UserActions from './user.actions';
import { User } from 'src/app/models/user/user';

export interface UserState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
}

export const initialState: UserState = {
  user: getUser(),
  accessToken: getToken(),
  loading: false,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loginUser, (state) => ({
    ...state,
    loading: true,
  })),
  on(UserActions.logoutUser, () => ({
    user: null,
    accessToken: null,
    loading: false,
  })),
  on(UserActions.loginSuccess, (state, { data }) => ({
    user: data.user,
    accessToken: data.accessToken,
    loading: false,
  })),
  on(UserActions.loginFailure, () => ({
    user: null,
    accessToken: null,
    loading: false,
  })),
  on(UserActions.registerSuccess, (state) => ({
    ...state,
    loading: true,
  })),
  on(UserActions.registerSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(UserActions.registerFailure, (state) => ({
    ...state,
    loading: false,
  }))
);