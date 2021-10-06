import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.replace("/");
    }, 2000);
  }, []);

  const bodyDiv = {
    height: "2000px",
    padding: "50px 100px",
    fontSize: "20px",
  };

  return (
    <>
      <Head>
        <title>Page Not Found</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Oooops, this page does not exist."
        ></meta>
      </Head>
      <div style={bodyDiv}>
        <h1>Ooooops..</h1>
        <h2>This page cannot be found.</h2>
        <h2>Redirecting to the homepage.</h2>
      </div>
    </>
  );
}
