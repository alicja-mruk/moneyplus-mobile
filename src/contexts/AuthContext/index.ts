import { useContext } from 'react';

import { AuthContext } from './AuthContext';

export { AuthProvider } from './AuthProvider';
export { AuthContext } from './AuthContext';
export * from './types';

export const useAuthContext = () => useContext(AuthContext);
