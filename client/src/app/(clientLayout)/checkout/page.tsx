"use client";
import BillingAddrss from "@/components/checkout/BillingAddrss";
import CartItem from "@/components/checkout/CartItem";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import ShippingAddrss from "@/components/checkout/ShippingAddrss";
import ShippingMethod from "@/components/checkout/ShippingMethod";
import StepperForm from "@/components/stepper/FormStepper";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import { CHECKOUT_STEPPER_PERSIST_KEY } from "@/constants/storageKey";
import { useAddOrderMutation } from "@/redux/api/orderApi";
import { resetCart } from "@/redux/features/cart/cartSlice";
import { resetCheckoutData } from "@/redux/features/checkout/checkoutSlice";
import { setStripeCardError } from "@/redux/features/payment/paymentSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Col, Row, message } from "antd";
import { redirect, useRouter } from "next/navigation";

const CheckOutPage = () => {
  const router = useRouter();
  const [addOrder] = useAddOrderMutation();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.cart);
  const stepData = useAppSelector((state) => state.checkout);

  const stripe = useStripe();
  const elements = useElements();
  const { clientSecret } = useAppSelector((state) => state.payment);

  const steps = [
    {
      title: "Shipping Info",
      content: <ShippingAddrss />,
    },
    {
      title: "Shipping Method",
      content: <ShippingMethod />,
    },
    {
      title: "Billing Address",
      content: <BillingAddrss />,
    },
    {
      title: "Payment",
      content: <PaymentMethod />,
    },
  ];

  const handleOrderSubmit = async (values: any) => {
    // const data = JSON.parse(getFromLocalStorage(CHECKOUT_STEPPER_PERSIST_KEY) as string);

    // console.log(`this is data submitttted`, data);

    // console.log(`this is valuuuuues`, values);

    if (values?.paymentMethod?.name === "card") {
      if (!stripe || !elements) {
        return;
      }

      const card = elements.getElement(CardElement);

      if (!card) {
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        console.log(error);
        setStripeCardError(error?.message!);
      } else {
        setStripeCardError("");
      }

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: "Jenny Rosen",
            },
          },
        });

      if (confirmError) {
        setStripeCardError(confirmError?.message!);
        return;
      }

      // if (paymentIntent.status === "succeeded") {
      //   setSuccess("");
      // }

      console.log(`payment intent`, paymentIntent);
    }

    dispatch(resetCheckoutData());
    localStorage.removeItem(CHECKOUT_STEPPER_PERSIST_KEY);

    // const obj = { ...values };
    // const file = obj["file"];
    // delete obj["file"];
    // const data = JSON.stringify(obj);
    // const formData = new FormData();
    // formData.append("file", file as Blob);
    // formData.append("data", data);
    // message.loading("Creating...");
    try {
      const productsData: any = JSON.parse(JSON.stringify(products));

      console.log(`this is stringified`, productsData);

      const newProducts = productsData?.map((product: any) => {
        const myProduct = {
          product_id: product?.id,
          varients: Object.values(product?.varients).map((varient: any) => ({
            attribute_id: varient?.id,
            attribute_name: varient?.attribute_name,
            option_id: varient?.option_id,
            varient_id: varient?.varient_id,
          })),
        };
        return myProduct;
      });

      console.log(`get new products array`, newProducts);

      const data = { ...values, products: newProducts };
      const res = await addOrder(data).unwrap();
      if (!!res?.id) {
        console.log(`this is order response`, res);
        message.success("Order created successfully!");
        router.push(`/checkout/success/${res?.id}`);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  if (products?.length > 0) {
    return (
      <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
        <Col span={12} style={{ margin: "10px 0" }}>
          <div>
            <SEBreadCrumb
              items={[
                {
                  label: `Home`,
                  link: `/home`,
                },
                {
                  label: `Checkout`,
                  link: `/checkout`,
                },
              ]}
            />

            <StepperForm
              persistKey={CHECKOUT_STEPPER_PERSIST_KEY}
              submitHandler={(value) => {
                handleOrderSubmit(value);
              }}
              steps={steps}
            />
          </div>
        </Col>

        {/* second col */}
        <Col span={12} style={{ margin: "10px 0" }}>
          <CartItem />
        </Col>
      </Row>
    );
  } else {
    return redirect(`/cart`);
  }
};

export default CheckOutPage;
