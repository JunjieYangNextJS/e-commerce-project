import React from "react";
import Head from "next/head";
import Navbar from "../components/Navbars/Navbar";
import HeroElements from "./../components/Hero/HeroElements";

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="This is our Homepage."></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <HeroElements products={products} />
    </>
  );
}

export async function getServerSideProps(context) {
  let products = await fetch(
    "http://fakestoreapi.com/products/category/jewelery"
  ).then((res) => res.json());
  return {
    props: {
      products,
    },
  };
}
