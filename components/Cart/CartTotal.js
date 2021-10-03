import React from "react";
import styled from "styled-components";
import Currency from "react-currency-formatter";

function CartTotal({ cartItems }) {
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

  return (
    <CartTotalContainer>
      <CartTotalWrapper>
        <CartQuantityInfo>
          {" "}
          You have a total of {getCartItemsQuantity()} items.
        </CartQuantityInfo>
        <CartSubtotalInfo>
          {" "}
          Your subtotal is{" "}
          <SumWrapper>
            <Currency quantity={getCartItemsSubtotal()} />
          </SumWrapper>
        </CartSubtotalInfo>
        <CarTotalDetailsSection>
          <CarTotalDetail>*Shopping and taxes are included.</CarTotalDetail>
          <CarTotalDetail>*Coupons can be applyed at checkout.</CarTotalDetail>
          <CarTotalDetail></CarTotalDetail>
        </CarTotalDetailsSection>
        <ProceedButton>Proceed To Checkout</ProceedButton>
      </CartTotalWrapper>
    </CartTotalContainer>
  );
}

export default CartTotal;

const CartTotalContainer = styled.div`
  width: 40vw;

  @media all and (max-width: 728px) {
    width: 100%;
    margin-top: 50px;
    margin-bottom: -80px;
  }
`;
const CartTotalWrapper = styled.div`
  margin: 10% 20%;
  padding: 1%;
  border: 1px solid #b0b0b0;
  border-radius: 5px;
  box-shadow: 0 0 5px 3px #b0b0b0;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CartQuantityInfo = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin-top: 50px;
  margin-bottom: 30px;
  color: #2b2b2b;
  text-align: center;
`;

const CartSubtotalInfo = styled.div`
  font-size: 20px;
  margin-bottom: 100px;
  text-align: center;
`;

const SumWrapper = styled.span`
  font-weight: bold;
  font-style: italic;
  border-bottom: 2px solid #2b2b2b;
`;

const CarTotalDetailsSection = styled.div`
  margin-bottom: 230px;
  gap: 5px;
  display: flex;
  flex-direction: column;
`;

const CarTotalDetail = styled.div`
  font-style: italic;
  font-size: 15px;
`;

const ProceedButton = styled.button`
  font-size: 18px;
  border-radius: 10px;
  line-height: 20px;
  padding: 10px 17px;
  color: #e5dfd9;
  text-align: center;
  cursor: pointer;
  background-color: #1b1b1b;
  border-color: #1b1b1b;
`;
