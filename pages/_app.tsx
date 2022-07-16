import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>App de Eventos NextJS Firebase</title>
        <meta
          name="description"
          content="Aplicación para registro y busqueda de eventos realizados o por realizar, detallando las caracteristicas de este"
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
