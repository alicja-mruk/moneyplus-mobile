import { Category } from './Category';

export type Expense = {
  id: string;
  expenseName: string;
  expenseValue: number;
  creationDate: string;
  category: Category;
};