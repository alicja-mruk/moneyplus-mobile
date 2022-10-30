import { Category } from './Category';

export type Expense = {
  id: string;
  category: Category;
  expenseName: string;
  expenseValue: number;
  creationDate: string;
};
