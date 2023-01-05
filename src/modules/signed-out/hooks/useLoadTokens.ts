import { useState } from 'react';

import * as Keychain from 'react-native-keychain';

import { CustomToast } from 'components/CustomToast';
import { useAuthContext } from 'contexts/AuthContext';

export const useLoadTokens = () => {
  const { logout, setAuthState } = useAuthContext();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  const loadJWT = async () => {
    try {
      const jwt = await Keychain.getGenericPassword();
      setAuthState({
        accessToken: jwt.username || null,
        refreshToken: jwt.password || null,
        authenticated: jwt.username !== null,
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      CustomToast.error(`loadJWT error: ${error}`);
      await logout();
    }
  };

  return {
    loadJWT,
    status,
  };
};
