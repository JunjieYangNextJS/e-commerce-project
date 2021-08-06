import React, { useContext, useState } from "react";

// create custom context
const ProductsDDLContext = React.createContext();
const ProductsDDLShowContext = React.createContext();
const ProductsDDLFoldContext = React.createContext();

// export useable functions to child
export function useProductsDDL() {
  return useContext(ProductsDDLContext);
}

export function useProductsDDLShow() {
  return useContext(ProductsDDLShowContext);
}

export function useProductsDDLFold() {
  return useContext(ProductsDDLFoldContext);
}

// export to _app.js
export function ProductsDDLProvider({ children }) {
  const [delayHandler, setDelayHandler] = useState(null);
  const [productsDDL, setProductsDDL] = useState(false);

  const showProductsDDL = () => {
    setProductsDDL(true);
    clearTimeout(delayHandler);
  };

  const foldProductsDDL = () => {
    setDelayHandler(
      setTimeout(() => {
        setProductsDDL(false);
      }, 300)
    );
  };

  //   being returned for AccountProvider(main) function
  return (
    <ProductsDDLContext.Provider value={productsDDL}>
      <ProductsDDLShowContext.Provider value={showProductsDDL}>
        <ProductsDDLFoldContext.Provider value={foldProductsDDL}>
          {children}
        </ProductsDDLFoldContext.Provider>
      </ProductsDDLShowContext.Provider>
    </ProductsDDLContext.Provider>
  );
}
