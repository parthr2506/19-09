import { useContext } from 'react';
import AuthContext from './pages/AuthContext';

export const useAuth = () => useContext(AuthContext);
