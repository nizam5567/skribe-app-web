import { createContext } from 'react';

interface keyable {
  [key: string]: any
}

export const ExhibitContext = createContext({} as keyable);
