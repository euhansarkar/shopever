"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormInputNumber from "@/components/Forms/FormInputNumber";
import FormRadioField from "@/components/Forms/FormRadioField";
import FormSelectField from "@/components/Forms/FormSelectField";
import ActionBar from "@/components/ui/ActionBar";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import { filterableOptions } from "@/constants/global";
import {
  useAttributeGroupQuery,
  useAttributeGroupsQuery,
} from "@/redux/api/attributeGroupApi";
import { Button, Col, Row, message } from "antd";
import RichTextEditor from "@/components/editor/RichTextEditor";
import { useAddProductMutation } from "@/redux/api/productApi";
import { useState } from "react";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import { useRouter } from "next/navigation";
import SESwitch from "@/components/ui/SESwitch";
import SEMultipleUpload from "@/components/ui/SEMultipleUpload";
import VarientView from "@/components/varient/VarientView";
import SEVarientModal from "@/components/varient/SEVarientModal";
import { IAttribute } from "@/types";

const ProductEditionPage = ({ params }: any) => {
  const [open, setOpen] = useState<boolean>(false);
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

  const { data: varientData, isLoading: varientLoading } =
    useAttributeGroupQuery(params?.id);
  const varients = varientData?.attributes;

  const { data: attData, isLoading: attLoading } = useAttributeGroupQuery(
    varientData?.attribute_group_id
  );
  const attributes = attData?.attributes;

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
            label: "edit",
            link: `/admin/catalog/product/edit/${params.id}`,
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
            <div
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "5px",
                padding: "15px",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              {/* varient table */}
              <VarientView id={params?.id} />

              {/* varient creation modal */}
              <SEVarientModal
                title="Add Varient"
                isOpen={open}
                closeModal={() => setOpen(false)}
              >
                <div style={{ width: "100%" }}>
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
                              {attributes?.map((attribute: IAttribute) => {
                                const attributeGroups =
                                  attribute?.attribute_options;
                                const attributeGroupOptions =
                                  attributeGroups?.map((group) => ({
                                    label: group?.option_text,
                                    value: group?.id,
                                  }));

                                return (
                                  <div
                                    key={attribute?.id}
                                    style={{
                                      margin: "10px 0px",
                                      flexBasis: "33%",
                                    }}
                                  >
                                    <FormSelectField
                                      size="large"
                                      name={attribute?.attribute_name}
                                      options={attributeGroupOptions!}
                                      label={attribute?.attribute_name}
                                      placeholder="Select"
                                    />
                                  </div>
                                );
                              })}
                            </div>
                            <div
                              style={{ margin: "10px 0px", flexBasis: "33%" }}
                            >
                              <FormInput
                                type="text"
                                styles={{ width: "100%" }}
                                name="sku"
                                size="large"
                                label="SKU"
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
                              <div
                                style={{ margin: "10px 0px", flexBasis: "33%" }}
                              >
                                <FormInputNumber
                                  styles={{ width: "100%" }}
                                  name="qty"
                                  size="large"
                                  label="Quantity"
                                />
                              </div>
                              <div
                                style={{ margin: "10px 0px", flexBasis: "33%" }}
                              >
                                <FormInputNumber
                                  styles={{ width: "100%" }}
                                  name="price"
                                  size="large"
                                  label="Price"
                                />
                              </div>
                              <div
                                style={{ margin: "10px 0px", flexBasis: "33%" }}
                              >
                                <FormInputNumber
                                  styles={{ width: "100%" }}
                                  name="weight"
                                  size="large"
                                  label="Weight"
                                />
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                style={{ margin: "10px 0px", flexBasis: "33%" }}
                              >
                                <SESwitch
                                  name="status"
                                  size="small"
                                  label="Status"
                                  defaultChecked={true}
                                />
                              </div>
                              <div
                                style={{ margin: "10px 0px", flexBasis: "33%" }}
                              >
                                <SESwitch
                                  name="visibility"
                                  size="small"
                                  label="Visibility"
                                  defaultChecked={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
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
                          <div>
                            <p
                              style={{
                                fontSize: "18px",
                                marginBottom: "10px",
                              }}
                            >
                              Images
                            </p>
                            <div>
                              {/* if multiple image upload completed without error then add here instead of single upload */}
                              <SEMultipleUpload name="files" />
                              {/* <SEUpload name="file" /> */}
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Button type="primary" htmlType="submit">
                      submit
                    </Button>
                  </Form>
                </div>
              </SEVarientModal>
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

export default ProductEditionPage;
