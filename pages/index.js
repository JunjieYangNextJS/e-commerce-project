import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import Navbar from "../components/Navbar";
import HeroElements from "./../components/Hero/HeroElements";

export default function Home({ products }) {
  return (
    <>
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
