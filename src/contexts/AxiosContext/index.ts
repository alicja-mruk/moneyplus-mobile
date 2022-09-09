import { useContext } from 'react';

import { AxiosContext } from './AxiosContext';

export { AxiosProvider } from './AxiosProvider';
export { AxiosContext } from './AxiosContext';

export const useAxiosContext = () => useContext(AxiosContext);
