"use client";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/redux/hook";
import { Button, Col, Empty, Input, Row } from "antd";
import Link from "next/link";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import CartItem from "@/components/cart/CheckoutCart";

const CartProductPage = () => {
  const { products, total } = useAppSelector((state) => state.cart);

  if (products?.length > 0) {
    return (
      <>
        <div
          style={{
            width: "100%",
            height: "80vh",
          }}
        >
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={16} style={{ margin: "10px 0" }}>
              <SEBreadCrumb
                items={[
                  {
                    label: `Home`,
                    link: `/home`,
                  },
                  {
                    label: `Cart`,
                    link: `/cart`,
                  },
                ]}
              />

              <div
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: "5px",
                  padding: "15px",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "18px",
                      marginBottom: "10px",
                    }}
                  >
                    Products
                  </p>
                  <CartItem products={products} />
                </div>
              </div>

              <div
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: "5px",
                  padding: "15px",
                  margin: "0 0 10px 0",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "18px",
                      marginBottom: "10px",
                    }}
                  >
                    Coupon Code ?
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      gap: "20px",
                    }}
                  >
                    <Input
                      color="#000"
                      width="80%"
                      defaultValue={"put your discount code"}
                    />
                    <Button danger style={{ width: "20%" }}>
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </Col>

            {/* second col */}
            <Col span={8} style={{ margin: "10px 0" }}>
              <div
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: "5px",
                  padding: "15px",
                  margin: "0 0 10px 0", // Adjusted margin here
                }}
              >
                <p
                  style={{
                    fontSize: "18px",
                    marginBottom: "10px",
                  }}
                >
                  Total Summary
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>sub total</span>
                  <span>{total ? total : 0}</span>
                </div>

                <div
                  style={{
                    marginTop: "22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>total</span>
                  <span>{total ? total : 0}</span>
                </div>
                <div
                  style={{
                    marginTop: "22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Link href={`/checkout`}>
                    <Button type="primary">Checkout</Button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "80vh",
          }}
        >
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 60 }}
            description={<span>Your cart is empty!</span>}
          >
            <Link href={`/home`}>
              <Button type="primary">Continue Shopping</Button>
            </Link>
          </Empty>
        </div>
      </>
    );
  }
};
export default dynamic(() => Promise.resolve(CartProductPage), { ssr: false });
