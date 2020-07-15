import React from 'react';

import { useGlobalContext } from './useGlobalContext';

type GlobalContextType = {
  query?: string;
  handleQueryChange?: React.ChangeEventHandler<HTMLInputElement>;
  shouldRevalidate?: boolean;
  setShouldRevalidate?: (shouldRevalidate: boolean) => void;
};

export const GlobalContext = React.createContext<GlobalContextType>({});

export const StoreProvider: React.FC = ({ children }) => {
  const { query, setQuery, shouldRevalidate, setShouldRevalidate } = useGlobalContext();

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <GlobalContext.Provider
      value={{
        query,
        handleQueryChange,
        shouldRevalidate,
        setShouldRevalidate,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
