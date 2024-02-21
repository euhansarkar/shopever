"use client";

import ProductImage from "@/components/product/ProductImage";
import VarientSelection from "@/components/product/varient/VarientSelection";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import { useProductQuery } from "@/redux/api/productApi";
import { Col, Layout, Row, theme } from "antd";

const ProductPage = ({ params }: any) => {
  const { productId } = params;
  const { Content } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  // get product
  const { data: productData, isLoading: productLoading } =
    useProductQuery(productId);

  // get all varients
  const varients: any = productData?.varients;

  // get all varient options
  const allVarientOptions = varients?.flatMap(
    (item: any) => item.varient_options
  );

  // first product varient
  const getFirstVarient = productData?.varients[0];

  return (
    <>
      <Content style={{ padding: "0 48px" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <SEBreadCrumb
            items={[
              {
                label: `Home`,
                link: `/home`,
              },
              {
                label: productData?.category?.name,
                link: `/categories/${productData?.category?.id}`,
              },
              {
                label: productData?.name,
                link: `/categories/${productData?.category?.id}/${productData?.id}`,
              },
            ]}
          />

          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            {/* first part */}
            <ProductImage varients={varients} />

            {/* second part */}
            <Col span={12} style={{ margin: "10px 0" }}>
              <h1
                style={{
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  margin: "10px 0",
                }}
              >
                {productData?.name}
              </h1>
              <h2 style={{ margin: "10px 0" }}>
                price: ${getFirstVarient?.price}
              </h2>
              <p style={{ color: "#656769", margin: "12px 0" }}>
                sku: {getFirstVarient?.sku}
              </p>

              <div>
                {allVarientOptions?.length > 0 ? (
                  <VarientSelection
                    product={productData}
                    allVarientOptions={allVarientOptions}
                  />
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: productData?.description }}
              />
            </Col>
          </Row>
        </div>
      </Content>
    </>
  );
};

export default ProductPage;
