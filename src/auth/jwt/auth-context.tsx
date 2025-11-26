'use client';

import { createContext } from 'react';
import { JWTContextType } from '../context/jwt/types';

// import { JWTContextType } from '../../types';

// ----------------------------------------------------------------------

export const AuthContext = createContext({} as JWTContextType);
