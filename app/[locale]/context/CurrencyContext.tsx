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
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
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
  const [token, setToken] = useState<string>(''); // Default token state

  return (
    <GlobalCurrencyContext.Provider value={{ currency, setCurrency, token, setToken }}>
      {children}
    </GlobalCurrencyContext.Provider>
  );
}

export function useGlobalCurrency() {
  return useContext(GlobalCurrencyContext);
} 