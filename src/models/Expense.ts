import { Category } from './Category';

export type Expense = {
  id: string;
  name: string;
  value: number;
  creationDate: string;
  category: Category;
};