import React, { useEffect, useState, useContext } from "react";

import config from "../../config.json";
import UserContext from "../../contexts/UserContext";
import "./CartPage.css";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import CartContext from "../../contexts/CartContext";
import { checkoutAPI } from "./../../services/orderServices";
import { toast } from "react-toastify";

const CartPage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const user = useContext(UserContext);
  const { cart, setCart, addToCart, removeFromCart, updateCart } =
    useContext(CartContext);

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;

      setSubTotal(total);
    });
  }, [cart]);

  const checkout = () => {
    const oldCart = [...cart];
    setCart([]);
    checkoutAPI()
      .then(() => {
        toast.success("Your order has been successfully processed!");
      })
      .catch(() => {
        toast.error("Something went wrong!");
        setCart(oldCart);
      });
  };

  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img
          src={`${config.backendURL}/profile/${user?.profilePic}`}
          alt="user profile"
        />
        <div>
          <p className="user_name">{user?.name}</p>
          <p className="user_email">{user?.email}</p>
        </div>
      </div>
      <Table headings={["Items", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>£{product.price}</td>
              <td className="align_center table_quantity_input">
                <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  productId={product._id}
                  cartPage={true}
                />
              </td>
              <td>{quantity * product.price}</td>
              <td onClick={() => removeFromCart(product._id)}>X</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <table className="cart_bill">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>£{subTotal}</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>£5</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Total</td>
            <td>£{subTotal + 5}</td>
          </tr>
        </tbody>
      </table>
      <button
        className="search_button checkout_button"
        onClick={() => checkout()}
      >
        Checkout
      </button>
    </section>
  );
};

export default CartPage;
