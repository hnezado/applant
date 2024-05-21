import React, { useState, useEffect, useCallback } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = ({ userInfo, apiPostAction, modalAction, addMsg }) => {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const getTotalPrice = useCallback(() => {
    if (userInfo) {
      return userInfo.cart.reduce((total, item) => {
        return total + item.quantity * item.product.price;
      }, 0);
    }
  }, [userInfo]);

  const getPaymentIntent = useCallback(async () => {
    const result = await apiPostAction(
      { amount: getTotalPrice() },
      `get-payment-intent`,
      []
    );
    setClientSecret(result?.data.clientSecret);
  }, [apiPostAction, getTotalPrice]);

  useEffect(() => {
    getPaymentIntent();
  }, [getPaymentIntent]);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      apiPostAction(null, "clear-cart", ["user"]);
      setError(null);
      setProcessing(false);
      addMsg(`Payment succeeded`);
      modalAction("close");
    }
  };

  const getCheckoutForm = () => {
    return (
      <div className="modal">
        <form className="stripe-form" onSubmit={handleSubmit}>
          <CardElement
            id="card-element"
            options={cardStyle}
            onChange={handleChange}
          />
          <button
            className="button"
            disabled={processing || disabled}
            id="submit"
          >
            <span id="button-text">
              {processing ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay now"
              )}
            </span>
          </button>
          {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
          )}
        </form>
      </div>
    );
  };

  return <div className="CheckoutForm">{getCheckoutForm()}</div>;
};

export default CheckoutForm;
