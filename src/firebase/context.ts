import { createContext } from 'react';
import firebaseService from './index';

const FirebaseServiceContext = createContext<typeof firebaseService>(null as any);

export default FirebaseServiceContext;
