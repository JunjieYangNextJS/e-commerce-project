import CartItems from "../components/Cart/CartItems";
import CartTotal from "../components/Cart/CartTotal";
import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "./../components/Footer";

export default function ShoppingCart() {
  return (
    <div>
      <Navbar />
      <CheckOutPage>
        <CartItems />
        <CartTotal />
      </CheckOutPage>
      <Footer />
    </div>
  );
}

const CheckOutPage = styled.div`
  display: flex;
  padding-bottom: 200px;
`;
