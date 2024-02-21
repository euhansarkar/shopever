import { usePaymentIntentMutation } from "@/redux/api/paymentApi";
import {
  setClientSecret,
  setStripeCardError,
} from "@/redux/features/payment/paymentSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent, useEffect, useState } from "react";

const CheckoutForm = (price: { price: number }) => {
  const { stripeCardError, clientSecret } = useAppSelector(
    (state) => state.payment
  );
  const dispatch = useAppDispatch();
  const [paymentIntent] = usePaymentIntentMutation();
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    if (clientSecret === null || clientSecret === "") {
      const createPaymentIntent = async () => {
        try {
          const response = await paymentIntent(price) as any;
          console.log(response);
          dispatch(setClientSecret(response?.data));
        } catch (error) {
          console.error(error);
        }
      };
      createPaymentIntent();
    }
  }, [price, paymentIntent, dispatch, clientSecret]);

  // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   console.log(`hello world`);
  //   event.preventDefault();

  //   if (!stripe || !elements) {
  //     return;
  //   }

  //   const card = elements.getElement(CardElement);
  //   if (!card) {
  //     return;
  //   }

  //   const { error, paymentMethod } = await stripe.createPaymentMethod({
  //     type: "card",
  //     card,
  //   });

  //   if (error) {
  //     console.log(error);
  //     dispatch(setStripeCardError(error?.message));
  //     // setStripeCardError(error?.message!);
  //   } else {
  //     setStripeCardError("");
  //   }

  //   const { paymentIntent, error: confirmError } =
  //     await stripe.confirmCardPayment(clientSecret, {
  //       payment_method: {
  //         card,
  //         billing_details: {
  //           name: "Jenny Rosen",
  //         },
  //       },
  //     });

  //   if (confirmError) {
  //     setStripeCardError(confirmError?.message!);
  //     return;
  //   }

  //   if (paymentIntent.status === "succeeded") {
  //     setSuccess("");
  //   }

  //   console.log(`payment intent`, paymentIntent);
  // };

  return (
    <div>
      {/* <form onSubmit={handleSubmit}> */}
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {/* <Button
          style={{ margin: "10px 0 0 0" }}
          type="primary"
          htmlType="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </Button> */}
      {/* </form> */}
      {stripeCardError && <p style={{ color: "red" }}>{stripeCardError}</p>}
    </div>
  );
};

export default CheckoutForm;
