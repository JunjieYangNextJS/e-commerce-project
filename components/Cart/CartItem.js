import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { db } from "../../firebase";
import Currency from "react-currency-formatter";

function CartItem({
  id,
  image,
  alt,
  name,
  price,
  quantity,
  cartItemsEachPage,
  cartItems,
  setDeleteLastPageItem,
}) {
  // supply and change value for CartItemQuantitySelect
  let options = [];
  for (let i = 1; i < Math.max(quantity + 1, 31); i++) {
    options.push(
      <option value={i} key={i}>
        Qty: {i}
      </option>
    );
  }

  const handleQuantityChange = (newQuantity) => {
    db.collection("cartItems")
      .doc(id)
      .update({ quantity: parseInt(newQuantity) });
  };

  // handle delete cartItem and change delete state for pagination re-rendering
  const handleItemDelete = () => {
    db.collection("cartItems").doc(id).delete();

    if (cartItemsEachPage.length === 1 && cartItems.length !== 1) {
      setDeleteLastPageItem(true);
    }
  };

  return (
    <CartItemContainer>
      <Image
        src={image}
        alt={alt}
        height={160}
        width={160}
        objectFit="contain"
      />
      <CartItemDetails>
        <CartItemName>{name}</CartItemName>
        <CartItemPrice>
          <Currency quantity={parseInt(price)} />
        </CartItemPrice>

        <CartItemQuantityContainer>
          <CartItemPriceInSmallerScreen>
            <Currency quantity={parseInt(price)} />
          </CartItemPriceInSmallerScreen>
          <CartItemQuantitySelect
            value={quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
          >
            {options}
          </CartItemQuantitySelect>
          <CartItemDelete onClick={handleItemDelete}>Delete</CartItemDelete>
        </CartItemQuantityContainer>
      </CartItemDetails>
    </CartItemContainer>
  );
}

export default CartItem;

const CartItemContainer = styled.div`
  display: flex;
  padding: 20px 40px 20px 40px;
  color: black;
  gap: 7%;

  @media all and (max-width: 480px) {
    flex-direction: column;
  }
`;

const CartItemDetails = styled.div`
  /* border: 1px solid red; */
  width: 70%;

  @media all and (max-width: 480px) {
    width: 100%;
    text-align: center;
  }
`;

const CartItemName = styled.div`
  font-weight: 700;
  font-size: 19px;
  line-height: 1.5;
  height: 50%;
`;
const CartItemPrice = styled.div`
  height: 30%;
  margin-top: 3px;
  font-size: 18px;

  @media all and (max-width: 1350px) {
    visibility: hidden;
  }
`;

const CartItemQuantityContainer = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  @media all and (max-width: 480px) {
    justify-content: center;
  }
`;

const CartItemQuantitySelect = styled.select`
  border-radius: 7px;
  background-color: #f0f2f2;
  padding: 6px;
  box-shadow: 0 2px 5px rgba(15, 17, 17, 0.15);
  cursor: pointer;
  outline: none;
`;

const CartItemDelete = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: #313131;
`;

const CartItemPriceInSmallerScreen = styled.div`
  display: none;
  @media all and (max-width: 1350px) {
    display: flex;
    font-size: 17px;
  }

  /* @media all and (max-width: 400px) {
    font-size: 12px;
  } */
`;
