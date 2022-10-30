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
  id: string;
  categoryName: string;
  color: string;
  iconName: CategoryIconName;
  typeOfCategory: string;
};