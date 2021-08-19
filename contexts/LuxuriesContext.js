import React, { useContext, useState, useEffect } from "react";
import { db } from "../firebase";

// create custom context
const LuxuriesContext = React.createContext();

const LuxuriesTypesContext = React.createContext();

// export useable functions to child
export function useLuxuries() {
  return useContext(LuxuriesContext);
}

export function useLuxuriesTypes() {
  return useContext(LuxuriesTypesContext);
}

// export to _app.js
export function LuxuriesProvider({ children }) {
  // get an array of Luxuries
  const [luxuries, setLuxuries] = useState([]);

  const getLuxuries = () => {
    db.collection("products").onSnapshot((snapshot) => {
      let tempLuxuries = [];
      tempLuxuries = snapshot.docs.map((doc) => ({
        id: doc.id,
        product: doc.data(),
      }));
      setLuxuries(tempLuxuries);
    });
  };

  useEffect(() => {
    getLuxuries();
  }, []);

  // get an array of luxury Types
  const allLuxuriesTypes = luxuries.map((luxury) => {
    return luxury.product.type;
  });

  const luxuryTypes = allLuxuriesTypes.filter((AllLuxuriesType, index) => {
    return allLuxuriesTypes.indexOf(AllLuxuriesType) === index;
  });

  // being returned for AccountProvider(main) function
  return (
    <LuxuriesContext.Provider value={luxuries}>
      <LuxuriesTypesContext.Provider value={luxuryTypes}>
        {children}
      </LuxuriesTypesContext.Provider>
    </LuxuriesContext.Provider>
  );
}
