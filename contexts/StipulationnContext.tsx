import { createContext } from 'react';

interface keyable {
  [key: string]: any
}

export const StipulationContext = createContext({} as keyable);
