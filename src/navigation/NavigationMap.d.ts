import { Category } from 'models/Category';
import { Expense } from 'models/Expense';

import { Route } from './Route';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      [Route.SignedOutStack]: undefined;
      [Route.Login]: undefined;
      [Route.Register]: undefined;
      [Route.SignedInTabs]: undefined;
      [Route.CategoriesStack]: undefined;
      [Route.Categories]: undefined;
      [Route.TransactionsStack]: undefined;
      [Route.Transactions]: undefined;
      [Route.OverviewStack]: undefined;
      [Route.Overview]: undefined;
      [Route.SettingsStack]: undefined;
      [Route.Settings]: undefined;
      [Route.UpdateExpense]: { category: Category; expense?: Expense };
    }
  }
}
