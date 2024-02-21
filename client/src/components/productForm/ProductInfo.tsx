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

const ProductInfo = () => {
  return (
    <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
      <Col span={24} style={{ margin: "10px 0" }}>
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
                <div style={{ margin: "10px 0px" }}>
                  <FormInput type="text" name="sku" size="large" label="SKU" />
                </div>
                <div style={{ margin: "10px 0px" }}>
                  <FormInput
                    type="text"
                    name="price"
                    size="large"
                    label="Product Price"
                    addonAfter={selectAfter}
                  />
                </div>
                <div style={{ margin: "10px 0px" }}>
                  <FormInput
                    type="text"
                    name="weight"
                    size="large"
                    label="Weight"
                    addonAfter={selectAfter}
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ margin: "10px 0px", flexBasis: "50%" }}>
                  <FormSelectField
                    size="large"
                    name="category_id"
                    options={attributeGroupOptions!}
                    label="Category"
                    placeholder="Select"
                  />
                </div>
                <div style={{ margin: "10px 0px", flexBasis: "50%" }}>
                  <FormSelectField
                    size="large"
                    name="tax_class"
                    options={attributeGroupOptions!}
                    label="Tax class"
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
                  name="url_key"
                  size="large"
                  label="Url Key"
                />
              </div>
              <div style={{ margin: "10px 0px", flexBasis: "50%" }}>
                <FormInput
                  type="text"
                  name="meta_title"
                  size="large"
                  label="Meta Title"
                />
              </div>
              <div style={{ margin: "10px 0px", flexBasis: "50%" }}>
                <FormInput
                  type="text"
                  name="meta_description"
                  size="large"
                  label="Meta Description"
                />
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ProductInfo;
