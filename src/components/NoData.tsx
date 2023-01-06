import { Image, Text, VStack } from 'native-base';

import { useTranslationPrefix } from 'config/i18n';

type Props = {
  title?: string;
};

const NoData = ({ title }: Props) => {
  const t = useTranslationPrefix('noData');

  return (
    <VStack flex="1" justifyContent="center" alignItems="center" space="4">
      <Image source={require('assets/images/no_data.png')} size="100px" alt="no data" />
      <Text fontSize="md">{title ?? t('title')}</Text>
    </VStack>
  );
};

export default NoData;
