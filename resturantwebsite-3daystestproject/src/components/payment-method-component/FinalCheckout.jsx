import React, { useContext, useState } from 'react';
import "./finalcheckout.css";
import { SiPaytm } from "react-icons/si";
import { FaGooglePay } from "react-icons/fa";
import { SiPhonepe } from "react-icons/si";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaCreditCard } from "react-icons/fa";
import { Form, Button, Card, ListGroup } from 'react-bootstrap';
import { UserContext } from '../../UserGlobalContext';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';

const FinalCheckout = () => {
  const { calculateTotalAmount, getTotalItems, cart, placeOrder, clearCart } = useContext(UserContext);
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();

  const handlePaymentSelection = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      alert('Please select a payment method before placing the order.');
      return;
    }

    try {
      await placeOrder();
      alert('Order placed successfully!');
      await clearCart();
      navigate("/myorders");
    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an issue placing your order.');
    }
  };

  return (
    <>
      <Header />
      <div className="checkout-wrapper">
        <Form className="payment-form" onSubmit={handlePlaceOrder}>
          <h2 className="text-center mb-4 form-heading">Select Payment Option</h2>

          <Card className="order-summary mb-4">
            <Card.Body>
              <h4>Order Summary</h4>
              <p>Total Items: {getTotalItems()}</p>

              {/* List of Dish Names and Prices */}
              <ListGroup variant="flush">
                {cart.map(item => (
                  <ListGroup.Item key={item.id} className="d-flex justify-content-between">
                    <span>{item.dishName} (x{item.quantity})</span>
                    <span>₹{item.price * item.quantity}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              {/* Total Amount */}
              <p className="mt-3"><strong>Total Amount: ₹{calculateTotalAmount()}</strong></p>
            </Card.Body>
          </Card>

          {/* Payment Options */}
          <Form.Group className="mb-4 d-flex align-items-center">
            <SiPaytm className="payment-icon" />
            <Form.Check
              type="radio"
              label="Paytm"
              value="paytm"
              onChange={handlePaymentSelection}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-4 d-flex align-items-center">
            <FaGooglePay className="payment-icon" />
            <Form.Check
              type="radio"
              label="Google Pay"
              value="gpay"
              onChange={handlePaymentSelection}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-4 d-flex align-items-center">
            <SiPhonepe className="payment-icon" />
            <Form.Check
              type="radio"
              label="PhonePe"
              value="phonepe"
              onChange={handlePaymentSelection}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-4 d-flex align-items-center">
            <FaCreditCard className="payment-icon" />
            <Form.Check
              type="radio"
              label="Credit/Debit Card"
              value="card"
              onChange={handlePaymentSelection}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-4 d-flex align-items-center">
            <RiMoneyRupeeCircleFill className="payment-icon" />
            <Form.Check
              type="radio"
              label="Cash on Delivery"
              value="cod"
              onChange={handlePaymentSelection}
            />
          </Form.Group>

          {/* Place Order Button */}
          {cart.length === 0 ? (
            <Button variant="danger" disabled className="mt-4 w-100">
              Nothing in the cart
            </Button>
          ) : (
            <Button
              variant="success"
              type="submit"
              className="mt-4 w-100"
              disabled={!paymentMethod} // Disable if no payment option selected
            >
              Place Order
            </Button>
          )}
        </Form>
      </div>
    </>
  );
};

export default FinalCheckout;

