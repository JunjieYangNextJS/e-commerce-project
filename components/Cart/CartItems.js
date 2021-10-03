import React, { useState } from "react";
import styled from "styled-components";
import CartItem from "./CartItem";
import PaginateBtn from "../PaginateBtn";
import { paginate } from "../../utility/paginate";

function CartItems({ cartItems }) {
  // get cartItems and display cartItems on each page

  const [cartPage, setCartPage] = useState(1);

  const cartPageSize = 5;

  let cartPageNumberArray = [];
  for (let i = 1; i <= Math.ceil(cartItems.length / cartPageSize); i++)
    cartPageNumberArray.push(i);

  const cartItemsEachPage = paginate(cartItems, cartPage, cartPageSize);

  // defining state for pagination re-rendering after items get deleted
  const [deleteLastPageItem, setDeleteLastPageItem] = useState(false);

  return (
    <CartItemsContainer>
      <CartItemsWrapper>
        {cartItems.length > 0 ? (
          cartItemsEachPage.map(({ id, product }) => (
            <CartItemSection key={id}>
              <CartItem
                key={id}
                id={id}
                image={product.image}
                alt="luxury in cart"
                name={product.name}
                price={product.price}
                quantity={product.quantity}
                cartItemsEachPage={cartItemsEachPage}
                cartItems={cartItems}
                setCartPage={setCartPage}
                cartPage={cartPage}
                setDeleteLastPageItem={setDeleteLastPageItem}
              />
              <hr />
            </CartItemSection>
          ))
        ) : (
          <CartItemSection>
            <h1>Your Shopping bag is currently empty.</h1>
          </CartItemSection>
        )}
      </CartItemsWrapper>
      <PaginateBtn
        currentPage={cartPage}
        setCurrentPage={setCartPage}
        pageNumberArray={cartPageNumberArray}
        deleteLastPageItem={deleteLastPageItem}
        setDeleteLastPageItem={setDeleteLastPageItem}
        cartItemsEachPage={cartItemsEachPage}
        cartItems={cartItems}
      />
    </CartItemsContainer>
  );
}

export default CartItems;

const CartItemsContainer = styled.div`
  width: 60vw;
  padding-top: 30px;
  padding-left: 40px;
  @media all and (max-width: 728px) {
    width: 100%;
    padding-right: 40px;
  }
`;
const CartItemsWrapper = styled.div`
  padding-bottom: 20px;
`;
const CartItemSection = styled.div`
  h1 {
    padding-left: 50px;
    padding-top: 20px;
  }
`;
