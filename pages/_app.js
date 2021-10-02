import "../styles/globals.css";
import Layout from "../components/Layout";
import { Provider as AuthProvider } from "next-auth/client";
import { LuxuriesProvider } from "../contexts/LuxuriesContext";
import { CartItemsProvider } from "../contexts/CartItemsContext";

function MyApp({ Component, pageProps }) {
  return (
    <LuxuriesProvider>
      <CartItemsProvider>
        <AuthProvider session={pageProps.session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </CartItemsProvider>
    </LuxuriesProvider>
  );
}

export default MyApp;
