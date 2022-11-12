import { Expense } from 'models';

export type RegisterVars = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
};

export type RegisterData = {
  data: {
    statusCode: number;
    message: string;
  };
};

export type LoginVars = {
  email: string;
  password: string;
};

export type LoginData = {
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export type RefreshTokenVars = {
  refreshToken: string;
};

export type GetUserData = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
};

export type EditExpenseVars = {
  id: string;
  categoryId: string;
  expenseName: string;
  expenseValue: string;
};

export type AddExpenseVars = {
  categoryId: string;
  expenseName: string;
  expenseValue: string;
};

export type DeleteExpenseVars = {
  id: string;
};

export type EditExpenseData = {
  data: {
    expense: Expense;
  };
};
