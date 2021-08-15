import image from "next/image";
import React, { useContext, useState, useEffect } from "react";
import { db } from "../firebase";

// create custom context
const CartItemsContext = React.createContext();

const CartItemsGetQuantityContext = React.createContext();

const CartItemsGetSubtotalContext = React.createContext();

// export useable functions to child
export function useCartItems() {
  return useContext(CartItemsContext);
}

export function useCartItemsGetQuantity() {
  return useContext(CartItemsGetQuantityContext);
}

export function useCartItemsGetSubtotal() {
  return useContext(CartItemsGetSubtotalContext);
}

// export to _app.js
export function CartItemsProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = () => {
    db.collection("cartItems").onSnapshot((snapshot) => {
      let tempCartItems = [];
      tempCartItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        product: doc.data(),
      }));
      setCartItems(tempCartItems);
    });
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItemsQuantity = () => {
    let count = 0;
    cartItems.forEach((cartItem) => {
      count += cartItem.product.quantity;
    });

    return count;
  };

  const getCartItemsSubtotal = () => {
    let subtotal = 0;
    cartItems.forEach((cartItem) => {
      subtotal += cartItem.product.quantity * cartItem.product.price;
    });

    return subtotal;
  };

  // being returned for AccountProvider(main) function
  return (
    <CartItemsContext.Provider value={cartItems}>
      <CartItemsGetQuantityContext.Provider value={getCartItemsQuantity}>
        <CartItemsGetSubtotalContext.Provider value={getCartItemsSubtotal}>
          {children}
        </CartItemsGetSubtotalContext.Provider>
      </CartItemsGetQuantityContext.Provider>
    </CartItemsContext.Provider>
  );
}
