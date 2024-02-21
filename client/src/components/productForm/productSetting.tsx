import FormInput from "@/components/Forms/FormInput";
import FormInputNumber from "@/components/Forms/FormInputNumber";
import FormRadioField from "@/components/Forms/FormRadioField";
import FormSelectField from "@/components/Forms/FormSelectField";
import RichTextEditor from "@/components/editor/RichTextEditor";
import SEUpload from "@/components/ui/SEUpload";
import { attributeGroupOptions, filterableOptions } from "@/constants/global";
import { Col, Row, Select } from "antd";
import { Option } from "antd/es/mentions";

const selectAfter = (
  <Select defaultValue=".com">
    <Option value=".com">.com</Option>
    <Option value=".jp">.jp</Option>
    <Option value=".cn">.cn</Option>
    <Option value=".org">.org</Option>
  </Select>
);

const ProductSetting = () => {
  return (
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
              Inventory
            </p>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ margin: "10px 0px" }}>
                  <FormRadioField
                    size="large"
                    name="is_required"
                    options={filterableOptions}
                    label="Is Required?" onValueChange={function (value: string | undefined): void {
                      throw new Error("Function not implemented.");
                    } }                  />
                </div>
                <div style={{ margin: "10px 0px" }}>
                  <FormRadioField
                    size="large"
                    name="is_required"
                    options={filterableOptions}
                    label="Is Required?" onValueChange={function (value: string | undefined): void {
                      throw new Error("Function not implemented.");
                    } }                  />
                </div>
                <div style={{ margin: "10px 0px" }}>
                  <FormInput
                    type="text"
                    name="attribute_name"
                    size="large"
                    label="Attribute Name"
                  />
                </div>
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
            Product status
          </p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ margin: "10px 0px" }}>
              <FormRadioField
                size="large"
                name="is_required"
                options={filterableOptions}
                label="Is Required?" onValueChange={function (value: string | undefined): void {
                  throw new Error("Function not implemented.");
                } }              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormRadioField
                size="large"
                name="is_required"
                options={filterableOptions}
                label="Is Required?" onValueChange={function (value: string | undefined): void {
                  throw new Error("Function not implemented.");
                } }              />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ProductSetting;
