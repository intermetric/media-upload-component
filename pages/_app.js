import Head from "next/head";
import { GlobalStyles } from "../styles/globalStyles";

export default function MediaUpload({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <title>Media Upload</title>
      </Head>

      <GlobalStyles />

      <Component {...pageProps} />
    </>
  );
}
