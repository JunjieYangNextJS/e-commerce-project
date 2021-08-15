import "../styles/globals.css";
import React from "react";
import { Provider as AuthProvider } from "next-auth/client";
import { AccountProvider } from "../contexts/AccountContext";
import { ProductsDDLProvider } from "../contexts/ProductsDDLContext";
import { LuxuriesProvider } from "../contexts/LuxuriesContext";
import { CartItemsProvider } from "../contexts/CartItemsContext";

function MyApp({ Component, pageProps }) {
  return (
    <LuxuriesProvider>
      <CartItemsProvider>
        <ProductsDDLProvider>
          <AccountProvider>
            <AuthProvider session={pageProps.session}>
              <Component {...pageProps} />
            </AuthProvider>
          </AccountProvider>
        </ProductsDDLProvider>
      </CartItemsProvider>
    </LuxuriesProvider>
  );
}

export default MyApp;
