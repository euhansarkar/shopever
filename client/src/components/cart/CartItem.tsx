"use client";

import { ICartProduct } from "@/types";
import { Suspense } from "react";
import SESpinner from "../ui/SESpinner";
import { Button, Col, Image, Radio, Row } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/redux/hook";
import { addToCart, removeOne } from "@/redux/features/cart/cartSlice";

type ICartItem = {
  products: ICartProduct[];
};

const CartItem = ({ products }: ICartItem) => {
  const dispatch = useAppDispatch();
  console.log(`from cart products from item`, products);

  const onChange = () => {};

  return (
    <div>
      <Suspense fallback={<SESpinner />}>
        <div style={{ maxHeight: "450px", overflowY: "scroll" }}>
          {products?.length > 0 &&
            products?.map((product) => (
              <Row
                key={product?.id}
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: "5px",
                  padding: "15px",
                  marginBottom: "10px",
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Col span={4}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Image
                      width="30%"
                      alt="image"
                      height={60}
                      src={product?.img}
                    />
                  </div>
                </Col>

                <Col span={6}>
                  <div>
                    <h2 style={{ fontSize: "17px" }}>{product?.name}</h2>
                    <div>
                      {product?.varients &&
                        Object.keys(product?.varients).map((property) => (
                          <div key={product?.varients[property].id}>
                            <span style={{ fontSize: "15px" }}>
                              {product?.varients[property].attribute_name} :
                            </span>
                            <span>
                              {product?.varients[property].options.option_text}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </Col>

                <Col span={4}>
                  <h2 style={{ fontSize: "17px" }}>{product?.price!}</h2>
                </Col>

                <Col span={4}>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <Button onClick={() => dispatch(addToCart(product))}>
                      <PlusOutlined />
                    </Button>
                    <Button>{product?.quantity}</Button>
                    <Button onClick={() => dispatch(removeOne(product))}>
                      <MinusOutlined />
                    </Button>
                  </div>
                </Col>

                <Col
                  span={6}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <h2 style={{ fontSize: "17px" }}>
                    {product?.quantity! * product?.price!}
                  </h2>
                </Col>
              </Row>
            ))}
        </div>
      </Suspense>
    </div>
  );
};

export default CartItem;
