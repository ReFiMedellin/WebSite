import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

type CurrencyType = 'COP' | 'USD';

interface ICurrencyContext {
  currency: CurrencyType;
  setCurrency: Dispatch<SetStateAction<CurrencyType>>;
}

export const GlobalCurrencyContext = createContext<ICurrencyContext>(
  {} as ICurrencyContext
);

export function GlobalCurrencyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currency, setCurrency] = useState<CurrencyType>('USD');

  return (
    <GlobalCurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </GlobalCurrencyContext.Provider>
  );
}

export function useGlobalCurrency() {
  return useContext(GlobalCurrencyContext);
} 