import {
  resetVarientOption,
  selectVarientOption,
} from "@/redux/features/varientOption/selectSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Button, Radio } from "antd";
import { useEffect } from "react";
import AddToCart from "@/components/product/AddToCart";
import { ICartProduct, IProduct, IVarientOptionCore } from "@/types";

type IVarientSelection = {
  allVarientOptions: IVarientOptionCore[];
  product: IProduct;
};

type DynamicVariantOptions = {
  [key: string]: IVarientOptionCore[];
};

const VarientSelection = ({
  allVarientOptions,
  product,
}: IVarientSelection) => {
  // group all varient options
  const data: DynamicVariantOptions = allVarientOptions?.reduce(
    (acc: any, obj: any) => {
      const key = obj?.attribute_name;
      acc[key] = acc[key] || [];
      acc[key]?.push(obj);
      return acc;
    },
    {}
  );

  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.select);

  useEffect(() => {
    return () => {
      dispatch(resetVarientOption());
    };
  }, [dispatch]);

  const onChange = (
    attributeName: string,
    selectedOption: IVarientOptionCore
  ) => {
    dispatch(selectVarientOption({ attributeName, selectedOption }));
  };

  const isCartControllerEnabled =
    Object.values(state).length === Object.keys(data).length &&
    Object.values(state).every((value) => value !== null);

  const cartProduct: ICartProduct = {
    id: product?.id,
    name: product?.name,
    sku: product?.sku,
    meta_SEO_id: product?.sku,
    attribute_group_id: product?.attribute_group_id,
    category_id: product?.category_id,
    varients: state,
    price: product?.varients[0]?.price,
    img: product?.varients[0]?.images[0]?.image_url,
  };

  return (
    <div>
      {data &&
        Object.keys(data).map((attributeName) => (
          <div key={attributeName}>
            <h3>{attributeName}</h3>
            <Radio.Group
              onChange={(e) =>
                onChange(
                  attributeName,
                  data[attributeName]?.find(
                    (option) => option?.id === e?.target?.value
                  ) as any
                )
              }
              value={state[attributeName]?.id}
            >
              {data[attributeName]?.map((variantOption: IVarientOptionCore) => (
                <Radio key={variantOption.id} value={variantOption.id}>
                  {variantOption?.options?.option_text}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        ))}
      <AddToCart
        value={isCartControllerEnabled ? Object.values(state).join("") : ""}
        product={cartProduct}
      />
    </div>
  );
};
export default VarientSelection;
