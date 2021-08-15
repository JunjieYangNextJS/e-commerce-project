import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import { db } from "../../firebase";
import Currency from "react-currency-formatter";

function CartItem({
  id,
  image,
  name,
  price,
  quantity,
  cartItemsEachPage,
  cartItems,
}) {
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

  const router = useRouter();

  const handleItemDelete = () => {
    db.collection("cartItems").doc(id).delete();

    if ((cartItemsEachPage.length === 1) & (cartItems.length !== 1)) {
      router.reload();
    }
  };

  return (
    <CartItemContainer>
      <Image src={image} height={160} width={160} objectFit="contain" />
      <CartItemDetails>
        <CartItemName>{name}</CartItemName>
        <CartItemPrice>
          <Currency quantity={price} />
        </CartItemPrice>

        <CartItemQuantityContainer>
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
  gap: 60px;
`;

const CartItemDetails = styled.div`
  /* border: 1px solid red; */
  width: 70%;
`;

const CartItemName = styled.div`
  font-weight: 700;
  font-size: 19px;
  line-height: 1.5;
  height: 50%;
`;
const CartItemPrice = styled.div`
  height: 30%;
  font-size: 18px;
`;

const CartItemQuantityContainer = styled.div`
  gap: 10px;
  display: flex;
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
  border: none;
  background-color: transparent;
  color: #313131;
`;
