"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import ActionBar from "@/components/ui/ActionBar";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import { filterableOptions } from "@/constants/global";
import { Button, Col, Row, Select, Space, message } from "antd";
import { Option } from "antd/es/mentions";
import { useState } from "react";
import {
  useAttributeGroupQuery,
  useAttributeGroupsQuery,
} from "@/redux/api/attributeGroupApi";
import { useAddProductMutation, useProductQuery } from "@/redux/api/productApi";
import SEVarientModal from "@/components/varient/SEVarientModal";
import SEUpload from "@/components/ui/SEUpload";
import FormInputNumber from "@/components/Forms/FormInputNumber";
import SESwitch from "@/components/ui/SESwitch";
import SEMultipleUpload from "@/components/ui/SEMultipleUpload";
import { IAttribute } from "@/types";
import { useAddVarientMutation } from "@/redux/api/varientApi";
import SETable from "@/components/ui/SETable";
import VarientView from "@/components/varient/VarientView";

const ProductCreationPage = ({ params }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedpromoType, setSelectedpromoType] = useState<
    string | undefined
  >(undefined);

  const { data: productData, isLoading: productLoading } = useProductQuery(
    params?.id
  );

  const { data, isLoading } = useAttributeGroupQuery(
    productData?.attribute_group_id
  );
  const attributes = data?.attributes;

  const [addVarient] = useAddVarientMutation();

  const handleOnSubmit = async (values: any) => {
   
    const obj = { ...values };
    const file = obj["file"];
    delete obj["file"];

    // data modification
    const { price, qty, sku, status, visibility, weight, ...attributeData } =
      obj;
    const attArr = [];
    for (const att in attributeData) {
      const newData = { attribute_name: att, option_id: attributeData[att] };
      attArr.push(newData);
    }

    const newData = {
      price,
      qty,
      sku,
      status,
      visibility,
      weight,
      product_id: params?.id,
      varient_options: attArr,
    };

    const data = JSON.stringify(newData);
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);
    message.loading("Creating...");

    try {
      const res = await addVarient(formData).unwrap();
      if (res?.id) {
        message.success(`varient created successfully`);
        setOpen(false);
      }
    } catch (error: any) {
      console.error(error.message);
      setOpen(false);
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
          {
            label: "add-varient",
            link: `/admin/catalog/product/create/add-varient/${params?.id}`,
          },
        ]}
      />
      <ActionBar title="Product Varient Addition">
        <Button
          type="primary"
          onClick={() => {
            setOpen(true);
          }}
          danger
          style={{ marginLeft: "3px" }}
        >
          add new
        </Button>
      </ActionBar>

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
                        const attributeGroups = attribute?.attribute_options;
                        const attributeGroupOptions = attributeGroups?.map(
                          (group) => ({
                            label: group?.option_text,
                            value: group?.id,
                          })
                        );

                        return (
                          <div
                            key={attribute?.id}
                            style={{ margin: "10px 0px", flexBasis: "33%" }}
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
                    <div style={{ margin: "10px 0px", flexBasis: "33%" }}>
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
                      <div style={{ margin: "10px 0px", flexBasis: "33%" }}>
                        <FormInputNumber
                          styles={{ width: "100%" }}
                          name="qty"
                          size="large"
                          label="Quantity"
                        />
                      </div>
                      <div style={{ margin: "10px 0px", flexBasis: "33%" }}>
                        <FormInputNumber
                          styles={{ width: "100%" }}
                          name="price"
                          size="large"
                          label="Price"
                        />
                      </div>
                      <div style={{ margin: "10px 0px", flexBasis: "33%" }}>
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
                      <div style={{ margin: "10px 0px", flexBasis: "33%" }}>
                        <SESwitch
                          name="status"
                          size="small"
                          label="Status"
                          defaultChecked={true}
                        />
                      </div>
                      <div style={{ margin: "10px 0px", flexBasis: "33%" }}>
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
                      {/* <SEMultipleUpload name="files" /> */}
                      <SEUpload name="file" />
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
    </>
  );
};

export default ProductCreationPage;
