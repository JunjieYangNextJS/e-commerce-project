import React from "react";
import Navbar from "../components/Navbars/Navbar";
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
