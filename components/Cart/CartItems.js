import React, { useState } from "react";
import styled from "styled-components";
import CartItem from "./CartItem";
import PaginateBtn from "../PaginateBtn";
import { paginate } from "../../utility/paginate";
import { useCartItems } from "../../contexts/CartItemsContext";

function CartItems() {
  const cartItems = useCartItems();

  const [cartPage, setCartPage] = useState(1);

  const cartPageSize = 5;

  let cartPageNumberArray = [];
  for (let i = 1; i <= Math.ceil(cartItems.length / cartPageSize); i++)
    cartPageNumberArray.push(i);

  const cartItemsEachPage = paginate(cartItems, cartPage, cartPageSize);

  return (
    <CartItemsContainer>
      <CartItemsWrapper>
        {cartItems.length > 0 ? (
          cartItemsEachPage.map(({ id, product }) => (
            <CartItemSection>
              <CartItem
                key={id}
                id={id}
                image={product.image}
                name={product.name}
                price={product.price}
                quantity={product.quantity}
                cartItemsEachPage={cartItemsEachPage}
                cartItems={cartItems}
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
        pageNumberArray={cartPageNumberArray}
        setCurrentPage={setCartPage}
      />
    </CartItemsContainer>
  );
}

export default CartItems;

const CartItemsContainer = styled.div`
  margin-top: 30px;
  margin-left: 40px;
`;
const CartItemsWrapper = styled.div`
  padding-bottom: 20px;
`;
const CartItemSection = styled.div`
  width: 60vw;
  h1 {
    padding-left: 50px;
    padding-top: 20px;
  }
`;
