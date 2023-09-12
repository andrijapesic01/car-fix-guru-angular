import { createAction, props } from "@ngrx/store";
import { CreateModUserDto } from "src/app/models/user/create-mod-user.dto";
import { LoginUser } from "src/app/models/user/login-user";

export const loginUser = createAction(
  'loginUser',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  'loginSuccess',
  props<{ data: LoginUser }>()
);

export const logoutUser = createAction('logoutUser');
export const loginFailure = createAction(
  'loginFailure',
  props<{ error: string }>()
);

export const registerUser = createAction(
  'registerUser',
  props<{ userData: CreateModUserDto }>()
);

export const registerSuccess = createAction('registerSuccess');
export const registerFailure = createAction('registerFailure');
