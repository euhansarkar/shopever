"use client";
import { Provider } from "react-redux";
import StyledComponentsRegistry from "./AntdRegistry";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { store } from "../redux/store";
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);
const stripePromise = loadStripe(
  "pk_test_51M7P4lKglMI0jcEsXolOEwsrxVYMRPnhOiVCAITDYSpcoYSjoK4YbIESgBgtUQW9GwiBYCshymkOCrkznmgoRGhm00WcdgYXx5"
);

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    // redux provider
    <Provider store={store}>
      {/* ant design provider */}
      <StyledComponentsRegistry>
        {/* stripe provider */}
        <Elements stripe={stripePromise}>{children}</Elements>
      </StyledComponentsRegistry>
    </Provider>
  );
};

export default Providers;
