import "../styles/globals.css";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { Provider as AuthProvider } from "next-auth/client";
import { AccountProvider } from "../contexts/AccountContext";
import { ProductsDDLProvider } from "../contexts/ProductsDDLContext";
import { LuxuriesProvider } from "../contexts/LuxuriesContext";

function MyApp({ Component, pageProps }) {
  return (
    <LuxuriesProvider>
      <ProductsDDLProvider>
        <AccountProvider>
          <AuthProvider session={pageProps.session}>
            <Component {...pageProps} />
          </AuthProvider>
        </AccountProvider>
      </ProductsDDLProvider>
    </LuxuriesProvider>
  );
}

export default MyApp;
