import "../styles/globals.css";
import Layout from "../components/Layout";
import { Provider as AuthProvider } from "next-auth/client";
import { LuxuriesProvider } from "../contexts/LuxuriesContext";

function MyApp({ Component, pageProps }) {
  return (
    <LuxuriesProvider>
      <AuthProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </LuxuriesProvider>
  );
}

export default MyApp;
