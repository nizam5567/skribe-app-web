import { createContext } from 'react';

interface keyable {
  [key: string]: any
}

export const EventContext = createContext({} as keyable);
