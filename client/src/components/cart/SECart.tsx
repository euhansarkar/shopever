/* eslint-disable react/jsx-no-undef */
"use client";
import {
  addToCart,
  removeFromCart,
  removeOne,
} from "@/redux/features/cart/cartSlice";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  MinusOutlined,
  PlusOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Col, Drawer, Grid, Image, Row } from "antd";
import Link from "next/link";
import { Suspense } from "react";
import SESpinner from "../ui/SESpinner";

type ICart = {
  showDrawer: () => void;
  onClose: () => void;
  open: boolean;
};

const SECart = ({ showDrawer, onClose, open }: ICart) => {
  const { useBreakpoint } = Grid;
  const { lg, md, sm } = useBreakpoint();
  const dispatch = useAppDispatch();

  // get all products
  const { products, total } = useAppSelector((state) => state.cart);

  return (
    <>
      <div>
        {products?.length > 0 ? (
          <Suspense fallback={<SESpinner />}>
            <Badge count={products?.length}>
              <Avatar
                style={{ cursor: "pointer" }}
                onClick={showDrawer}
                size={sm ? "default" : "small"}
                icon={<ShoppingOutlined />}
              />
            </Badge>
          </Suspense>
        ) : (
          <Suspense fallback={<SESpinner />}>
            <Badge count={products?.length} showZero>
              <Avatar
                style={{ cursor: "pointer" }}
                onClick={showDrawer}
                size={sm ? "default" : "small"}
                icon={<ShoppingOutlined />}
              />
            </Badge>
          </Suspense>
        )}
      </div>

      <Drawer title="Cart" placement="right" onClose={onClose} open={open}>
        <Suspense fallback={<SESpinner />}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p style={{ fontSize: "20px" }}>SubTotal:</p>
              <p style={{ fontSize: "20px" }}>{total.toFixed(2)}</p>
            </div>
            <div>
              <Link href={`/cart`}>
                <Button style={{ width: "100%" }}>view cart</Button>
              </Link>
            </div>
            <div>
              <Link href={`/checkout`}>
                <Button style={{ width: "100%" }}>view checkout</Button>
              </Link>
            </div>
          </div>
        </Suspense>

        {/* cart items */}

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
                  }}
                >
                  <Col span={6}>
                    <Image
                      width="100%"
                      alt="image"
                      height={60}
                      src={product?.img}
                    />
                  </Col>
                  <Col
                    span={18}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                    }}
                  >
                    <h2>{product?.name}</h2>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <Button onClick={() => dispatch(addToCart(product))}>
                        <PlusOutlined />
                      </Button>
                      <Button>{product?.quantity}</Button>
                      <Button onClick={() => dispatch(removeOne(product))}>
                        <MinusOutlined />
                      </Button>
                    </div>
                    <p style={{ fontSize: "17px" }}>
                      {product?.quantity!} * {product?.price!} ={" "}
                      {product?.quantity! * product?.price!}
                    </p>
                  </Col>
                </Row>
              ))}
          </div>
        </Suspense>
      </Drawer>
    </>
  );
};

export default dynamic(() => Promise.resolve(SECart), { ssr: false });
