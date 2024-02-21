"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormInputNumber from "@/components/Forms/FormInputNumber";
import FormRadioField from "@/components/Forms/FormRadioField";
import FormSelectField from "@/components/Forms/FormSelectField";
import AttributeGroupPage from "@/components/attributeGroup/AttributeGroup";
import ActionBar from "@/components/ui/ActionBar";
import FormDynamicInputField from "@/components/ui/FormDynamicInputField";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import { filterableOptions, myOptions } from "@/constants/global";
import { useAddAttributeMutation } from "@/redux/api/attributeApi";
import { useAttributeGroupsQuery } from "@/redux/api/attributeGroupApi";
import { Button, Col, Row, Space, message } from "antd";
import { useState } from "react";

const AttributeCreationPage = () => {
  const [addAttribute] = useAddAttributeMutation();
  const [selectedAttributeType, setSelectedAttributeType] = useState<
    string | undefined
  >(undefined);
  const [isRequiredType, setIsRequiredType] = useState<string | undefined>(
    undefined
  );
  const [isFilterableType, setIsFilterableType] = useState<string | undefined>(
    undefined
  );
  const [isDisplayType, setIsDiaplayType] = useState<string | undefined>(
    undefined
  );
  const { data, isLoading } = useAttributeGroupsQuery({ page: 1, limit: 100 });
  const attributeGroups = data?.attributeGroups;
  
  const attributeGroupOptions = attributeGroups?.map((group) => ({
    label: group?.group_name,
    value: group?.id,
  }));


  const handleOnSubmit = async (data: any) => {
    try {
      const res = await addAttribute(data).unwrap();
      console.log(res);

      if (res?.id) {
        message.success(`attribute created successfully`);
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
            label: "attribute",
            link: `/admin/catalog/attribute`,
          },
          {
            label: "create",
            link: `/admin/catalog/attribute/create`,
          },
        ]}
      />
      <ActionBar title="attribute creation" />

      <AttributeGroupPage />
      
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
                      name="attribute_name"
                      size="large"
                      label="Attribute Name"
                    />
                  </div>
                  <div style={{ margin: "10px 0px" }}>
                    <FormInput
                      type="text"
                      name="attribute_code"
                      size="large"
                      label="Attribute Code"
                    />
                  </div>
                  <div style={{ margin: "10px 0px" }}>
                    <FormRadioField
                      size="large"
                      name="type"
                      options={myOptions}
                      label="Attribute Type"
                      onValueChange={(value) => setSelectedAttributeType(value)}
                    />
                  </div>

                  <div
                    style={{
                      margin: "10px 0px",
                      display:
                        selectedAttributeType === "select" ||
                        selectedAttributeType === "multi-select"
                          ? "block"
                          : "none",
                    }}
                  >
                    <FormDynamicInputField name="attribute_options" subName="option_text" label="Attribute Options" placeholder="attribute option" size="middle" />
                  </div>
                </div>
              </div>
              <div>
                <p
                  style={{
                    fontSize: "18px",
                    marginBottom: "10px",
                  }}
                >
                  Attribute Group
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div style={{ margin: "10px 0px", flexBasis: "50%" }}>
                    <FormSelectField
                      size="large"
                      name="attribute_group_id"
                      options={attributeGroupOptions!}
                      label="Attribute Group"
                      placeholder="Select"
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
                    name="is_required"
                    options={filterableOptions}
                    label="Is Required?"
                    onValueChange={(value) => setIsRequiredType(value)}
                  />
                </div>
                <div style={{ margin: "10px 0px" }}>
                  <FormRadioField
                    size="large"
                    name="is_filterable"
                    options={filterableOptions}
                    label="Is Filterable?"
                    onValueChange={(value) => setIsFilterableType(value)}
                  />
                </div>
                <div style={{ margin: "10px 0px" }}>
                  <FormRadioField
                    size="large"
                    name="display_on_frontend"
                    options={filterableOptions}
                    label="Show to customers?"
                    onValueChange={(value) => setIsDiaplayType(value)}
                  />
                </div>
                <div style={{ margin: "10px 0px" }}>
                  <FormInputNumber
                    max={10}
                    min={3}
                    styles={{ width: "100%" }}
                    name="sort_order"
                    size="large"
                    label="Sort Order"
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

export default AttributeCreationPage;
