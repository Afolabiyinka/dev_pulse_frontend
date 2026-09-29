export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
  confirmedPassword: string;
}

export interface LoginResponse {
  message?: string;
  user?: unknown;
  accessToken?: string;
  token?: string;
}

export type SignupResponse = LoginResponse;

