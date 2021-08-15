import image from "next/image";
import React, { useContext, useState, useEffect } from "react";
import { db } from "../firebase";

// create custom context
const LuxuriesContext = React.createContext();

// export useable functions to child
export function useLuxuries() {
  return useContext(LuxuriesContext);
}

// export to _app.js
export function LuxuriesProvider({ children }) {
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

  // being returned for AccountProvider(main) function
  return (
    <LuxuriesContext.Provider value={luxuries}>
      {children}
    </LuxuriesContext.Provider>
  );
}
