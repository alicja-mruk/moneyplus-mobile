export type CategoryIconName =
  | 'groceries'
  | 'restaurant'
  | 'leasure'
  | 'transport'
  | 'health'
  | 'gift'
  | 'family'
  | 'shopping'
  | 'every-month';

export type Category = {
  title: string;
  color: string;
  iconName: CategoryIconName;
  amount: number;
};

