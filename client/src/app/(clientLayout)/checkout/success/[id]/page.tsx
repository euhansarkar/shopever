"use client";

import SuccessCartItem from "@/components/checkout/SuccessCartItem";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import { useOrderQuery } from "@/redux/api/orderApi";
import { resetCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Col, Row } from "antd";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const CheckOutSuccessPage = ({ params }: any) => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.cart);
  const { id } = params;
  

  useEffect(() => {
    if (products?.length > 0) {
      dispatch(resetCart());
    }
  }, [dispatch, products?.length]);

  return (
    <div style={{ width: "100%", height: "80vh" }}>
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
                  label: `Checkout Success`,
                  link: `/checkout/success/${id}`,
                },
              ]}
            />

            <h2>this is payment successful page </h2>
            <h2>order id {id}</h2>
          </div>
        </Col>

        {/* second col */}
        <Col span={12} style={{ margin: "10px 0" }}>
          <SuccessCartItem id={id} />
        </Col>
      </Row>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CheckOutSuccessPage), {
  ssr: false,
});
