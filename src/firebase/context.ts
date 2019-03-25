import { createContext } from 'react';
import Firebase from './index';

const FirebaseContext = createContext<Firebase>(null as any);

export default FirebaseContext;
