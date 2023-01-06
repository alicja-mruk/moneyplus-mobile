import { Spinner, Text, VStack } from 'native-base';

import { useTranslationPrefix } from 'config/i18n';

const Loading = () => {
  const t = useTranslationPrefix('global');

  return (
    <VStack space="4" flex="1" justifyContent="center" alignItems="center">
      <Spinner />
      <Text>{t('init')}</Text>
    </VStack>
  );
};

export default Loading;
