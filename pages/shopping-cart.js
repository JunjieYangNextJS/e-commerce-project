import React from "react";
import Head from "next/head";
import styled from "styled-components";
import Navbar from "../components/Navbars/Navbar";
import CartItems from "../components/Cart/CartItems";
import CartTotal from "../components/Cart/CartTotal";

export default function ShoppingCart() {
  return (
    <div>
      <Head>
        <title>Shopping Cart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Please check your shopping cart and proceed to checkout."
        ></meta>
      </Head>
      <Navbar />
      <CheckOutPage>
        <CartItems />
        <CartTotal />
      </CheckOutPage>
    </div>
  );
}

const CheckOutPage = styled.div`
  display: flex;
  padding-bottom: 15vh;

  @media all and (max-width: 725px) {
    flex-direction: column;
  }
`;
