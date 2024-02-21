"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormRadioField from "@/components/Forms/FormRadioField";
import FormSelectField from "@/components/Forms/FormSelectField";
import ActionBar from "@/components/ui/ActionBar";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import { filterableOptions } from "@/constants/global";
import { Button, Col, Row, Select, Space, message } from "antd";
import { Option } from "antd/es/mentions";
import { useState } from "react";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import { useAttributeGroupsQuery } from "@/redux/api/attributeGroupApi";
import { useAddProductMutation } from "@/redux/api/productApi";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const RichTextEditor = dynamic(
  () => import("@/components/editor/RichTextEditor"),
  { ssr: false }
);

const ProductCreationPage = () => {
  const router = useRouter();
  const [addProduct] = useAddProductMutation();
  const [manageStock, setManageStock] = useState<string | undefined>(undefined);
  const [stockAvailability, setStockAvailability] = useState<
    string | undefined
  >(undefined);
  const [taxClass, setTaxClass] = useState<string | undefined>(undefined);

  const { data, isLoading } = useCategoriesQuery({ page: 1, limit: 100 });
  const categories = data?.categories;
  const categoryOptions = categories?.map((category) => ({
    label: category?.name,
    value: category?.id,
  }));

  const { data: attGroupData, isLoading: loading } = useAttributeGroupsQuery({
    page: 1,
    limit: 100,
  });
  const attributeGroups = attGroupData?.attributeGroups;
  const attributeGroupOptions = attributeGroups?.map((attributeGroup) => ({
    label: attributeGroup?.group_name,
    value: attributeGroup?.id,
  }));

  const handleOnSubmit = async (data: any) => {
    try {
      const res = await addProduct(data).unwrap();
      console.log(res);

      if (res?.id) {
        message.success(`product created successfully`);
        router.push(`/admin/catalog/product/create/add-varient/${res?.id}`);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const selectAfter = (
    <Select defaultValue=".com">
      <Option value=".com">.com</Option>
      <Option value=".jp">.jp</Option>
      <Option value=".cn">.cn</Option>
      <Option value=".org">.org</Option>
    </Select>
  );

  return (
    <>
      <SEBreadCrumb
        items={[
          {
            label: `admin`,
            link: `/admin`,
          },
          {
            label: "product",
            link: `/admin/catalog/product`,
          },
          {
            label: "create",
            link: `/admin/catalog/product/create`,
          },
        ]}
      />
      <ActionBar title="product creation" />

      <Form submitHandler={handleOnSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={16} style={{ margin: "10px 0" }}>
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
                  General
                </p>
                <div>
                  <div style={{ margin: "10px 0px" }}>
                    <FormInput
                      type="text"
                      name="name"
                      size="large"
                      label="Product Name"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ margin: "10px 0px", flexBasis: "33%" }}>
                      <FormInput
                        type="text"
                        name="sku"
                        size="large"
                        label="SKU"
                      />
                    </div>
                    <div style={{ margin: "10px 0px", flexBasis: "33%" }}>
                      <FormSelectField
                        size="large"
                        name="category_id"
                        options={categoryOptions!}
                        label="Category"
                        placeholder="Select"
                      />
                    </div>
                    <div style={{ margin: "10px 0px", flexBasis: "33%" }}>
                      <FormSelectField
                        size="large"
                        name="attribute_group_id"
                        options={attributeGroupOptions!}
                        label="Attribute Group"
                        placeholder="Select"
                      />
                    </div>
                  </div>
                  <div style={{ margin: "10px 0px", flexBasis: "50%" }}>
                    <RichTextEditor
                      styles={{
                        backgroundColor: "white",
                        borderRadius: "10px",
                      }}
                      label="Description"
                      name="description"
                    />
                  </div>
                </div>
              </div>
            </div>
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
                  Search Engine Optimize
                </p>
                <div>
                  <div style={{ margin: "10px 0px" }}>
                    <FormInput
                      type="text"
                      name="meta_seo.url_key"
                      size="large"
                      label="Url Key"
                    />
                  </div>
                  <div style={{ margin: "10px 0px", flexBasis: "50%" }}>
                    <FormInput
                      type="text"
                      name="meta_seo.meta_title"
                      size="large"
                      label="Meta Title"
                    />
                  </div>
                  <div style={{ margin: "10px 0px", flexBasis: "50%" }}>
                    <FormInput
                      type="text"
                      name="meta_seo.meta_description"
                      size="large"
                      label="Meta Description"
                    />
                  </div>
                  <div style={{ margin: "10px 0px", flexBasis: "50%" }}>
                    <FormInput
                      type="text"
                      name="meta_seo.parent_id"
                      size="large"
                      label="Parent Id"
                    />
                  </div>
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
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  marginBottom: "10px",
                }}
              >
                Setting
              </p>
              <div>
                <div style={{ margin: "10px 0px" }}>
                  <FormRadioField
                    size="large"
                    name="manage_stock"
                    options={filterableOptions}
                    label="Manage Stock"
                    onValueChange={(value) => setManageStock(value)}
                  />
                </div>
                <div style={{ margin: "10px 0px" }}>
                  <FormRadioField
                    size="large"
                    name="stock_availability"
                    options={filterableOptions}
                    label="Stock Availability?"
                    onValueChange={(value) => setStockAvailability(value)}
                  />
                </div>
                <div style={{ margin: "10px 0px" }}>
                  <FormRadioField
                    size="large"
                    name="tax_class"
                    options={filterableOptions}
                    label="Tax Class?"
                    onValueChange={(value) => setTaxClass(value)}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          submit
        </Button>
      </Form>
    </>
  );
};

export default dynamic(() => Promise.resolve(ProductCreationPage), {
  ssr: false,
});
