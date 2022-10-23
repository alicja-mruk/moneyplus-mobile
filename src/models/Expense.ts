import { Category } from './Category';

export type Expense = {
  id: string;
  category: Category;
  expenseName: string;
  expenseValue: string;
  creationDate: string;
};
