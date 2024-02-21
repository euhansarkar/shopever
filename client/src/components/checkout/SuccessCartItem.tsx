import { Divider } from "antd";
import { useShippingMethodsQuery } from "@/redux/api/shippingMethodApi";
import { useOrderQuery } from "@/redux/api/orderApi";

const SuccessCartItem = ({ id }: { id: string }) => {
  //   const stepData = useAppSelector((state) => state.checkout);
  //   const { products, total } = useAppSelector((state) => state.cart);
  //   console.log(`this is products`, products);

  const { data: orderData, isLoading: orderLoading } = useOrderQuery(id);

  console.log(`orderData`, orderData);

  const { data, isLoading } = useShippingMethodsQuery({});
  let getShippingMethod: any = {};

  return (
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
        {/* <CheckoutCart products={products} /> */}
        <div style={{ paddingLeft: "10px", paddingRight: "20px" }}>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>sub total</span>
            {/* <span>{total ? total : 0}</span> */}
          </div>

          <div
            style={{
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>Discount</span>
            {/* <span>{total ? 0 : 0}</span> */}
          </div>
          {/* 
          {
            //@ts-ignore
            stepData?.shippingMethod?.name && (
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Shipping</span>
                <span>{getShippingMethod?.cost}</span>
              </div>
            )
          } */}

          <Divider />
          <div
            style={{
              marginTop: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>total</span>
            {/* <span>{total ? total : 0}</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessCartItem;
