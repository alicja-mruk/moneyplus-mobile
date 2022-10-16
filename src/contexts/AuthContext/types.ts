export enum RegisterErrorReason {
  USER_EXISTS,
  UNKNOWN,
}
export type RegisterResult =
  | {
      status: 'success';
    }
  | { status: 'error'; reason: RegisterErrorReason };
