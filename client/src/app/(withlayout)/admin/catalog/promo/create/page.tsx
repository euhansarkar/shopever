"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormInputNumber from "@/components/Forms/FormInputNumber";
import FormRadioField from "@/components/Forms/FormRadioField";
import FormSelectField from "@/components/Forms/FormSelectField";
import ActionBar from "@/components/ui/ActionBar";
import FormDynamicInputField from "@/components/ui/FormDynamicInputField";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import { filterableOptions, myOptions } from "@/constants/global";
import { useAttributeGroupQuery } from "@/redux/api/attributeGroupApi";
import { IAttribute } from "@/types";
import { Button, Col, Row, Space, message } from "antd";
import { useState } from "react";

const PromoCreationPage = () => {
  const [selectedpromoType, setSelectedpromoType] = useState<
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
  const id = "0a503775-3776-470d-8d3c-a55f9f5cdf22";
  const { data, isLoading } = useAttributeGroupQuery(id);
  const attributes = data?.attributes;

  const handleOnSubmit = async (data: any) => {
    try {
      console.log(data);
      const arr = [];
      for (const att in data) {
        const newData = { name: att, value: data[att] };
        arr.push(newData);
      }
      console.log(arr);
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
            label: "promo",
            link: `/admin/catalog/promo`,
          },
          {
            label: "create",
            link: `/admin/catalog/promo/create`,
          },
        ]}
      />
      <ActionBar title="promo creation" />

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
                      <div key={attribute?.id} style={{ margin: "10px 0px" }}>
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

                  <div
                    style={{
                      margin: "10px 0px",
                      display:
                        selectedpromoType === "select" ||
                        selectedpromoType === "multi-select"
                          ? "block"
                          : "none",
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <p
                  style={{
                    fontSize: "18px",
                    marginBottom: "10px",
                  }}
                >
                  promo Group
                </p>
              </div>
            </div>
          </Col>

          {/* second col */}
          {/* <Col span={8} style={{ margin: "10px 0" }}>
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
          </Col> */}
        </Row>
        <Button type="primary" htmlType="submit">
          submit
        </Button>
      </Form>
    </>
  );
};

export default PromoCreationPage;
