import { AntDesign, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

import { CategoryIconName } from 'models/Category';

export const getIconByName = (name: CategoryIconName) => {
  const commonProps = { size: 24, color: 'white' };
  switch (name) {
    case 'groceries':
      return <MaterialIcons name="local-grocery-store" {...commonProps} />;
    case 'restaurant':
      return <Ionicons name="restaurant" {...commonProps} />;
    case 'leasure':
      return <MaterialIcons name="local-movies" {...commonProps} />;
    case 'transport':
      return <MaterialIcons name="emoji-transportation" {...commonProps} />;
    case 'health':
      return <AntDesign name="heart" {...commonProps} />;
    case 'gift':
      return <FontAwesome name="gift" {...commonProps} />;
    case 'family':
      return <MaterialIcons name="family-restroom" {...commonProps} />;
    case 'shopping':
      return <FontAwesome name="shopping-bag" {...commonProps} />;
    case 'every-month':
      return <AntDesign name="sync" {...commonProps} />;
  }
};
