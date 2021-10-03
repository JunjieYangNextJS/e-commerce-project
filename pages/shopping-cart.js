import React, { useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import Navbar from "../components/Navbars/Navbar";
import CartItems from "../components/Cart/CartItems";
import CartTotal from "../components/Cart/CartTotal";
import { db } from "../firebase";
import { useSession } from "next-auth/client";

export default function ShoppingCart() {
  const [session] = useSession();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (session) {
      db.collection("cartItems")
        .where("userEmail", "==", session.user.email)
        .onSnapshot((snapshot) => {
          let tempCartItems = [];
          tempCartItems = snapshot.docs.map((doc) => ({
            id: doc.id,
            product: doc.data(),
          }));
          setCartItems(tempCartItems);
        });
      return () => {
        setCartItems([]);
      };
    }
  }, [session]);

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
        <CartItems cartItems={cartItems} />
        <CartTotal cartItems={cartItems} />
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
