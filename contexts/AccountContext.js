import React, { useContext, useState } from "react";

// create custom context
const AccountContext = React.createContext();
const AccountShowContext = React.createContext();
const AccountFoldContext = React.createContext();

// export useable functions to child
export function useAccount() {
  return useContext(AccountContext);
}

export function useAccountShow() {
  return useContext(AccountShowContext);
}

export function useAccountFold() {
  return useContext(AccountFoldContext);
}

// export to _app.js
export function AccountProvider({ children }) {
  const [account, setAccount] = useState(false);

  const showAccount = () => {
    setAccount(true);
  };

  const foldAccount = () => {
    setAccount(false);
  };

  //   being returned for AccountProvider(main) function
  return (
    <AccountContext.Provider value={account}>
      <AccountShowContext.Provider value={showAccount}>
        <AccountFoldContext.Provider value={foldAccount}>
          {children}
        </AccountFoldContext.Provider>
      </AccountShowContext.Provider>
    </AccountContext.Provider>
  );
}
