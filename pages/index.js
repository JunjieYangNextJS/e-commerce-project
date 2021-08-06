import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import Navbar from "../components/Navbar";
import HeroElements from "./../components/Hero/HeroElements";

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <HeroElements products={products} />
    </div>
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