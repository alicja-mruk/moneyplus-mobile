import { Route } from './Route';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      [Route.SignedInTabs]: undefined;
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
    }
  }
}
