"use client";
import { useState } from "react";
import FormRadioField from "../Forms/FormRadioField";
import { useAppSelector, useDebounced } from "@/redux/hook";
import CheckoutForm from "./CheckoutForm";
import { usePaymentMethodsQuery } from "@/redux/api/paymentMethodApi";

const PaymentMethod = () => {
  const { total } = useAppSelector((state) => state.cart);
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data, isLoading } = usePaymentMethodsQuery({ ...query });

  const paymentMethodOptions = data?.paymentMethods?.map((method) => ({
    label: method?.method_name,
    value: method?.id,
  }));

  const stepData = useAppSelector((state) => state.checkout);
  
  const [isRequiredType, setIsRequiredType] = useState<string | undefined>(
    undefined
  );

  return (
    <>
      <div
        style={{
          border: "1px solid #d9d9d9",
          borderRadius: "5px",
          padding: "15px",
          margin: "10px 0 10px 10px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "18px",
              marginBottom: "10px",
            }}
          >
            Payment Method
          </p>
          <div>
            <div style={{ margin: "10px 0px" }}>
              {paymentMethodOptions !== undefined &&
                paymentMethodOptions?.length > 0 && (
                  <FormRadioField
                    size="large"
                    name="paymentMethodId"
                    options={paymentMethodOptions}
                    label=""
                    onValueChange={(value) => setIsRequiredType(value)}
                  />
                )}
            </div>
            {
              
              //@ts-ignore
              stepData?.paymentMethod?.name === "card" &&
                //@ts-ignore
                // stepData?.paymentMethod?.name !== "cashOn" &&
                 (
                  <>
                    <CheckoutForm price={total} />
                  </>
                )
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
