export enum RegisterErrorReason {
  USER_EXISTS,
  UNKNOWN,
}
export type RegisterResult =
  | {
      status: 'success';
    }
  | { status: 'error'; reason: RegisterErrorReason };

  export enum LoginErrorReason {
    UNKNOWN,
  }

  export type LoginResult =
    | {
        status: 'success';
      }
    | { status: 'error'; reason: LoginErrorReason };

  export enum KeychainKeys {
    TOKEN = 'token',
  }