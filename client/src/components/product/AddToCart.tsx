import { addToCart } from "@/redux/features/cart/cartSlice";
import { resetVarientOption } from "@/redux/features/varientOption/selectSlice";
import { useAppDispatch } from "@/redux/hook";
import { ICartProduct } from "@/types";
import { Button } from "antd";

type AddToCartProps = {
  value: string;
  product: ICartProduct;
};

const AddToCartPage = ({ value, product }: AddToCartProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    dispatch(resetVarientOption());
  };

  return (
    <>
      {value === "" ? (
        <Button type="primary" block disabled>
          Add To Cart
        </Button>
      ) : (
        <Button onClick={() => handleAddToCart(product)} type="primary" block>
          Add To Cart
        </Button>
      )}
    </>
  );
};

export default AddToCartPage;
